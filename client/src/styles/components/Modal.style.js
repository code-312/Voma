import styled from 'styled-components';
import { X } from 'lucide-react';
import { Card } from './Card.style';

export const ModalBackdrop = styled.div`
    z-index: 300;
    background-color: var(--blueShadeSemiTransparent);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    align-items: enter;
`;

export const ModalBody = styled(Card)`
    opacity: 1;
`;

export const ModalClose = styled(X)`
    color: #fff;
    margin: 24px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
`;