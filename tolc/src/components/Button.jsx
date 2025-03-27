import React from 'react';
import { Stack, PrimaryButton } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate('/createCompanyAccount'); 
  };
    const handleLoginClick = () => {
      navigate('/loginPage');
    };
  

  return (
    <Stack horizontalAlign="center" className="my-6">
    <Stack horizontal tokens={{ childrenGap: 10 }}>
      <PrimaryButton text="Create Company Account"  onClick={handleCreateAccountClick} styles={{ root: { padding: '12px 40px',
                            borderRadius: '7px',backgroundColor: '#333333'}}} />
      <PrimaryButton text="Login" onClick={handleLoginClick} styles={{ root: { padding: '12px 40px',
                            borderRadius: '7px',backgroundColor: '#333333'}}}/>
    </Stack>
    </Stack>
  );
};

export default Button;
