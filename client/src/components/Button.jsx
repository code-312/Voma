import { ButtonStyle } from '../styles/components/Button.style';

const Button = ({
  variant = 'solid blue',
  icon: Icon,
  onClick,
  iconSize = '16',
  type = 'button',
  disabled = false,
  children,
}) => (
  <ButtonStyle
    variant={variant}
    onClick={onClick}
    hasIcon={!!Icon}
    disabled={!!disabled}
    type={type}
  >
    {Icon && <Icon className="button-icon" size={iconSize} />}
    {children}
  </ButtonStyle>
);

export default Button;
