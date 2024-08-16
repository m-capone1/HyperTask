import Logo from '../../assets/logo/logo-new.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const handleClick = (e) =>{
        e.preventDefault();
        navigate('/')
    }
    return (
        <header className='header'>
                <div className='header__main'>
                    <img className='header__img' src={Logo} alt='logo' onClick={handleClick}></img>
                    <span className='header__header'>HyperTask</span>
                </div>
                <div className='header__nav-layout'>
                    <span>Home</span>
                    <span>Features</span>
                    <span>Resources</span>
                    <span>Get Started</span>
                </div>
        </header>
    );
}