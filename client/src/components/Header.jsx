import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { useLocation, Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import LoginToggleButton from './LoginToggleButton';
import Dropdown from './Dropdown';
import { AuthContext } from '../lib/AuthProvider';
import { StyledHeader, LoginLink, ProfileIndicator } from '../styles/components/Header.style';
import { ReactComponent as VomaLogo } from '../assets/voma-logo.svg';
import {
  HeaderLinksWrapper,
  HeaderLinkContainer,
  HeaderLink,
} from '../styles/components/HeaderLink.style';

const useStyles = makeStyles({
  LoginLinkContainer: {
    justifySelf: 'flex-start',
    flex: 1,
    display: 'flex',
  },
  appLogo: {
    padding: '15px',
    marginRight: '35px',
  },
  navLinks: {
    margin: 'auto',
  },
  LoginLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '15px',
    '&.inactive': {
      color: '#AD7FB5',
    },
    '&.active': {
      borderBottom: '2px solid #FFFFFF',
    },
  },
});

export default function Header() {
  const [adminDetails, setAdminDetails] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const UserAuth = useContext(AuthContext);
  const location = useLocation();
  const registering = { form: false };
  let volPage = false;
  let projectPage = false;

  switch (location.pathname) {
    case '/':
    case '/register':
      registering.form = true;
      break;
    case '/board':
      volPage = true;
      break;
    case '/projects':
      projectPage = true;
      break;
    default:
      break;
  }

  const closeDropdown = () => setDropdownOpen(false);
  const openDropdown = () => setDropdownOpen(true);

  const closeDropdownIfOpen = () => {
    if (dropdownOpen) {
      closeDropdown();
    }
  };

  const wrapperRef = useRef('menu');
  // useClickListener(wrapperRef, closeDropdown);
  // useEscapeListener(closeDropdownIfOpen);

  const getAdminDetails = () => {
    const admin = localStorage.getItem('auth');
    if (admin) {
      setAdminDetails(JSON.parse(admin));
    }
  };

  useEffect(() => {
    if (UserAuth.isAuthenticated) {
      getAdminDetails();
    }
  }, [UserAuth]);

  const classes = useStyles();

  const handleVolunteerClick = () => {
    window.location.href = '/board';
  };

  const handleProjectClick = () => {
    window.location.href = '/projects';
  };

  return (
    <StyledHeader>
      <VomaLogo />
      {!UserAuth.isAuthenticated() ? (
        <LoginLink to="/login">Login</LoginLink>
      ) : (
        <>
          <HeaderLinksWrapper>
            <HeaderLinkContainer active={volPage}>
              <HeaderLink onClick={handleVolunteerClick} variant="large" forHeader>
                Volunteers
              </HeaderLink>
            </HeaderLinkContainer>
            <HeaderLinkContainer active={projectPage}>
              <HeaderLink onClick={handleProjectClick} variant="large" forHeader>
                Projects
              </HeaderLink>
            </HeaderLinkContainer>
          </HeaderLinksWrapper>
          <ProfileMenu adminDetails={adminDetails} />
        </>
      )}
    </StyledHeader>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="fixed">
    //     <Toolbar>
    //       <div className={classes.headerLinkContainer}>
    //         <Typography variant="h6" noWrap component="div" className={classes.appLogo}>
    //           {!UserAuth.isAuthenticated() ? 'Code for Chicago' : 'Voma'}
    //         </Typography>
    //         <div className={classes.navLinks}>
    //           {UserAuth.isAuthenticated() ? (
    //             <Link
    //               className={
    //                 volPage ? `active ${classes.headerLink}` : `inactive ${classes.headerLink}`
    //               }
    //               to="/board"
    //             >
    //               VOLUNTEERS
    //             </Link>) : (
    //               <Link
    //                 className={
    //                   registering.form ? `active ${classes.headerLink}` : `inactive ${classes.headerLink}`
    //                 }
    //                 to="/register"
    //                 >
    //                   REGISTRATION
    //                 </Link>
    //             )}
    //             <Link
    //               className={
    //                 projectPage ? `active ${classes.headerLink}` : `inactive ${classes.headerLink}`
    //               }
    //               to="/projects"
    //               >
    //               PROJECTS
    //             </Link>
    //         </div>
    //       </div>
    //       {registering.form && 'Social Button Here'}

    //       {!registering.form && <LoginToggleButton />}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
