import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import './Droppable.scss';
import AddCard from '../../components/AddCard/AddCard';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'pink' : undefined,
  };
  
  return (
    <div ref={setNodeRef} className="droppable" style={style}>
      <div>
        <h3>{props.container}</h3>
        {props.children}
      </div>
      <div className='droppable__modal'>
        <AddCard />
      </div>
    </div>
  );
}