import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import DonutChart from "../../components/DonutChart/DonutChart";
import BarChart from "../../components/BarChart/BarChart";
import SideNav from '../../components/SideNav/SideNav';
import arrow from '../../assets/icons/right-arrow.png';
import logo from '../../assets/logo/logo-new.png';
import './ProjectDetails.scss';

export default function ProjectDetails() {
  
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');
  
  const [project, setProject] = useState({});
  const [cards, setCards] = useState([]);
  const [generatedContent, setGeneratedContent] = useState({});
  const [generatedReport, setGeneratedReport] = useState({});
  const [generatedRecs, setRecommendations]= useState({});
  const [navBar, setNavBar] = useState(false);
  const [loading, setLoading] = useState(true);
    
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
        setProject(responseProject.data);

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

      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (project.name) {
      const fetchAIData = async () => {
        try {
          const contentPrompt = `generate a report and metrics summary for this project:${project.name} and ${project.description} with these task cards ${JSON.stringify(cards)}. Return a paragraph that is 5-6 sentences long summarizing the project. Wrap key points with <strong> tags for bold text. Don't mention the card ID number.`;
          const reportPrompt = `generate a progress report given the cards that are in each of the four categories:${JSON.stringify(cards)}, where completed means the tasks are completed and to do means the tasks are yet to be started for this project:${project.name}. Return a couple paragraphs. Wrap key points with <strong> tags for bold text.  Don't mention the card ID number.`;
          const recsPrompt = `generate project recommendations to a project manager for this project ${project} with these task cards ${JSON.stringify(cards)}. Consider the start and end date of the project (remaining time) and story points remaining. Wrap key points with <strong> tags for bold text.  Don't mention the card ID number.`
          
          const [contentResponse, reportResponse, recsResponse] = await Promise.all([
            axios.post(`${baseUrl}/openai/generate`, { prompt: contentPrompt }),
            axios.post(`${baseUrl}/openai/generate`, { prompt: reportPrompt }),
            axios.post(`${baseUrl}/openai/generate`, { prompt: recsPrompt })
          ]);

          setGeneratedContent(contentResponse);
          setGeneratedReport(reportResponse);
          setRecommendations(recsResponse);

          setLoading(false);
  
        } catch (error) {
          console.error('Error generating AI content:', error);
        }
      };
  
      fetchAIData();
    }
  }, [cards, project]);

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

  const closeNav = () => {
    setNavBar(prev => !prev);
  }

  if (loading) {
    return (
      <section className="loading">
        <div className="loading__text">Loading Content...</div>
        <img src={logo} alt="logo-loader" className="loading__logo"></img>
      </section>
  )}

  return (
    <section className="nav">
      <img 
        src={arrow} 
        onClick={() => setNavBar(!navBar)}
        className={`nav__arrow ${navBar ? 'nav__arrow--active' : ''}`} 
        alt="Open-Navbar" 
      />
      <SideNav openNav={navBar} closeNav={closeNav} />
      <section className="details" >
        <h1 className="details__header">{project.name} Summary</h1>
        <section className='details__body' dangerouslySetInnerHTML={{ __html: generatedContent.data }} />
        <section className="details__chart">
          <DonutChart countCards={countCards} />
        </section>
        <section>
          <BarChart countPoints={countPoints} />
        </section>
        <section>
          <h2 className="details__header">Progress Report</h2>
          <section className='details__body' dangerouslySetInnerHTML={{ __html: generatedReport.data }} />
        </section>
        <section>
          <h2 className="details__header">Project Reccomendations</h2>
          <section className='details__body' dangerouslySetInnerHTML={{ __html: generatedRecs.data }} />
        </section>
      </section>
    </section>
  )
}