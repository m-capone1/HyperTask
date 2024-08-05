import { useNavigate } from 'react-router-dom';
import './GetStartedPage.scss';

export default function GetStarted(){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/board');
    }
    return(
        <section className="get-started">
            <h1 className="get-started__header">Get Started.</h1>
            <form className='get-started__form'>
                <label className='get-started__label'>Email</label>
                <input className='get-started__input' placeholder='Your Email'></input>
                <label className='get-started__label'>Name</label>
                <input className='get-started__input' placeholder='Your Name'></input>
                <label className='get-started__label'>Project Name</label>
                <input className='get-started__input' placeholder='Your Project Name'></input>
                <label className='get-started__label'>Brief Project Scope</label>
                <textarea className='get-started__textarea' placeholder='Fullstack web development project'></textarea>
                <button onSubmit={handleSubmit} className='get-started__button'>
                    Generate My Project
                </button>
            </form>
        </section>
    )
}