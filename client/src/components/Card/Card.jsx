import Draggable from 'react-draggable';
import { useRef } from 'react';
import './Card.scss';

export default function Card() {
    const nodeRef = useRef(null);

    return (
        <Draggable 
        nodeRef={nodeRef} 
        defaultPosition = {{x: 0, y: 0 }}>
            <div ref = {nodeRef} className='card'>Hi</div>
        </Draggable>
    )
}