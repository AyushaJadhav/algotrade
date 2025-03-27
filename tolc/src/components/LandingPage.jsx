import React from 'react';
import { Stack, Text,DefaultButton, PrimaryButton, Link } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import tolcLogo from '../assets/image.png';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleCreateAccountClick = () => {
        navigate('/homePage');
    };


    const handleSignInClick = () => {
        navigate('/createCompanyAccount');
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh', 
            backgroundColor: '#f3f2f1' 
        }}>
            {/* Header */}
            
            <Stack

            
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                styles={{
                    root: {
                        backgroundColor: 'white',
                        padding: '10px 40px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }
                }}
            ><img 
            src={tolcLogo} 
            alt="TOLC Logo" 
            style={{ height: 55 }} 
        />


                

                <Stack horizontal tokens={{ childrenGap: 90 }}>
                    {['Explore',  'Solutions',  'Resources'].map((link) => (
                        <Link key={link} styles={{ root: { color: '#333333' } }}>
                            {link}
                        </Link>
                    ))}

<PrimaryButton 
    text="Get started with Tolc" 
    styles={{ 
        root: { 
            backgroundColor: '#4d4d4d',  
            color: '#fff',             
            border: 'none',
            padding: '15px 20px',
            borderRadius: '7px',
        },
        rootHovered: {
            backgroundColor: '#333333', 
        }
    }} 
    onClick={handleCreateAccountClick} 
/>

<PrimaryButton 
    text="Sign in" 
    styles={{ 
        root: { 
            backgroundColor: '#4d4d4d', 
            color: '#fff', 
            border: 'none',
            padding: '15px 20px',
            borderRadius: '7px',
        },
        rootHovered: {
            backgroundColor: '#333333',
        }
    }} 
    onClick={handleSignInClick} 
/>

                </Stack>
            </Stack>

            {/* Hero Section */}
            <Stack
                verticalAlign="center"
                horizontalAlign="center"
                styles={{
                    root: {
                        flex: 1, 
                        padding: '80px 20px',
                        background: 'linear-gradient(135deg, #ffedd5,rgb(255, 157, 77), #d9d9d9)', 
                    }
                }}
            >
                <Text variant="xxLarge" styles={{ root: { fontWeight: 'bold', fontSize: '50px' } }}>
                    TOLC
                </Text>

                <Text variant="large" styles={{ root: { marginTop: '10px' } }}>
                    Seamless Recruitment Tracking and gain real-time insights from Offer Letter to Onboarding to improve hiring efficiency.
                </Text>

                <DefaultButton text="Get started with Tolc" onClick={handleCreateAccountClick} 
                    styles={{
                        root: {
                            marginTop: '20px',
                            backgroundColor: '#333333',
                            color: 'white',
                            padding: '15px 40px',
                            borderRadius: '7px',
                        },
                        rootHovered: { backgroundColor: '#4f4f4f' }
                    }}
                />
            </Stack>

            {/* Footer Navigation */}
            <div style={{ width: '100%' }}>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
