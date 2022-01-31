import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Header from '../components/Header';

const StyledSection = styled.section`
  width: 50%;
  margin: 0 auto;
  padding-top: 100px;

  @media (max-width: 900px){
    width: 80%;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const StyledParagraph = styled.p`
  font-size: 1rem;
`;

export default function Home({ userNotFound, findUser }) {
  const [email, setEmail] = useState('');

  const onInputChange = (e) => {
    setEmail(e.target.value);
  }

  const searchForUser = (e) => {
    e.preventDefault();
    findUser(email);
  };

  if (userNotFound) {
    return (
      <StyledSection>
        <StyledH1>Looks like you aren&apos;t in the CFC Slack</StyledH1>
        <StyledParagraph>
          To join, click the link below: 
        </StyledParagraph>
        <StyledParagraph>
          {/* This link is only valid for 30 days (until 2/18). Need a longer term solution */}
          <a href="https://join.slack.com/t/apitest-jwd7276/shared_invite/zt-11cgm52ly-60DmFwe6BaXUN1wJnRa79g">Click here to join our Slack</a>
        </StyledParagraph>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <StyledH1>Thanks for your interest!</StyledH1>
      <StyledParagraph>
          To get started, please enter the email address associated with your slack account below.
      </StyledParagraph>
      <form onSubmit={searchForUser}>
        <input type="text" placeholder="Slack Email Address" onChange={onInputChange} value={email} />
        <Button style={{backgroundColor: '#6200EE' }} variant="contained">Submit</Button>
      </form>
    </StyledSection>
  );
}

Home.propTypes = {
  userNotFound: PropTypes.bool.isRequired,
  findUser: PropTypes.func.isRequired,
};

