import Logo from '../../assets/logo/logo-new.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context'; 

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    let token = sessionStorage.getItem('token');

    const handleClick = (e) => {
        e.preventDefault();

        if(!token){
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    };

    const handleLink = (e) => {
        e.preventDefault();

        if (e.target.name === "signup") {
            navigate('/signup');
        } else if (e.target.name === "login") {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className='header'>
            <div className='header__main'>
                <img className='header__img' src={Logo} alt='logo' onClick={handleClick}></img>
                <span className='header__header'>HyperTask</span>
            </div>
            <div className='header__nav-layout'>
                {isLoggedIn ? (
                    <div>
                        <button onClick={handleLogout} className='header__button'>Logout</button>
                    </div>
                ) : (
                    <div className='header__buttons'>
                        <button onClick={handleLink} name='signup' className='header__button'>Signup</button>
                        <button onClick={handleLink} name='login' className='header__button'>Login</button>
                    </div>
                )}
            </div>
        </header>
    );
}