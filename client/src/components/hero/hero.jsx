import Spline from '@splinetool/react-spline';
import { useNavigate

 } from 'react-router-dom';
export default function Hero() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/signup");
    }

    return (
    <section className="hero">
        <div className='hero__spline-container'>
            {/* <Spline 
                scene="https://prod.spline.design/VkPjpx10KGDwYHeP/scene.splinecode"
                className='hero__spline-canvas'
            />
            <Spline 
                scene="https://prod.spline.design/aVTjrKz6Pv0S3NbJ/scene.splinecode"
                className='hero__spline-canvas-tablet'
            /> 
            <Spline 
                scene="https://prod.spline.design/aVTjrKz6Pv0S3NbJ/scene.splinecode"
                className='hero__spline-canvas-desktop'
            />  */}
            <button onClick={handleClick} className="hero__button">Get Started</button>
        </div>
    </section>
    );
}