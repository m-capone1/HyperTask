import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';
import ViewCard from '../../components/ViewCard/ViewCard';
import SideNav from '../../components/SideNav/SideNav';
import arrow from '../../assets/icons/right-arrow.png';
import './BoardPage.scss';

export default function BoardPage() {

  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { id } = useParams();
  const token = sessionStorage.getItem('token');

  const [project, setProject] = useState({});
  const [cards, setCards] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [inRev, setInRev] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [navBar, setNavBar] = useState(false);
  
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
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${baseUrl}/card/cards/${id}`, config);
        const responseProject = await axios.get(`${baseUrl}/project/${id}`, config);

        setCards(response.data);

        if (responseProject.data) {
          const formatDate = (date) => {
            if (!date) return ''; 
            const formattedDate = new Date(date);
            if (isNaN(formattedDate.getTime())) return '';
            return formattedDate.toISOString().split('T')[0]; 
          };

            const formattedStartDate = formatDate(responseProject.data.start_date);
            const formattedEndDate = formatDate(responseProject.data.end_date);

            setProject({
              ...responseProject.data,
              start_date: formattedStartDate,
              end_date: formattedEndDate,
            });
        }

        sortCards(response.data);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
}, [id, trigger, token]);

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
            let movedCardId = movedCard.id;
            
            let cardToUpdate = {
              project_id: movedCard.project_id,
              id : movedCard.id,
              category: movedCard.category,
              title: movedCard.title,
              description: movedCard.description
            }
            
            await axios.put(`${baseUrl}/card/${movedCardId}`, cardToUpdate, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
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

  const closeNav = () => {
    setNavBar(prev => !prev);
  }
  
  return (
    <section className='nav'>
      <img 
        src={arrow} 
        onClick={() => setNavBar(!navBar)}
        className={`nav__arrow ${navBar ? 'nav__arrow--active' : ''}`} 
        alt="Open Navbar" 
      />
      <SideNav openNav={navBar} closeNav={closeNav} toggleTrigger={toggleTrigger} />
      <div className='board-container'>
        <section className='board__details'>
          <div className='board__name'>{project.name}</div>
          <div className='board__date'>
            <div className='board__date-text'>Start Date: {project.start_date}</div>
            <div className='board__date-text'>Target Completion Date: {project.end_date}</div>
          </div>
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
      </div>
    </section>
  );
}
