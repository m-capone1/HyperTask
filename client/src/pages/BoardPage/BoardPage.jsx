import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import ViewCard from '../../components/ViewCard/ViewCard';
import './BoardPage.scss';

export default function BoardPage() {
  const baseUrl = 'http://localhost:8080';
  const { id } = useParams();
  let navigate = useNavigate();

  const [project, setProject]= useState({});
  const [cards, setCards] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [inRev, setInRev] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
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

  const toggleTrigger = () => {
    setTrigger(prev => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/card/cards/${id}`);
        const responseProject = await axios.get(`${baseUrl}/project/${id}`)
        setCards(response.data);
        setProject(responseProject.data);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    fetchData();
  }, [id, trigger]);

  useEffect(() => {
    sortCards(cards);
  }, [cards]);

  function handleDragEnd(event) {
    const { over, active } = event;
    
    if (over) {
      const fromContainer = findContainer(active.id);
      const toContainer = over.id;
  
      let movedCard;

      if(fromContainer !== toContainer){
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

    const handleViewCard = (card) => {
      let cardTitle = card.target.innerText;
      const selectCard = cards.find(item => item.title === cardTitle);

      setSelectedCard(selectCard);
      setShowModal(true);
    };
    
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedCard(null);
    };

    const handleNavigate = (e) => {
      e.preventDefault;
      const currentPath = window.location.pathname;
      navigate(`${currentPath}/project-details`);
    }

  return (
    <>
        <section className='board__details'>
            <div className='board__name'>{project.name}</div>
        </section>
        <section>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='board'>
                    {containers.map((container, index) => (
                        <Droppable key={container} id={container} toggleTrigger={toggleTrigger}>
                            <div className="board__header">{container}</div>
                            {(index === 0 ? toDo : index === 1 ? inProg : index === 2 ? inRev : completed).map((card) => (
                                <Draggable 
                                    key={card.id} 
                                    id={card.id} 
                                    handleViewCard={handleViewCard}>
                                        {card.title}
                                </Draggable>
                            ))}
                        </Droppable>
                    ))}
                </div>
            </DndContext>
        </section>
        {selectedCard && (
          <ViewCard 
            isOpen={showModal} 
            card={selectedCard} 
            onClose={handleCloseModal}
            toggleTrigger={toggleTrigger}
          />
        )}
        <button onClick={handleNavigate}>Project Details</button>
    </>
  );
}
