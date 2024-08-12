import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export default function BoardPage() {
  const baseUrl = 'http://localhost:8080';
  const { id } = useParams();

  const [cards, setCards] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [inRev, setInRev] = useState([]);
  const [completed, setCompleted] = useState([]);
  let containers = ["To Do", "In Progress", "In Review", "Completed"];

  const sortCards = (cards) => {
    const toDoCards = [];
    const inProgCards = [];
    const inRevCards = [];
    const completedCards = [];

    cards.forEach((card) => {
      if (card.category === "To Do") {
        toDoCards.push(card);
      } else if (card.category === 'In Progress') {
        inProgCards.push(card);
      } else if (card.category === 'In Review') {
        inRevCards.push(card);
      } else if (card.category === 'Completed') {
        completedCards.push(card);
      }
    });

    setToDo(toDoCards);
    setInProg(inProgCards);
    setInRev(inRevCards);
    setCompleted(completedCards);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/card/cards/${id}`);
        setCards(response.data);

      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    sortCards(cards);
  }, [cards]);


  function handleDragEnd(event) {
    const { over, active } = event;
    
    if (over) {
      const fromContainer = findContainer(active.id);
      const toContainer = over.id;
  
      let movedCard;

      if (fromContainer === "To Do") {
        setToDo(prevCards => {
            const updatedCards = [...prevCards];
            const index = updatedCards.findIndex(card => card.id === active.id);
            movedCard = updatedCards.splice(index, 1)[0];
            return updatedCards;
          });
      } else if (fromContainer === "In Progress") {
        setInProg(prevCards => {
          const updatedCards = [...prevCards];
          const index = updatedCards.findIndex(card => card.id === active.id);
          movedCard = updatedCards.splice(index, 1)[0];
          return updatedCards;
        });
      } else if (fromContainer === "In Review") {
        setInRev(prevCards => {
          const updatedCards = [...prevCards];
          const index = updatedCards.findIndex(card => card.id === active.id);
          movedCard = updatedCards.splice(index, 1)[0];
          return updatedCards;
        });
      } else if (fromContainer === "Completed") {
        setCompleted(prevCards => {
          const updatedCards = [...prevCards];
          const index = updatedCards.findIndex(card => card.id === active.id);
          movedCard = updatedCards.splice(index, 1)[0];
          return updatedCards;
        });
      }
      console.log(`to: ${toContainer}, from: ${fromContainer}`);
      console.log('Moved card:', movedCard);

      movedCard.category = toContainer;
  
      if (toContainer === "To Do") {
        setToDo(prevCards => [...prevCards, movedCard]);
      } else if (toContainer === "In Progress") {
        setInProg(prevCards => [...prevCards, movedCard]);
      } else if (toContainer === "In Review") {
        setInRev(prevCards => [...prevCards, movedCard]);
      } else if (toContainer === "Completed") {
        setCompleted(prevCards => [...prevCards, movedCard]);
      }

      const updateDatabase = async() => {
        try {
            console.log(movedCard);
            let movedCardId = movedCard.id;
            let cardToUpdate = {
                project_id: movedCard.project_id,
                id : movedCard.id,
                category: movedCard.category,
                title: movedCard.title,
                description: movedCard.description
            }
            const response = await axios.put(`${baseUrl}/card/${movedCardId}`, cardToUpdate)
        } catch(e) {
            console.log("Error with put request", e);
        }
    }

      updateDatabase();
    }
  }
   
  function findContainer(cardId) {
        let foundContainer = toDo.find(card => card.id === cardId);
        if(foundContainer){
            return 'To Do'
        }
        foundContainer = inProg.find(card => card.id === cardId);
        if(foundContainer){
            return 'In Progress'
        }
        foundContainer = inRev.find(card => card.id === cardId);
        if(foundContainer){
            return 'In Review'
        }
        foundContainer = completed.find(card => card.id === cardId);
        if(foundContainer){
            return 'Completed'
        }
    }

//   if(!cards){
//     return <div>Loading...</div>
//   }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {containers.map((container, index) => (
        <Droppable key={container} id={container}>
          <div>{container}</div>
          {(index === 0 ? toDo : index === 1 ? inProg : index === 2 ? inRev : completed).map((card) => (
            <Draggable key={card.id} id={card.id}>
              {card.title}
            </Draggable>
          ))}
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
