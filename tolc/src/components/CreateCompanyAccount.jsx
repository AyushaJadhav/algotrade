import React, { useState } from 'react';
import { Stack, Separator, TextField, PrimaryButton, Text, Label, Icon, DefaultButton } from '@fluentui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

const CreateCompanyPage = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    orgPAN: '',
    orgGST: '',
    orgAddress: '',
    orgContact: '',
    consentForm: null,
  });

  const handleChange = (e, newValue) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = () => {
    const isEmptyField = Object.entries(formData).some(([key, value]) => {
        if (key === 'consentForm') {
            return !value; // For file input, check directly if it's null
        }
        return !value || (typeof value === 'string' && !value.trim());
    });

    if (isEmptyField) {
        alert('All fields are required!');
    } else {
        alert('Account created successfully!');
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
          padding: '2rem',
          marginTop: '-20px',
        }
      }}
    >
      <Header />

      <Separator 
        styles={{
          root: { borderTop: '2px solid rgb(223, 217, 217)', width: '100%', margin: '20px 0' }
        }}
      />

      <Stack
        tokens={{ childrenGap: 20 }}
        verticalAlign="center"
        horizontalAlign="center"
        styles={{
          root: {
            width: '100%',
            maxWidth: '800px',
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '12px',
            marginTop: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <h2 style={{ color: 'black', marginBottom: '50px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
          Create Company Account
        </h2>

        <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: '75%', paddingRight: '20px' } }}>
          {[{
            label: 'Organization Name', key: 'orgName', placeholder: 'Enter your organization name'
          }, {
            label: 'Organization PAN', key: 'orgPAN', placeholder: 'Enter PAN number'
          }, {
            label: 'Organization GST No', key: 'orgGST', placeholder: 'Enter GST number'
          }, {
            label: 'Organization Address', key: 'orgAddress', placeholder: 'Enter company address'
          }, {
            label: 'Organization Contact', key: 'orgContact', placeholder: 'Enter contact number'
          },
          {
            label: 'Admin Email-Address', key: 'admEmail', placeholder: 'Enter email'
          }
        ].map((field) => (
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} key={field.key}>
              <Label styles={{ root: { width: '45%', textAlign: 'left', fontWeight: '700', paddingRight: '20px' } }}>
                {field.label} <span style={{ color: 'red' }}>*</span>
              </Label>
              <TextField
                name={field.key}
                value={formData[field.key]}
                onChange={handleChange}
                placeholder={field.placeholder}
                styles={{ root: { width: '55%' }, fieldGroup: { borderRadius: '6px' } }}
              />
            </Stack>
          ))}

          <Stack horizontalAlign="center" styles={{ root: { width: '100%' } }}>
            <DefaultButton
              iconProps={{ iconName: 'Upload' }}
              text="Upload Consent Form"
              styles={{
                root: {
                  backgroundColor: '#A9A9A9',
                  color: 'white',
                  borderRadius: '6px',
                  height: '40px',
                  width: '250px'
                },
                rootHovered: { backgroundColor: '#005A9E' }
              }}
            />
          </Stack>

          <Stack horizontalAlign="center" styles={{ root: { width: '100%' } }}>
            <DefaultButton
              iconProps={{ iconName: 'Download' }}
              text="Download Consent Form"
              styles={{
                root: {
                  backgroundColor: '#A9A9A9',
                  color: 'white',
                  borderRadius: '6px',
                  height: '40px',
                  width: '250px'
                },
                rootHovered: { backgroundColor: '#005A9E' }
              }}
              onClick={() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = '/path/to/your/file.pdf';
                downloadLink.download = 'ConsentForm.pdf';
                downloadLink.click();
              }}
            />
          </Stack>

          <Stack horizontalAlign="center" styles={{ root: { width: '100%', marginTop: '40px' } }}>
            <PrimaryButton
              text="Create"
              onClick={handleSubmit}
              styles={{
                root: {
                  backgroundColor: '#333333',
                  color: 'white',
                  borderRadius: '6px',
                  height: '40px',
                  width: '150px'
                },
                rootHovered: { backgroundColor: '#005A9E' }
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <div style={{ width: '100%', marginTop: '40px' }}>
                <Footer />
            </div>

      </Stack>
    
  );
};

export default CreateCompanyPage;
