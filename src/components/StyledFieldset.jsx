import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldsetStyles = styled.fieldset`
  width: 50vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  legend {
    padding: 3rem 0 1rem 0;
    font-size: 3rem;
    font-weight: 700;
  }
  p {
    font-size: 1rem;
  }

  p.instructions {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  label {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .skillLabel {
    font-size: 1rem;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }

  input[type='text'] {
    margin-bottom: 1rem;
    padding: 0.6rem;
    width: 15rem;
  }

  input[type='radio'] {
    width: 1.2rem;
    height: 1.2rem;
    color: gray;
    border: 3px solid gray;
    margin-right: 1rem;
  }

  label:last-of-type {
    margin-bottom: 0;
  }

  button {
    margin-top: 0;
  }
`;

export default function StyledFieldset({ children }) {
  return <FieldsetStyles>{children}</FieldsetStyles>;
}

StyledFieldset.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
