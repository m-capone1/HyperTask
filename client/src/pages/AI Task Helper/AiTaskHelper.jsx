import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AiTaskHelper() { 

    const [budget, setBudget] = useState("");
    const [proposal, setProposal] = useState("");
    const [minutes, setMinutes] = useState("");

    let url= "https://www.upwork.com/nx/search/jobs/details/~01fa904617e3f7e3b0?q=react&nav_dir=pop&pageTitle=Job%20Details&_modalInfo=%5B%7B%22navType%22%3A%22slider%22,%22title%22%3A%22Job%20Details%22,%22modalId%22%3A%221723738481885%22%7D%5D";
    let baseUrl = 'http://localhost:8080/openai/generate'
    const extractActionItems = async() => {
        try {
            let prompt = `Extract action items from the provided meeting minutes.`
            const responseAi = await axios.post(`${baseUrl}`,
              {prompt}
            );

            if(responseAi){
                setMinutes(responseAi)
            }

            console.log(responseAi.data);
        }catch(e){
            console.log("Error extracting action items", e)
        }
    }

    // extractActionItems();

    const createProposal = async() => {
        try {
            let prompt = `Create a proposal for this project: ${url}. Please write it with a profesional tone.`
            const responseAi = await axios.post(`${baseUrl}`,
              {prompt}
            );

            console.log(responseAi.data);
            if(responseAi){
                setProposal(responseAi)
            }
        }catch(e){
            console.log("Error creating proposal", e)
        }
    }

    // createProposal();

    useEffect(() => {
        const createBudget = async() => {
            try {
                let prompt = `Create a spreadsheet budget for this project: ${url}. Please consider the time it will take to complete the project.`
                const responseAi = await axios.post(`${baseUrl}`,
                  {prompt}
                );
    
                if(responseAi){
                    setBudget(responseAi)
                }
            }catch(e){
                console.log("Error creating budget", e)
            }
        }
    
        createBudget();

    }, [])
    
    return (
    <section>
        <h1>Ai Task Helper</h1>
        <section>
            <h2>Proposal Development</h2>
            <div>
                {proposal.data}
            </div>
        </section>
        <section>
            <h2>Extract Meeting Minutes</h2>
            <div>
                {minutes.data}
            </div>
            <form>
                <textarea></textarea>
            </form>
        </section>
        <section>
            <h2>Project Budgetting</h2>
            <section>
                {budget.data}
            </section>
        </section>
    </section>);

}
