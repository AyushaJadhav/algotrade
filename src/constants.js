export const candleStickOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const ohlc = w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
        
        const indexValue = "22200";
  const atmStrike = "22100";
  const atmCE = "110.5";
  const atmPE = "105.8";
  const vwapCE = "108.9";
  const vwapPE = "104.3";
        return `
          <div style="padding: 10px; background: rgba(255, 255, 255, 0.69); border: 1px solid #ccc;">
            <div style="color: grey;">Open: ${ohlc[0]}</div>
            <div style="color: grey;">High: ${ohlc[1]}</div>
            <div style="color: grey;">Low: ${ohlc[2]}</div>
            <div style="color: grey;">Close: ${ohlc[3]}</div>
          <hr />
      <div style="color: grey;">Index: ${indexValue}</div>
      <div style="color: grey;">ATM Strike: ${atmStrike}</div>
      <div style="color: grey;">ATM CE: ${atmCE}</div>
      <div style="color: grey;">ATM PE: ${atmPE}</div>
      <div style="color: grey;">VWAP CE: ${vwapCE}</div>
      <div style="color: grey;">VWAP PE: ${vwapPE}</div>
            </div>
        `;
      }
    },
    xaxis: {
      type: 'datetime', // Keep this for proper date formatting
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  