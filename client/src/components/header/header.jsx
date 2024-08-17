import Logo from '../../assets/logo/logo-new.png'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    
    const navigate = useNavigate();
    const handleClick = (e) =>{
        e.preventDefault();
        navigate('/')
    }

    const handleLink = (e) =>{
        e.preventDefault();
        
        if(e.target.name === "signup") {
            navigate('/signup');
        }
        if(e.target.name === "login") {
            navigate('/login');
        }
    }

    return (
        <header className='header'>
                <div className='header__main'>
                    <img className='header__img' src={Logo} alt='logo' onClick={handleClick}></img>
                    <span className='header__header'>HyperTask</span>
                </div>
                <div className='header__nav-layout'>
                    <button onClick={handleLink} name='signup'>Signup</button>
                    <button onClick={handleLink} name='login'>Login</button>
                </div>
        </header>
    );
}