import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          sessionStorage.removeItem('token');
    
          navigate('/login');
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}