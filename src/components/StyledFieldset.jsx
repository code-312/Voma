import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldsetStyles = styled.fieldset`
  display: flex;
  flex-direction: column;
  legend {
    font-size: 3rem;
    font-weight: 600;
  }
  p {
    font-size: 1rem;
  }
  .red {
    color: red;
  }
  label {
    font-size: 1.5rem;
    font-weight: 600;
  }
  button {
    border: 2px solid gray;
    border-radius: 3px;
    padding: 10px;
    margin: 1rem 1rem 0 0;
  }
`;

export default function StyledFieldset({ children }) {
  return <FieldsetStyles>{children}</FieldsetStyles>;
}

StyledFieldset.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
