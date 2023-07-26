import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ReactComponent as Match } from '../../../../assets/Match.svg';
import { ReactComponent as Mismatch } from '../../../../assets/Mismatch.svg';
import Accordion from '../../../Accordion';
import { Label1, Label2, Label3, BodySubLabel } from '../../../../styles/components/Typography';
import { VolunteerLabel } from '../../../../styles/components/VolunteerCard.style';
import { 
    ProjectBoxContainer, 
    ProjectBoxName, 
    ProjectMatchIndicator,
    ProjectBoxMatchIndicator,
    ProjectAssignmentRow,
    ProjectAssignmentCell,
    AssignAccordionHeader,
    ProjectSkillContainer,
    ProjectAssignButtonContainer,
    IncompleteTaskIcon, 
} from '../../../../styles/components/VolunteerModal.style';
import Button from '../../../Button';
import { ReactComponent as CompletedTask } from'../../../../assets/CompletedTask.svg';

const ProjectBox = ({ project, volunteerSkill, assigned, toggleAssign }) => {
    const setProjectAndToggleAssign = () => {
        toggleAssign(project);
    }
    const isMatch = project.currentNeeds.indexOf(volunteerSkill) !== -1;
    const header = (
        <AssignAccordionHeader>
            <Label1>{project.name}</Label1>
            <VolunteerLabel bgColor={ isMatch ? 'volunteerGreen' : 'peachShade1'} color={isMatch ? 'white' : 'blueShadeII'}>
                {isMatch ? 'Meets Requirements' : 'Does Not Meet Requirements'}
            </VolunteerLabel>
            { assigned &&
                <VolunteerLabel bgColor='uiBlue' color='white'>
                    Assigned
                </VolunteerLabel>
            }
        </AssignAccordionHeader>
    );

    return (
        <Accordion header={header}>
            <ProjectSkillContainer>
                { isMatch ? 
                    <CompletedTask />
                :
                    <IncompleteTaskIcon />
                }
                <div>
                    <Label3>Role</Label3>
                    <BodySubLabel>{project.currentNeeds.join(', ')}</BodySubLabel>
                </div>
            </ProjectSkillContainer>
            <ProjectAssignButtonContainer>
                { assigned ? 
                    <Label3>Currently Assgined to This Project</Label3>
                :
                    <Button variant="fw outline blue" onClick={setProjectAndToggleAssign}>Assign volunteer to this project</Button>
                }
            </ProjectAssignButtonContainer>
        </Accordion>
        // <ProjectBoxContainer $selected={active} onClick={changeSelection} tabIndex={0} onKeyDown={changeSelectionKeyPress}>
        //     <ProjectAssignmentRow>
        //         <ProjectAssignmentCell>
        //             <Link to={`/projects?selected=${project.id}`} style={{ textDecoration: 'none' }}>
        //                 <ProjectBoxName $selected={active}>{project.name}</ProjectBoxName>
        //             </Link>
        //         </ProjectAssignmentCell>
        //     </ProjectAssignmentRow>
        //     <ProjectAssignmentRow>
        //         <ProjectAssignmentCell>
        //             <ProjectBoxMatchIndicator $selected={active} $match={isMatch}>
        //                 { isMatch ? 
        //                     <Match />
        //                     :
        //                     <Mismatch />
        //                 }
        //                 <ProjectMatchIndicator $match={isMatch}>{ isMatch ? 'MATCH' : 'MISMATCH '}</ProjectMatchIndicator>
        //             </ProjectBoxMatchIndicator>
        //         </ProjectAssignmentCell>
        //     </ProjectAssignmentRow>
        // </ProjectBoxContainer>
    )
};

export default ProjectBox;
