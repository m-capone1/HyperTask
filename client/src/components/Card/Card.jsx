import Draggable from 'react-draggable';
import { useRef, useState, useEffect } from 'react';
import './Card.scss';

export default function Card({ toDoPos, inProgPos, inRevPos, comPos, title, description, onSnap }) {
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const getClosestColumn = (x) => {
        const columns = [
            { name: 'toDo', bounds: toDoPos },
            { name: 'inProgress', bounds: inProgPos },
            { name: 'inReview', bounds: inRevPos },
            { name: 'completed', bounds: comPos }
        ];

        const centerPoints = columns.map(col => ({
            name: col.name,
            center: (col.bounds.left + col.bounds.right) / 2
        }));

        let closestColumn = centerPoints[0];
        let minDistance = Math.abs(x - closestColumn.center);

        centerPoints.forEach(col => {
            const distance = Math.abs(x - col.center);
            if (distance < minDistance) {
                closestColumn = col;
                minDistance = distance;
            }
        });

        return closestColumn;
    };

    const handleStop = (e, data) => {
        const closestColumn = getClosestColumn(data.x);

        let newPositionX = position.x;
        let newPositionY = data.y; // Maintain the current vertical position

        if (closestColumn.name === 'toDo') {
            newPositionX = toDoPos.left;
        } else if (closestColumn.name === 'inProgress') {
            newPositionX = inProgPos.left;
        } else if (closestColumn.name === 'inReview') {
            newPositionX = inRevPos.left;
        } else if (closestColumn.name === 'completed') {
            newPositionX = comPos.left;
        }

        // Update position to snap into place
        setPosition({ x: newPositionX, y: newPositionY });

        if (onSnap) {
            onSnap({ title, newPositionX, newPositionY });
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            grid={[200,0]}
            position={position}
            onStop={handleStop}
        >
            <div ref={nodeRef} className='card'>
                {title}
            </div>
        </Draggable>
    );
}