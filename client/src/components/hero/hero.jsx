import Spline from '@splinetool/react-spline';

export default function Hero() {
    return (
    <section className="hero">
        <div className='hero__spline-container'>
            <Spline 
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
            />
            <button className="hero__button">Get Started</button>
        </div>
    </section>
    );
}