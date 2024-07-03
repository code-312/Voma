import { useEffect, useState } from 'react';
import { BellRing, Hand } from 'lucide-react';
import {
  fetchVolunteers,
  fetchProjects,
  getIndicatorViewsLS,
  setViewedLS,
  fetchSkills,
} from '../lib/Requests';
import VolunteerCard from '../components/AssignmentBoard/VolunteerCard';
import ProjectContainer from '../components/AssignmentBoard/ProjectContainer';
import BoardContainer from '../components/AssignmentBoard/BoardContainer';
import { VolunteerPageSidebar } from '../styles/pages/AssignmentBoard.style';
import { BodyText2 } from '../styles/components/Typography';
import useTitle from '../hooks/useTitle';

export default function AssignmentBoard() {
  const [volunteers, setVolunteers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState({ onboarding: [], assign: [] });
  const [volunteersFiltered, setVolunteersFiltered] = useState(false);
  const [projects, setProjects] = useState([]);
  const [volunteerCards, setVolunteerCards] = useState([]);
  const [projectCards, setProjectCards] = useState([]);

  useTitle('Voma | Volunteers');

  useEffect(() => {
    // Run once on component mount and initialize volunteer/project data.
    async function initializeBoard() {
      let volunteerList = await fetchVolunteers();
      let projectList = await fetchProjects();
      const availableSkills = await fetchSkills();

      setVolunteers(volunteerList);
      setProjects(projectList);
      setSkills(availableSkills);
    }
    initializeBoard();
  }, []); // \Run once on component mount and initialize volunteer/project data.

  const showIndicator = (id) => getIndicatorViewsLS().notViewed.includes(id);
  const showOnboardingIndicator = (id) => true;

  useEffect(() => {
    // map over volunteers and sort them into their project
    if (volunteers.length > 0 && !volunteersFiltered && projects.length > 0 && skills.length > 0) {
      const copy = { ...filteredVolunteers };
      volunteers.forEach((vol) => {
        if (!vol.projectId) {
          copy.onboarding.push(vol);
        } else if (copy[vol.projectId]) {
          copy[vol.projectId].push(vol);
        } else {
          copy[vol.projectId] = [vol];
        }
      });

      const sidebar = (
        <VolunteerPageSidebar>
          <h3>Assign to Project</h3>

          {copy.assign.length > 0 ? (
            copy.assign.map((vol) => (
              <VolunteerCard
                key={`volunteer-${vol.id}`}
                volunteer={vol}
                projects={projects}
                handleShowIndicator={showIndicator}
                handleViewedLS={setViewedLS}
                skills={skills}
                icon={<BellRing />}
              />
            ))
          ) : (
            <BodyText2>No Volunteers Ready to Assign</BodyText2>
          )}
          <h3>Currently Onboarding</h3>
          {copy.onboarding.length > 0 ? (
            copy.onboarding.map((vol) => (
              <VolunteerCard
                key={`volunteer-${vol.id}`}
                volunteer={vol}
                projects={projects}
                handleViewedLS={() => {}}
                handleShowIndicator={showOnboardingIndicator}
                skills={skills}
                icon={<Hand />}
              />
            ))
          ) : (
            <BodyText2>No Volunteers Currently Onboarding</BodyText2>
          )}
        </VolunteerPageSidebar>
      );
      setVolunteerCards(sidebar);
      setFilteredVolunteers(copy);
      setVolunteersFiltered(true);
    }
  }, [volunteers, volunteersFiltered, filteredVolunteers, projects, skills]);

  useEffect(() => {
    if (projects.length > 0) {
      const cards = projects.map(
        (
          project, // Display projects.
        ) => (
          <ProjectContainer
            key={`project-${project.id}`}
            volunteers={filteredVolunteers[project.id] || []}
            skills={skills}
            project={project}
            projects={projects}
          />
        ),
      );
      setProjectCards(cards);
    }
  }, [projects, filteredVolunteers]);

  return (
    <>
      <BoardContainer sideBarContent={volunteerCards} mainContainerContent={projectCards} />
    </>
  );
}
