import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import DonutChart from "../../components/DonutChart/DonutChart";
import './ProjectDetails.scss';

export default function ProjectDetails() {
    const { id } = useParams();
    let baseUrl= 'http://localhost:8080'
    const [project, setProject] = useState({});
    const [cards, setCards] = useState([]);

    const countCards = () => {
        let cardCount = {
          todo: 0,
          inprog: 0,
          inrev: 0,
          comp: 0
        }
    
        cards.forEach((card) => {
          if (card.category === 'To Do'){
            cardCount.todo = cardCount.todo + 1;
          } 
          if (card.category === 'In Progress'){
            cardCount.inprog = cardCount.inprog + 1;
          }
          if (card.category === 'In Review'){
            cardCount.inrev = cardCount.inrev + 1;
          }
          if (card.category === 'Completed'){
            cardCount.comp = cardCount.comp + 1;
          }
        })
    
        return cardCount;
    }
    
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
    }, [id]);

    return (
        <section>
            <h1>{project.name} details page</h1>
            <section className="details">
                <DonutChart countCards={countCards} />
            </section>
        </section>
    )
}

//plan
//use chart JS with donut chart for metrics

//Task Assist
//gantt chart for project timelines (need project start date, due date, milestones in between)
//progress chart (donut chart for todo, in progress, in review, completed)
//resource allocation chart
//auto generate report summary
//option to create own prompt to create specialized report 
//team performance metrics
//forcasting project timeline 