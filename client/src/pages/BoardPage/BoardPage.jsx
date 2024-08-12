import { useState, useEffect, useRef } from "react";
import {DndContext} from '@dnd-kit/core';
import Droppable from './Draggable.jsx';
import Draggable from "./Draggable.jsx";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './BoardPage.scss';
import Card from "../../components/Card/Card.jsx";
import Column from "../../components/Column/Column.jsx";

export default function BoardPage() {
    let baseUrl = 'http://localhost:8080';

    const parentRef1 = useRef(null);
    const parentRef2 = useRef(null);
    const parentRef3 = useRef(null);
    const parentRef4 = useRef(null);

    const [project, setProject] = useState({});

    const [cards, setCards] = useState([]);
    const [toDoCards, setToDoCards] = useState([]);
    const [inProgCards, setInProgCards] = useState([]);
    const [inRevCards, setInRevCards] = useState([]);
    const [completedCards, setCompletedCards] = useState([]);

    const [columns, setColumns] = useState({
        toDo: { ref: parentRef1, bounds: null },
        inProgress: { ref: parentRef2, bounds: null },
        inReview: { ref: parentRef3, bounds: null },
        completed: { ref: parentRef4, bounds: null },
    });
    
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
                setCards(response.data);
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
    }, [cards])

    useEffect(() => {
        const calculateBounds = () => {
            if(parentRef1.current && parentRef2.current && parentRef3.current && parentRef4.current){
                let bounds1 = parentRef1.current.getBoundingClientRect();
                let bounds2 = parentRef2.current.getBoundingClientRect();
                let bounds3 = parentRef3.current.getBoundingClientRect();
                let bounds4 = parentRef4.current.getBoundingClientRect();

                setColumns((prev) => ({
                    toDo: { ...prev.toDo, bounds: { left: bounds1.left, right: bounds1.right } },
                    inProgress: { ...prev.inProgress, bounds: { left: bounds2.left, right: bounds2.right } },
                    inReview: { ...prev.inReview, bounds: { left: bounds3.left, right: bounds3.right } },
                    completed: { ...prev.completed, bounds: { left: bounds4.left, right: bounds4.right } },
                }));
            }
        };

        const timeoutId = setTimeout(calculateBounds, 100);

        return () => clearTimeout(timeoutId);

    }, [cards]);

    const handleDrag = (event) => {
        const {over} = event;
        setParent(over ? over.id : null);
    }

    if (typeof project === "undefined" || cards.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <section className="board">
            <div className="board__details">
                <h1 className="board__name">{project.name}</h1>
                <div>{project.user_id}</div>
            </div>
            <DndContext onDragEnd={handleDrag}>
                <section className="board__kanban">
                    <Droppable id="todo" className="board__column">
                        <div className="board__header">To Do</div>
                        <div className="board__column-cards">
                            {toDoCards.map(card => (
                                <Draggable key={card.id} id={card.id}>
                                    <Card title={card.title} description={card.description} />
                                </Draggable>
                            ))}
                        </div>
                    </Droppable>

                    <Droppable id="inprogress" className="board__column">
                        <div className="board__header">In Progress</div>
                        <div className="board__column-cards">
                            {inProgCards.map(card => (
                                <Draggable key={card.id} id={card.id}>
                                    <Card title={card.title} description={card.description} />
                                </Draggable>
                            ))}
                        </div>
                    </Droppable>

                    <Droppable id="inreview" className="board__column">
                        <div className="board__header">In Review</div>
                        <div className="board__column-cards">
                            {inRevCards.map(card => (
                                <Draggable key={card.id} id={card.id}>
                                    <Card title={card.title} description={card.description} />
                                </Draggable>
                            ))}
                        </div>
                    </Droppable>

                    <Droppable id="completed" className="board__column">
                        <div className="board__header">Completed</div>
                        <div className="board__column-cards">
                            {completedCards.map(card => (
                                <Draggable key={card.id} id={card.id}>
                                    <Card title={card.title} description={card.description} />
                                </Draggable>
                            ))}
                        </div>
                    </Droppable>
                </section>
            </DndContext>
        </section>
    );
}

//to do:
// make it so card will drag and drop onto one of the four columns
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
