import React from 'react';
import { ProfileIndicator } from '../styles/components/Header.style';

const ProfileMenu = ({ adminDetails}) => <ProfileIndicator>{adminDetails.name?.[0]}</ProfileIndicator>;

export default ProfileMenu;
