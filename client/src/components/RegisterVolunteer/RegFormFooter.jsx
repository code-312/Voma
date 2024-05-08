import React, { useContext } from 'react';
import { ArrowLeft, ArrowRight, StickyNote } from 'lucide-react';
import { StyledRegFormFooter } from '../../styles/pages/RegisterPage.style';
import { Label3 } from '../../styles/components/Typography';
import Button from '../Button';
import { VolunteerContext } from '../../lib/VolunteerProvider';

const RegFormFooter = ({ step, goBack, goForward, canProceed }) => {
    const Volunteer = useContext(VolunteerContext);
    if (step === 6) {
        return null;
    }
    return (
    <StyledRegFormFooter>
        <div>
            <Button
                variant="outline blue"
                onClick={goBack}
                disabled={step === 1}
                icon={ArrowLeft}
            >
                Back
            </Button>
            {step !== 5 ?
                <Button
                    variant='outline blue'
                    onClick={goForward}
                    disabled={!canProceed}
                    icon={ArrowRight}
                >
                    Next
                </Button>
                :
                <Button
                    variant="solid blue"
                    onClick={Volunteer.registerVolunteer}
                >
                    Submit
                </Button>
            }
        </div>
        <div>
            <StickyNote />
            <Label3>
                Page {step} of 5
            </Label3>
        </div>
    </StyledRegFormFooter>
    );
};

export default RegFormFooter;
