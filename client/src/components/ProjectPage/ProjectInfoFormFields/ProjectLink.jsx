import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ProjectInfoTextField } from '../../../styles/pages/ProjectPage.style';

const ProjectLink = ({ link, onChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
return (
        <>
            <Switch defaultChecked={link.required} />
            <ProjectInfoTextField name={link.text} value={link.url || ''} onChange={onChange} />
            <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            // PaperProps={{
            //   style: {
            //     maxHeight: ITEM_HEIGHT * 4.5,
            //     width: '20ch',
            //   },
            // }}
        >
            <MenuItem onClick={handleClose}>
                Delete
            </MenuItem>
            </Menu>
        </>
    );
};

export default ProjectLink;
