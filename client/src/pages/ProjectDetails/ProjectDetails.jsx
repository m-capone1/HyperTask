import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import DonutChart from "../../components/DonutChart/DonutChart";
import BarChart from "../../components/BarChart/BarChart";
import './ProjectDetails.scss';

export default function ProjectDetails() {
    const { id } = useParams();
    let baseUrl= 'http://localhost:8080'
    const [project, setProject] = useState({});
    const [cards, setCards] = useState([]);
    const [generatedContent, setGeneratedContent] = useState({});

    const countPoints = () => {
      
      let points = {
        toDo: 0,
        inProg: 0,
        inRev: 0,
        comp: 0
      };

      cards.forEach((card) =>{
        if(card.category === "To Do"){
          points.toDo += card.story_points;
        }
        if(card.category === "In Progress"){
          points.inProg += card.story_points;
        }
        if(card.category === "In Review"){
          points.inRev += card.story_points;
        }
        if(card.category === "Completed"){
          points.comp += card.story_points;
        }
      })
      return points;

    }

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

          if(response){
            countCards();
          }

          if (responseProject.data){
            //add project description as well. 
            let prompt = `generate a report and metrics summary for this project:${project.name}. I want it to be a paragraph or so long. 5-6 sentences plus the metrics.`
            const responseAi = await axios.post(`${baseUrl}/openai/generate`,
              {prompt}
            );

            setGeneratedContent(responseAi);
          }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      };
      fetchData();
    }, [id]);

    return (
      <section className="details">
        <h1 className="details__header">{project.name} Summary</h1>
        <section>
          <h2>Project Summary</h2>
          <div>{generatedContent.data}</div> 
        </section>
        <section className="details__chart">
          <DonutChart countCards={countCards} />
        </section>
        <section>
          <BarChart countPoints={countPoints} />
        </section>
      </section>
    )
}


//Task Assist
//proposal development
//SOW development
//gantt chart for project timelines (need project start date, due date, milestones in between)
//budget stuff
//resource allocation chart
//team performance metrics
//forcasting project timeline 