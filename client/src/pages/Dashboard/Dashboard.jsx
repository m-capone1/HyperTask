import SideNav from "../../components/SideNav/SideNav";
import { useState} from "react";
import arrow from '../../assets/icons/right-arrow.png'
import logo from '../../assets/logo/logo-new.png';
import './Dashboard.scss';

export default function Dashboard() {
    const [navBar, setNavBar] = useState(false);

    const closeNav = () => {
        setNavBar(prev => !prev);
    }

    return(
        <section className="dashboard-page">
            <section>
                <img 
                    src={arrow} 
                    onClick={() => setNavBar(!navBar)}
                    className={`nav__arrow ${navBar ? 'nav__arrow--active' : ''} dashboard__img`} 
                    alt="Open Navbar" 
                />
                <SideNav openNav={navBar} closeNav={closeNav} />
            </section>
            <section className="dashboard">
                <div className="dashboard__header">
                    Welcome back! 
                </div>
                <img className="dashboard__logo" src={logo} alt="logo"></img>
            </section>
            </section>
    );
}