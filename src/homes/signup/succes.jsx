import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  

const SignUpSuccess = () => {
  const navigate = useNavigate();  
  const handleRedirect = (e) => {
    e.preventDefault();

    navigate('/connection');  
  };

  return (
    <div className="container">
      <Alert variant="success">
        <Alert.Heading>Sign Up Successful!</Alert.Heading>
        <p>
          Your account has been created successfully. Click the button below to go to the connection page.
        </p>
        <Button onClick={handleRedirect} variant="primary">
          OK
        </Button>
      </Alert>
    </div>
  );
};

export default SignUpSuccess;
