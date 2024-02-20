import React from 'react';
import { Link } from 'react-router-dom'
import { VolunteerProjectCard } from '../../styles/pages/AssignmentBoard.style';
import VolunteerCard from './VolunteerCard';

export default function ProjectContainer({ volunteers, project, classes, projects }) {
    return (
        <VolunteerProjectCard>
            <Link to={`/projects?selected=${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4>{project.name}</h4>
            </Link>

            {volunteers.map((volunteer) => (
                <VolunteerCard
                    key={`volunteer-${volunteer.id}`}
                    volunteer={volunteer} 
                    projects={projects}
                />
            ))}
        </VolunteerProjectCard>
    );
}
