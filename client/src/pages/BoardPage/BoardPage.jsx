import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

export default function BoardPage() {
    let baseUrl = 'http://localhost:8080';

    const [project, setProject] = useState({});
    const [allCards, setAllCards] = useState({});
    const containers = ['To Do', 'In Progress', 'In Review', 'Completed'];

  const [parent, setParent] = useState(containers[0]);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );
    
    let { id } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${baseUrl}/project/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        }
        fetchProject();

        const fetchCards = async () => {
            try {
                const response = await axios.get(`${baseUrl}/card/cards/${id}`);
                setAllCards(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        }
        fetchCards();

    }, [id]);

    useEffect(()=> {
        const fetchToDoCards = async () => {
            try {
                const response = await axios.get(`${baseUrl}/card/${id}/todo`);
                setToDoCards(response.data);
            } catch (error) {
                console.error("Error fetching to do cards:", error);
            }
        }
        fetchToDoCards();

        const fetchInProgCards = async () => {
            try {
                const response = await axios.get(`${baseUrl}/card/${id}/inprogress`);
                setInProgCards(response.data);
            } catch (error) {
                console.error("Error fetching in progress cards:", error);
            }
        }
        fetchInProgCards();

        const fetchInRevCards = async () => {
            try {
                const response = await axios.get(`${baseUrl}/card/${id}/inreview`);
                setInRevCards(response.data);
            } catch (error) {
                console.error("Error fetching in review cards:", error);
            }
        }
        fetchInRevCards();

        const fetchCompletedCards = async () => {
            try {
                const response = await axios.get(`${baseUrl}/card/${id}/completed`);
                setCompletedCards(response.data);
            } catch (error) {
                console.error("Error fetching completed cards:", error);
            }
        }
        fetchCompletedCards();
    }, [])

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
