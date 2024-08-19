import Spline from '@splinetool/react-spline';
import { useNavigate} from 'react-router-dom';
import './hero.scss';

export default function Hero() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/signup");
    }

    return (
    <section className="hero">
        <div className='hero__spline-container'>
            <Spline 
                scene="https://prod.spline.design/aVTjrKz6Pv0S3NbJ/scene.splinecode"
                className='hero__spline-canvas-desktop'
            /> 
            <section className='hero__header'>
                <div className='hero__main-text'>Project Management, Simplified</div>
                <div className='hero__subheader'>Streamline your projects with effortless management.</div>
            </section>
            <button onClick={handleClick} className="hero__button">Get Started</button>
        </div>
    </section>
    );
}