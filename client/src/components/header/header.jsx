import Logo from '../../assets/logo/logo-new.png'
import MoreIcon from '../../assets/icons/more.png'

export default function Header() {
    return (
        <header className='header'>
                <div className='header__main'>
                    <img className='header__img' src={Logo} alt='logo'></img>
                    <span className='header__header'>HyperTask</span>
                </div>
                <div className='header__nav-layout'>
                    <span>Home</span>
                    <span>Features</span>
                    <span>Resources</span>
                    <span>Get Started</span>
                </div>
                <img className='header__more' src={MoreIcon} alt='more-icon'></img>
        </header>
    );
}