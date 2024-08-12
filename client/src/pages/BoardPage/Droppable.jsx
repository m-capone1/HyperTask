import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });
    const style = {
        backgroundColor: isOver ? 'lightblue' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}