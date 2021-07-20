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

  label {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export default function StyledFieldset({ children }) {
  return <FieldsetStyles>{children}</FieldsetStyles>;
}

StyledFieldset.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
