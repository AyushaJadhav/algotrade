import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Text, Separator } from '@fluentui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate('/create-company-account');
  };

  return (
    <Stack 
      tokens={{ childrenGap: 40 }} 
      className="min-h-screen bg-white text-gray-900"
      styles={{
        root: {
          padding: '20px 40px',
          boxSizing: 'border-box',
          backgroundColor: '#f3f2f1'
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

      {/* Welcome Section */}
      <Stack tokens={{ childrenGap: 20 }} horizontalAlign="center">
        <Text variant="xxLarge" styles={{ root: { fontWeight: 'bold', textAlign: 'center' } }}>
          Welcome to TOLC
        </Text>
        <Text variant="medium" styles={{ root: { textAlign: 'center', color: '#000' } }}>
          What is TOLC and how TOLC Transforms Your Recruitment Process?
        </Text>

        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { maxWidth: '900px', textAlign: 'left' } }}>
        <Text styles={{ root: { marginLeft: '80px' } }}>✅ Collaborative Hiring Platform – Connect and collaborate with organizations to stay informed about your selected candidates.</Text>
        <Text styles={{ root: { marginLeft: '80px' } }}>✅ Real-Time Candidate Tracking – Keep track of candidates throughout the recruitment journey for any job requisition.</Text>
        <Text styles={{ root: { marginLeft: '80px' } }}>✅ Offer Letter Monitoring – Upload data of all released offer letters and stay updated on candidate status.</Text>
        <Text styles={{ root: { marginLeft: '80px' } }}>✅ Automated Alerts – Get notified when candidates receive multiple offers from other organizations.</Text>
        <Text styles={{ root: { marginLeft: '80px' } }}>🚀 Stay ahead in the hiring game with TOLC!</Text>
        </Stack>
      </Stack>

      {/* Why Choose TOLC Section */}
      <Stack tokens={{ childrenGap: 20 }} horizontalAlign="center">
        <Text variant="xxLarge" styles={{ root: { fontWeight: 'bold', textAlign: 'center' } }}>
          Why Choose TOLC?
        </Text>

        <Stack tokens={{ childrenGap: 10 }} styles={{ root: { maxWidth: '800px', textAlign: 'left' } }}>
        <Text styles={{ root: { marginLeft: '50px' } }}>✅ Seamless Recruitment Tracking – Gain real-time insights from Offer Letter to Onboarding to improve hiring efficiency.</Text>
        <Text styles={{ root: { marginLeft: '50px' } }}>✅ Boost Offer Acceptance Rates – Identify key factors influencing candidates' decisions and reduce dropouts.</Text>
        <Text styles={{ root: { marginLeft: '50px' } }}>✅ Competitive Intelligence – Discover which companies are competing for top talent and refine your strategy.</Text>
        <Text styles={{ root: { marginLeft: '50px' } }}>✅ Data-Driven Decision Making – Leverage analytics to make well-informed recruitment choices.</Text>
        <Text styles={{ root: { marginLeft: '50px' } }}>✅ Optimize Hiring Processes – Streamline your workflow and enhance recruitment success.</Text>
        <Text styles={{ root: { marginLeft: '50px' } }}>🚀 Turn offers into onboardings—smarter and faster with TOLC!</Text>
        </Stack>
      </Stack>

      <Stack horizontalAlign="center" styles={{ root: { marginTop: '20px' } }}>
        <Button />
      </Stack>

      <Separator 
              styles={{ 
                root: { 
                  borderTop: '2px solid rgb(223, 217, 217)', 
                  width: '100%', 
                  margin: '20px 0' 
                } 
              }} 
            />

      <Footer />
    </Stack>
  );
};

export default HomePage;
