import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import './BoardPage.scss';
import Card from "../../components/Card/Card.jsx";

export default function BoardPage() {
    let baseUrl = 'http://localhost:8080';

    const [project, setProject] = useState({});
    const [cards, setCards] = useState([]);
    const [cardPosition, setCardPosition] = useState({x : 0, y: 0});

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

    if (typeof project === "undefined" || cards.length === 0) {
        return <div>Loading...</div>
    }

    console.log(project);
    return (
        <section className="board">
            <div className="board__details">
                <h1 className="board__name">{project.name}</h1>
                <div>{project.user_id}</div>
            </div>
            <section className="board__kanban">
                <div className="board__column">
                    <div className="board__header">
                        To Do
                    </div>
                    <div className="board__column-cards">
                        <Card />
                    </div>
                </div>
                <div className="board__column">
                    <div className="board__header">
                        In Progress
                    </div>
                    <div className="board__column-cards"></div>
                </div>
                <div className="board__column">
                    <div className="board__header">
                        In Review
                    </div>
                    <div className="board__column-cards"></div>
                </div>
                <div className="board__column">
                    <div className="board__header">
                        Completed
                    </div>
                    <div className="board__column-cards"></div>
                </div>
            </section>
            <div>
                {/* {cards.map((card) => (
                    <div key={card.id}>{card.title}</div>
                ))} */}
            </div>
        </section>
    );
}

//to do:
//call server to fetch data from database (stored from the form submission)
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
//add button to summarize project in a short report, metrics, etc.
