import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';
import { Typography } from '@mui/material';
import { BellRing, Hand } from 'lucide-react';
import { fetchVolunteers, fetchProjects, getIndicatorViewsLS, setViewedLS } from '../lib/Requests';
import VolunteerCard from '../components/AssignmentBoard/VolunteerCard';
import ProjectContainer from '../components/AssignmentBoard/ProjectContainer';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import { VolunteerPageSidebar } from '../styles/pages/AssignmentBoard.style';
import useTitle from '../hooks/useTitle';

const useStyles = makeStyles({
    sidebar: {
        overflowY: 'scroll',
        // paddingLeft: '16px',
        // paddingRight: '24px',
        minHeight: 'calc(100vh - 64px)',
        maxHeight: 'calc(100vh - 64px)',
        marginTop: '-32px',
        backgroundColor: 'rgba(98, 0, 238, 0.08)',
        '& .MuiBox-root': {
            display: 'inline-block',
        },
        '& input': {
            textAlign: 'right',
        }
    },
    board: {
        overflowX: 'scroll',
        paddingRight: '24px',
        marginTop: '-32px',
        width: 'calc(100vw - 272px)',
        maxWidth: 'calc(100vw - 272px)',
        '& > .MuiBox-root': {
            marginLeft: '9px',
        },
        '& > .MuiBox-root ~ .MuiBox-root': {
            marginLeft: '16px',
        }
    },
    projectCard: {
        width: '248px',
        borderRadius: '4px',
        display: 'inline-block',
        padding: '12px',
        whiteSpace: 'normal',
        verticalAlign: 'top',
        backgroundColor: 'rgba(255,255,255,0.38)',
        boxShadow: '0px 1px 1px rgba(0,0,0,0.14), 0px 2px 1px rgba(0,0,0,0.12), 0px 1px 3px rgba(0,0,0,0.2);',
        '& hr': {
            marginBottom: '16px',
            border: '1px solid #6200ee',
        },
        '&.active': {
            border: '1px solid #6200ee',
            backgroundColor: 'rgba(98, 0, 238, 0.08)',
        }
    },
    projectCardButton: {
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '12px',
        marginBottom: '16px',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: '14px',
        letterSpacing: '1.25px',
        fontWeight: '500',
        backgroundColor: deepPurple.A700,
    }
})

export default function AssignmentBoard() {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState({ onboarding: [], assign: []});
    const [volunteersFiltered, setVolunteersFiltered] = useState(false);
    const [projects, setProjects] = useState([]);
    const [volunteerCards, setVolunteerCards] = useState([]);
    const [projectCards, setProjectCards] = useState([]);
    let {viewed, notViewed} = getIndicatorViewsLS();
    useTitle('Voma | Volunteers');

    const classes = useStyles(); 

    useEffect(() => { // Run once on component mount and initialize volunteer/project data.
        async function initializeBoard() {
            let volunteerList = await fetchVolunteers();
            let projectList = await fetchProjects();

            setVolunteers(volunteerList);
            setProjects(projectList);
        }
        initializeBoard();
    }, []); // \Run once on component mount and initialize volunteer/project data.

    const showIndicator = (id) => getIndicatorViewsLS().notViewed.includes(id);
    const showOnboardingIndicator = (id) => true;


    useEffect(() => { // map over volunteers and sort them into their project
        if (volunteers.length > 0 && !volunteersFiltered && projects.length > 0) {
            const copy = { ...filteredVolunteers };
            volunteers.forEach((vol) => {
                if (!vol.projectId) {
                    if (vol.completedTasks.length === 3) { // TODO: Check for actual completed tasks
                        if (!viewed.includes(vol.id) && (!notViewed.includes(vol.id))) {
                            notViewed = [...notViewed, vol.id]
                            localStorage.setItem('tasksComplete', JSON.stringify({viewed, notViewed}))
                        }
                        copy.assign.push(vol);
                    } else {
                        copy.onboarding.push(vol);
                    }
                } else if (copy[vol.projectId]) {
                        copy[vol.projectId].push(vol);
                } else {
                    copy[vol.projectId] = [vol];
                    }
            });

            const sidebar = (
                <VolunteerPageSidebar>
                    <h3>Assign to Project</h3>
                    
                    { copy.assign.length > 0 ? 
                        copy.assign.map((vol) => <VolunteerCard 
                            key={`volunteer-${vol.id}`} 
                            volunteer={vol}
                            projects={projects}
                            handleShowIndicator={showIndicator}
                            handleViewedLS={setViewedLS}
                            icon={<BellRing />}
                        />) 
                        : 
                        <Typography variant="body">No Volunteers Ready to Assign</Typography> 
                    }
                    <h3>Currently Onboarding</h3>
                    { copy.onboarding.length > 0 ? 
                        copy.onboarding.map((vol) => <VolunteerCard 
                            key={`volunteer-${vol.id}`} 
                            volunteer={vol}
                            projects={projects}
                            handleViewedLS={() => {}}
                            handleShowIndicator={showOnboardingIndicator}
                            icon={<Hand />}
                        />) 
                        :
                        <Typography variant="body">No Volunteers Currently Onboarding</Typography> 
                    }
                </VolunteerPageSidebar>
            )
            setVolunteerCards(sidebar);
            setFilteredVolunteers(copy);
            setVolunteersFiltered(true);
        }
    }, [volunteers, volunteersFiltered, filteredVolunteers, projects]);

    useEffect(() => {
        if (projects.length > 0) {
            const cards = projects.map((project) => ( // Display projects.
            <ProjectContainer 
                key={`project-${project.id}`} 
                volunteers={filteredVolunteers[project.id] || []}
                project={project}
                classes={classes}
                projects={projects}
            />
            ));
            setProjectCards(cards);
        }
    }, [projects, classes, filteredVolunteers]);


    return (<>
        <BoardContainer 
            sideBarContent={volunteerCards}
            mainContainerContent={projectCards}
        />
    </>)
}