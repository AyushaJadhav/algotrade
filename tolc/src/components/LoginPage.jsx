import React, { useState } from 'react';
import { TextField, Separator, PrimaryButton, Stack, Label } from '@fluentui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [orgName, setOrgName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = () => {
        const isEmptyField = Object.values(formData).some((value) => !value.trim());
    
        if (isEmptyField) {
          alert('All fields are required!');
        } else {
          alert('Logged in successfully!');
          console.log('Form Data:', formData);
        }
      };
    

    return (
        <Stack
            verticalAlign="center"
            horizontalAlign="center"
            styles={{
                root: {
                    minHeight: '100vh',
                    backgroundColor: '#f3f2f1',
                    padding: '4rem 2rem',
                }
            }}
        >
            <Header />

<Separator 
        styles={{ 
          root: { 
            borderTop: '2px solid rgb(223, 217, 217)', 
            width: '100%', 
            margin: '20px 0' 
          } 
        }} 
      />

            
            <Stack
                styles={{
                    root: {
                        width: '700px', 
                        backgroundColor: 'white',
                        padding: '50px',
                        boxShadow: '0 6px 12px rgba(209, 188, 188, 0.15)',
                        borderRadius: '12px',
                        marginTop: '30px',
                    }
                }}
            >
                <h2 style={{
                    color: 'black',
                   marginBottom: '50px',
                    textAlign: 'center',
                    margin: '20px 0',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>
                    Login to Company Account
                </h2>

                <Stack tokens={{ childrenGap: 20 }}>
                    {/* Organization Name */}
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 30 }}>
                        <Label styles={{ root: { width: '45%' } }}>Organization Name / PAN Number</Label>
                        <TextField
                            value={orgName}
                            onChange={(e, newValue) => setOrgName(newValue)}
                            placeholder="Enter organization name or PAN number"
                            styles={{ root: { width: '55%', } }}
                        />
                    </Stack>

                    {/* Recruiter ID */}
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 30 }}>
                        <Label styles={{ root: { width: '45%' } }}>Recruiter ID</Label>
                        <TextField
                            value={userId}
                            onChange={(e, newValue) => setUserId(newValue)}
                            placeholder="Enter your User ID"
                            styles={{ root: { width: '55%' } }}
                        />
                    </Stack>

                    {/* Password */}
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 30 }}>
                        <Label styles={{ root: { width: '45%' } }}>Password</Label>
                        <TextField
                            type="password"
                            value={password}
                            onChange={(e, newValue) => setPassword(newValue)}
                            placeholder="Enter your password"
                            styles={{ root: { width: '55%',color: 'grey', } }}
                        />
                    </Stack>
                   
                   
                    <Stack horizontal horizontalAlign="center" styles={{ root: { marginTop: '20px' } }}>
                    <PrimaryButton
                              text="Login"
                              onClick={handleSubmit}
                              styles={{
                                root: {
                                  backgroundColor: '#333333',
                                  color: 'white',
                                  width: '30%',
                                  borderRadius: '6px',
                                  height: '20px',
                                },
                                rootHovered: { backgroundColor: '#005A9E' }
                              }}
                            />
                        </Stack>
                </Stack>
            </Stack>

           <Separator 
                   styles={{ 
                     root: { 
                       borderTop: '2px solid rgb(245, 243, 243)', 
                       width: '100%', 
                       margin: '20px 0' 
                     } 
                   }} 
                 />

            <div style={{ width: '100%', marginTop: '40px' }}>
                <Footer />
            </div>
        </Stack>
    );
};

export default LoginPage;
