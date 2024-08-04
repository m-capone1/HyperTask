import HomePageCard from "../HomePageCard/HomePageCard"
import './HomePageBody.scss';

export default function HomePageBody(){
    const detailsOne ="Enter your project name, disicpline, and timeline, ";
    const detailsTwo ="";
    const detailsThree ="";

    return (
        <section className="home-page-body">
            <h2 className="home-page-body__header">Get Started in 3 Simple Steps:</h2>
            <section>
                <HomePageCard cardNumber={"01"} title = {"Enter Your Details"} description ={detailsOne}/>
                <HomePageCard cardNumber={"02"} title = {"Choose Your Layout"} description = {detailsTwo}/>
                <HomePageCard cardNumber={"03"} title = {"Let HyperTask Manage For You."} description={detailsThree}/>
            </section>
            <h2>We manage your tasks so you don't have to.</h2>
        </section>
    )
}