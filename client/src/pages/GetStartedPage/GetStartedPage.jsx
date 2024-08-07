import { useNavigate } from 'react-router-dom';
import './GetStartedPage.scss';

export default function GetStarted(){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/board');
    }
    return (
        <section className="get-started">
            <h1 className="get-started__header">Get Started.</h1>
            <form onSubmit={handleSubmit} className='get-started__form'>
                <label className='get-started__label' htmlFor='email'>Email</label>
                <input className='get-started__input' id ="email" name='email' placeholder='Your Email'></input>
                <label className='get-started__label' htmlFor='name'>Name</label>
                <input className='get-started__input' id ="name" name='name' placeholder='Your Name'></input>
                <label className='get-started__label' htmlFor='project'>Project Name</label>
                <input className='get-started__input' id ="project" name='project' placeholder='Your Project Name'></input>
                <label className='get-started__label' htmlFor='summary'>Brief Project Scope</label>
                <textarea className='get-started__textarea' id ="summary" name='summary' placeholder='Fullstack web development project'></textarea>
                <button type='submit' className='get-started__button'>
                    Generate My Project
                </button>
            </form>
        </section>
    )
}

//to do:
//setup database and store submission data there to access it later