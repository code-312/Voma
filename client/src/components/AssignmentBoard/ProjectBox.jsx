import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import VolunteerBox from './VolunteerBox';

export default function ProjectBoard({ volunteers, project, classes }) {
    const [isActive, setIsActive] = useState(false);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'volunteer',
        drop: () => ({ 
            name: `project-${project.id}`,
            project
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }))

    return (
        <Box 
            className={classes.projectCard} 
            ref={drop}
            mt="8px" 
            mb="16px">

            <Typography variant="h6" mb="16px">{project.name}</Typography>

            {isActive &&
                <Box class={classes.projectCardButton}>
                    <Box>INSERT VOLUNTEER</Box>
                </Box>
            }

            <hr />

            {Object.entries(volunteers).map(([key, volunteer]) => (
                <VolunteerBox
                    key={`volunteer-${volunteer.id}`}
                    volunteer={volunteer} />
            ))}

        </Box>
    );
}
