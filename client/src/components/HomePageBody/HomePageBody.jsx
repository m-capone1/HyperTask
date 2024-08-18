import HomePageCard from "../HomePageCard/HomePageCard";
import './HomePageBody.scss';
import rocket from '../../assets/images/rocket.png';
import cube from '../../assets/images/clipboard.png';
import clipboard from '../../assets/images/cube.png';

export default function HomePageBody(){
    const detailsOne ="Enter your project name, description, and timeline.";
    const detailsTwo ="Add tasks to your board. ";
    const detailsThree ="Sit back and watch HyperTask manage your projects automatically.";

    return (
        <section className="home-page-body">
            <h2 className="home-page-body__header">Get Started in 3 Simple Steps:</h2>
            <section className="home-page-body__cards">
                <HomePageCard cardNumber={"01"} title = {"Enter Your Details"} description ={detailsOne} scene={clipboard}/>
                <HomePageCard cardNumber={"02"} title = {"Add Tasks"} description = {detailsTwo} scene={cube}/>
                <HomePageCard cardNumber={"03"} title = {"Let HyperTask Manage For You."} description={detailsThree} scene={rocket}/>
            </section>
            <h2 className="home-page-body__subheader">We manage your tasks so you don't have to. Let's get to work.</h2>
        </section>
    )
}