import React from 'react';
import { BodySubText, Label3 } from '../../../../styles/components/Typography';
import { ProfileInfoContainer, IncompleteTaskIcon, TaskContainer } from '../../../../styles/components/VolunteerModal.style';
import { ReactComponent as CompletedTask } from'../../../../assets/CompletedTask.svg';

const Tasks = ({ tasks }) => {
    // Need to store these tasks in a constant file somewhere
    const watchObVideo = "Watch onboarding videos";
    const submitPasscode = "Submit passcode validation";
    const skillsSurvey = "Submit skills survey";
    
    return (
        <>
            <h3>Tasks</h3>
            <BodySubText>Track this volunteer&apos;s progress in your onboarding workflow.</BodySubText>
            <ProfileInfoContainer>
                <h4>Onboarding</h4>
                <TaskContainer>
                    { tasks.indexOf(watchObVideo) !== -1 ? <CompletedTask /> : <IncompleteTaskIcon />}
                    <Label3>
                        { watchObVideo }
                    </Label3>
                </TaskContainer>
                <TaskContainer>
                    { tasks.indexOf(submitPasscode) !== -1 ? <CompletedTask /> : <IncompleteTaskIcon />}
                    <Label3>
                        { submitPasscode }
                    </Label3>
                </TaskContainer>
                <TaskContainer>
                    { tasks.indexOf(skillsSurvey) !== -1 ? <CompletedTask /> : <IncompleteTaskIcon />}
                    <Label3>
                        { skillsSurvey }
                    </Label3>
                </TaskContainer>
            </ProfileInfoContainer>
        </>
    );
}

export default Tasks;
