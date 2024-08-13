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

  let category = props.children[0].props.children;

  return (
    <div ref={setNodeRef} className="droppable" style={style}>
      <h3 className='droppable__header'>{props.container}</h3>
      {props.children}
      <div className='droppable__modal'>
        <AddCard category={category}/>
      </div>
    </div>
  );
}