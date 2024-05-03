import React from 'react';
import { ArrowLeft, ArrowRight, StickyNote } from 'lucide-react';
import { StyledRegFormFooter } from '../../styles/pages/RegisterPage.style';
import { Label3 } from '../../styles/components/Typography';
import Button from '../Button';

const RegFormFooter = ({ step, goBack, goForward, canProceed }) => (
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
            <Button 
                variant='outline blue'
                onClick={goForward}
                disabled={step === 6 || !canProceed}
                icon={ArrowRight}
            >
                Next
            </Button>
        </div>
        <div>
            <StickyNote />
            <Label3>
                Page {step} of 6
            </Label3>
        </div>
    </StyledRegFormFooter>
);

export default RegFormFooter;
