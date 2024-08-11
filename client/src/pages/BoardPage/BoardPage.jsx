import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './BoardPage.scss';
import Card from "../../components/Card/Card.jsx";

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

    // console.log(cards);
    // console.log(toDoCards);
    // console.log(inRevCards);
    // console.log(inProgCards);
    // console.log(completedCards);

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

    if (typeof project === "undefined" || cards.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <section className="board">
            <div className="board__details">
                <h1 className="board__name">{project.name}</h1>
                <div>{project.user_id}</div>
            </div>
            <section className="board__kanban">
                <div className="board__column" ref={parentRef1}>
                    <div className="board__header">
                        To Do
                    </div>
                    <div className="board__column-cards">
                        {
                            toDoCards.map((card)=>(
                                <div key={card.id}>
                                    <Card parentPos={columns.toDo.bounds} title ={card.title} description ={card.description}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="board__column" ref={parentRef2}>
                    <div className="board__header">
                        In Progress
                    </div>
                    <div className="board__column-cards">
                        {
                            inProgCards.map((card)=>(
                                <div key={card.id}>
                                    <Card parentPos={columns.inProgress.bounds} title ={card.title} description ={card.description}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="board__column" ref={parentRef3}>
                    <div className="board__header">
                        In Review
                    </div>
                    <div className="board__column-cards">
                        {
                           inRevCards.map((card)=>(
                                <div key={card.id}>
                                    <Card parentPos={columns.inReview.bounds} title ={card.title} description ={card.description}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="board__column" ref={parentRef4}>
                    <div className="board__header">
                        Completed
                    </div>
                    <div className="board__column-cards">
                        {
                           completedCards.map((card)=>(
                                <div key={card.id}>
                                    <Card parentPos={columns.completed.bounds} title ={card.title} description ={card.description}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </section>
    );
}

//to do:
// make it so card will drag and drop onto one of the four columns
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
