import React from 'react';
import { Text,Stack } from '@fluentui/react';
import tolcLogo from '../assets/image.png';
const Header = () => (
<Stack 
        horizontal 
        verticalAlign="center" 
        horizontalAlign="center" 
        tokens={{ childrenGap: 10 }} 
        styles={{ root: { padding: '1rem 0' } }}
    >
        <img 
            src={tolcLogo} 
            alt="TOLC Logo" 
            style={{ height: 60 }} 
        />

  <Text 
  variant="xxLarge" 
  style={{ 
    color: '#F97316', 
    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  }}
>
  TOLC - The Offer Letter Consortium
</Text>
</Stack>
);

export default Header;
