import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export default function BoardPage() {
  const baseUrl = 'http://localhost:8080';
  const { id } = useParams();

  const [cards, setCards] = useState({
    'To Do': [],
    'In Progress': [],
    'In Review': [],
    'Completed': [],
  });
  
  const [newCards, setNewCards] = useState({
    'To Do': [],
    'In Progress': [],
    'In Review': [],
    'Completed': [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toDoResponse, inProgressResponse, inReviewResponse, completedResponse] = await Promise.all([
          axios.get(`${baseUrl}/card/${id}/todo`),
          axios.get(`${baseUrl}/card/${id}/inprogress`),
          axios.get(`${baseUrl}/card/${id}/inreview`),
          axios.get(`${baseUrl}/card/${id}/completed`)
        ]);

        setCards({
          'To Do': toDoResponse.data,
          'In Progress': inProgressResponse.data,
          'In Review': inReviewResponse.data,
          'Completed': completedResponse.data,
        });
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    fetchData();
  }, [id, baseUrl, newCards]);

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over) {
      const fromContainer = findContainer(active.id);
      const toContainer = over.id;

      if (fromContainer !== toContainer) {
        setCards(prevCards => {
            const updatedCards = { ...prevCards };
            const movedCardIndex = updatedCards[fromContainer].findIndex(card => card.id === active.id);
            const movedCard = updatedCards[fromContainer].splice(movedCardIndex, 1);
            updatedCards[toContainer].push(movedCard[0]);
          //figure out how to add card to any place on the board (ex.between other cards)
          
          if (updatedCards){
            updateCards(updatedCards);
          }
          return updatedCards;
        });
      }
    }
  }

  const updateCards = async(updatedCards) => {
    try{
        console.log(updatedCards);
        const [toDoResponse, inProgressResponse, inReviewResponse, completedResponse] = await Promise.all([
            axios.put(`${baseUrl}/card/${id}/todo`, {

            }),
            axios.put(`${baseUrl}/card/${id}/inprogress`, {

            }),
            axios.put(`${baseUrl}/card/${id}/inreview`, {

            }),
            axios.put(`${baseUrl}/card/${id}/completed`, {

            })
          ]);
  
          setCards({
            'To Do': toDoResponse.data,
            'In Progress': inProgressResponse.data,
            'In Review': inReviewResponse.data,
            'Completed': completedResponse.data,
          });

    } catch(e){
        console.error('Error fetching card data:', error);
    }
  }

  function findContainer(cardId) {
    for (let container in cards) {
      if (cards[container].some(card => card.id === cardId)) {
        return container;
      }
    }
    return null;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {Object.entries(cards).map(([container, containerCards]) => (
        <Droppable key={container} id={container}>
            <div>{container}</div>
            {containerCards.map(card => (
                <Draggable key={card.id} id={card.id}>
                {card.title}
                </Draggable>
            ))}
          {containerCards.length === 0 && ''}
        </Droppable>
      ))}
    </DndContext>
  );
}
//to do:
// make it so card will drag and drop onto one of the four columns
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
