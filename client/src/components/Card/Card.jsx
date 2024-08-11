import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import './Card.scss';

export default function Card({parentPos, title, description}) {
    const nodeRef = useRef(null);
    // console.log(parentPos);

    const [cardPos, setCardPos]= useState({x: 0, y: 0});

    const handleStop = () => {
        if (nodeRef.current) {
            let rect=nodeRef.current.getBoundingClientRect();
            let xPos=rect.x;
            let yPos=rect.y;
            setCardPos({xPos, yPos});
        }
        //now evaluate the position to see which column it is closest to
        //then snap into place of the correct column

        if(cardPos.xPos > 0 && cardPos.xPos < 100){
            console.log('within zone');
        }
    }

    // console.log(cardPos);

    return (
        <Draggable 
        nodeRef={nodeRef} 
        defaultPosition = {{x: 0, y: 0 }}
        onStop={handleStop}
        >
            <div ref = {nodeRef} className='card'>{title}</div>
        </Draggable>
    )
}