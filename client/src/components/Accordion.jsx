import { useState } from 'react';
import { RxCaretUp, RxCaretDown } from 'react-icons/rx';
import {
  AccordionWrapper,
  AccordionHeader,
  AccordionContent,
} from '../styles/components/Accordion.style';

const Accordion = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={toggleAccordion} isOpen={isOpen}>
        {header}
        {isOpen ? <RxCaretUp /> : <RxCaretDown />}
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </AccordionWrapper>
  );
};

export default Accordion;
