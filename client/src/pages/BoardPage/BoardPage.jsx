import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function BoardPage() {
    let baseUrl = 'http://localhost:8080/project';

    const [project, setProject] = useState({});
    let { id } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        }
        fetchProject();
    }, []);

    return (
        <div>
            {typeof project != "undefined" ? project.name : "Loading..."}
        </div>
    );
}

//to do:
//call server to fetch data from database (stored from the form submission)
//call open ai api to create prompts for 6 new kanban cards.
//add the cards to the board to 'get user started' 
//add button to add more cards (user can add cards manually or through a open ai prompt)
//add button to summarize project in a short report, metrics, etc.

//todo on another page:
//automated scheduling (meetings, deadline predictions)
//email creation
//automated 