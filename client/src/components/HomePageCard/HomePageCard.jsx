import './HomePageCard.scss';

export default function HomePageCard({cardNumber, title, description}) {
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
            <img></img>
        </section>
    )
}