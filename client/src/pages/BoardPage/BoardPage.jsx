import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export default function BoardPage() {
  const containers = ['To Do', 'In Progress', 'In Review', 'Completed'];
  const [cards, setCards] = useState({
    'To Do': [],
    'In Progress': [],
    'In Review': [],
    'Completed': []
  });
  const [parent, setParent] = useState(containers[0]);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  useEffect(() => {
    // Replace with your actual fetch call
    const fetchCards = async () => {
      
     
      setCards();
    };

    fetchCards();
  }, []);


  return (
    <DndContext onDragEnd={handleDragEnd}>
      {containers.map((container) => (
        <Droppable key={container} id={container} container={container}>
          {parent === container ? draggableMarkup : ' '}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;
    setParent(over ? over.id : null);
  }
}
//to do:
// make it so card will drag and drop onto one of the four columns
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
