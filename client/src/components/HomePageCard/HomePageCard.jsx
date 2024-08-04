import './HomePageCard.scss';
import Spline from '@splinetool/react-spline';

export default function HomePageCard({cardNumber, title, description, scene}) {
    return (
        <section className="container">
            <div className='container__number'>
                {cardNumber}
            </div>
            <h3 className='container__title'>
                {title}
            </h3>
            <div className='container__description'>
                {description}
            </div>
            <Spline 
                scene={scene}
                className=''
            />
        </section>
    )
}