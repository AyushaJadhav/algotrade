import React from 'react';
import { Text, Stack, Link, FontWeights } from '@fluentui/react';

const Footer = () => (
    <Stack
        horizontal
        horizontalAlign="space-around"
        className="bg-gray-100 p-4 mt-10"
        styles={{ root: { borderTop: '1px solid #ddd', paddingTop: '20px' } }}
    >
        {/* Company Section */}
        <Stack>
            <Text variant="medium" styles={{ root: { fontWeight: FontWeights.bold } }}>
                Company
            </Text>
            <Link href="#" underline>About Morate</Link>
            <Link href="#" underline>Cookie Policy</Link>
            <Link href="#" underline>Create Account/Login</Link>
        </Stack>

        {/* Support Section */}
        <Stack>
            <Text variant="medium" styles={{ root: { fontWeight: FontWeights.bold } }}>
                Support
            </Text>
            <Link href="#" underline>Contact us</Link>
            <Link href="#" underline>Privacy Policy</Link>
            <Link href="#" underline>Terms & Conditions</Link>
        </Stack>

        {/* Social Section */}
        <Stack>
            <Text variant="medium" styles={{ root: { fontWeight: FontWeights.bold } }}>
                Social
            </Text>
            <Link href="#" underline>Facebook</Link>
            <Link href="#" underline>Instagram</Link>
            <Link href="#" underline>Twitter</Link>
        </Stack>
    </Stack>
);

export default Footer;
