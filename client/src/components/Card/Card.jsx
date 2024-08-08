import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import './Card.scss';

export default function Card() {
    const nodeRef = useRef(null);

    const [cardPosX, setCardPosX]= useState({x: 0, y: 0});

    const handleStop = () => {
        //figure out the current location of the div after the div is dropped
        //pass location down as a prop from parent
        if (nodeRef.current) {
            let rect=nodeRef.current.getBoundingClientRect();
            let xPos=rect.x;
            let yPos=rect.y;
            setCardPosX({xPos, yPos});
        }
    }

    console.log(cardPosX);

    return (
        <Draggable 
        nodeRef={nodeRef} 
        defaultPosition = {{x: 0, y: 0 }}
        onStop={handleStop}
        >
            <div ref = {nodeRef} className='card'>Hi</div>
        </Draggable>
    )
}