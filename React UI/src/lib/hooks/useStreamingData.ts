
import { useState, useEffect, useCallback } from 'react';

type StreamingHookOptions = {
  url: string;
  type: 'sse' | 'websocket';
  onMessage?: (data: any) => void;
  onError?: (error: any) => void;
  enabled?: boolean;
  reconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
};

/**
 * Hook for consuming streaming data from WebSocket or Server-Sent Events
 */
export const useStreamingData = ({
  url,
  type,
  onMessage,
  onError,
  enabled = true,
  reconnect = true,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5
}: StreamingHookOptions) => {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<any>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  
  // Reference to the connection
  const connectionRef = useCallback(() => {
    let connection: WebSocket | EventSource | null = null;
    
    // Create a new connection
    const connect = () => {
      if (!enabled) return;
      
      try {
        if (type === 'websocket') {
          connection = new WebSocket(url);
          
          connection.onopen = () => {
            setIsConnected(true);
            setError(null);
            setReconnectAttempts(0);
          };
          
          connection.onmessage = (event) => {
            try {
              const parsedData = JSON.parse(event.data);
              setData(parsedData);
              onMessage?.(parsedData);
            } catch (e) {
              setData(event.data);
              onMessage?.(event.data);
            }
          };
          
          connection.onerror = (e) => {
            setError(e);
            onError?.(e);
          };
          
          connection.onclose = () => {
            setIsConnected(false);
            handleReconnect();
          };
        } else if (type === 'sse') {
          connection = new EventSource(url);
          
          connection.onopen = () => {
            setIsConnected(true);
            setError(null);
            setReconnectAttempts(0);
          };
          
          connection.onmessage = (event) => {
            try {
              const parsedData = JSON.parse(event.data);
              setData(parsedData);
              onMessage?.(parsedData);
            } catch (e) {
              setData(event.data);
              onMessage?.(event.data);
            }
          };
          
          connection.onerror = (e) => {
            setIsConnected(false);
            setError(e);
            onError?.(e);
            connection?.close();
            handleReconnect();
          };
        }
      } catch (e) {
        setError(e);
        onError?.(e);
      }
      
      return connection;
    };
    
    // Handle reconnection logic
    const handleReconnect = () => {
      if (!reconnect || reconnectAttempts >= maxReconnectAttempts) return;
      
      setTimeout(() => {
        setReconnectAttempts((prev) => prev + 1);
        connection = connect();
      }, reconnectInterval);
    };
    
    return { connect, connection };
  }, [url, type, enabled, reconnect, reconnectAttempts, reconnectInterval, maxReconnectAttempts]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const { connect, connection } = connectionRef();
    connect();
    
    return () => {
      if (type === 'websocket' && connection instanceof WebSocket) {
        connection.close();
      } else if (type === 'sse' && connection instanceof EventSource) {
        connection.close();
      }
    };
  }, [url, type, enabled, reconnectAttempts]);
  
  // Function to manually send data (only for WebSocket)
  const sendData = useCallback((data: string | object) => {
    const { connection } = connectionRef();
    
    if (type === 'websocket' && connection instanceof WebSocket && isConnected) {
      try {
        const payload = typeof data === 'string' ? data : JSON.stringify(data);
        connection.send(payload);
        return true;
      } catch (e) {
        setError(e);
        onError?.(e);
        return false;
      }
    }
    return false;
  }, [isConnected, type]);
  
  return {
    data,
    isConnected,
    error,
    reconnectAttempts,
    sendData,
  };
};
