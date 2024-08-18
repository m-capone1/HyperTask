import './HomePageCard.scss';

export default function HomePageCard({cardNumber, title, description, scene}) {
    return (
        <section className="get-started">
            <div className='get-started__number'>
                {cardNumber}
            </div>
            <h3 className='get-started__title'>
                {title}
            </h3>
            <div className='get-started__description'>
                {description}
            </div>
            <img className='get-started__img' src={scene}></img>
        </section>
    )
}