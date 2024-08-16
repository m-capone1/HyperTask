import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import './Draggable.scss';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      onDoubleClick={props.handleViewCard}
      className='draggable'
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}