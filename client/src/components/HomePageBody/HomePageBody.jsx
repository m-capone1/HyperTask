import HomePageCard from "../HomePageCard/HomePageCard"
import './HomePageBody.scss';

export default function HomePageBody(){
    const detailsOne ="Enter your project name, description, and timeline.";
    const detailsTwo ="Do you prefer kanban or gantt charts? ";
    const detailsThree ="Sit back and watch HyperTask manage your projects automatically.";

    const sceneOne = "https://prod.spline.design/Vsgz8ajUVqZCW5e0/scene.splinecode"
    const sceneTwo = "https://prod.spline.design/yRO-1XLVqNYBpyov/scene.splinecode";
    const sceneThree = "https://prod.spline.design/uyGSRsfGm4D7EqNe/scene.splinecode";
    return (
        <section className="home-page-body">
            <h2 className="home-page-body__header">Get Started in 3 Simple Steps:</h2>
            <section>
                <HomePageCard cardNumber={"01"} title = {"Enter Your Details"} description ={detailsOne} scene={sceneOne}/>
                <HomePageCard cardNumber={"02"} title = {"Choose Your Layout"} description = {detailsTwo} scene={sceneTwo}/>
                <HomePageCard cardNumber={"03"} title = {"Let HyperTask Manage For You."} description={detailsThree} scene={sceneThree}/>
            </section>
            <h2 className="home-page-body__subheader">Tools to Help your Projects Succeed.</h2>
            <h2 className="home-page-body__subheader">We manage your tasks so you don't have to. Let's get to work.</h2>
        </section>
    )
}