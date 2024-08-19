import './SideNav.scss';
import cross from '../../assets/icons/cross.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddBoard from '../../components/AddBoard/AddBoard';

export default function SideNav({ openNav, closeNav, toggleTrigger }) {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [triggerNav, setTriggerNav] = useState(false);
    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                console.log('User ID is not available');
                return;
            }
            try {
                const response = await axios.get(`${baseUrl}/project/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (response.status === 200 && response.data) {
                    setBoards(response.data);
                    if (triggerNav) {
                        const firstAddedProject = response.data[0];
                        handleNavigate(firstAddedProject.id);
                    }
                }
    
            } catch (e) {
                if (e.response && e.response.status === 404) {
                    console.log('No projects found for this user.');
                    setBoards([]);
                } else {
                    console.log('Error fetching data', e);
                }
            }
        };
    
        fetchData();
    }, [triggerNav, userId, token]);

    const handleNavigate = (boardId, subPath = '') => {
        const path = subPath ? `/board/${boardId}/${subPath}` : `/board/${boardId}`;
        navigate(path);
        window.location.reload();
    };

    const handleDelete = async (projectId) => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
    
        if (!confirmed) return;
    
        try {
            const response = await axios.delete(`${baseUrl}/project/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response) {
                toggleTriggerNav();
            }
        } catch (e) {
            console.log("Error deleting project", e);
        }
    };

    const toggleTriggerNav = () => {
        setTriggerNav(prev => !prev);
    };

    const navigteToDashboard = () => {
        navigate('/dashboard');
    }

    return (
    <div className={`navbar ${openNav ? 'navbar--open' : ''}`}>
        <div onClick={closeNav} className="navbar__button">
            <img className='navbar__cross' src={cross} alt="Close Menu"/>
        </div>
        <div className='navbar__boards'>
            <h2 className='navbar__header'>Boards</h2>
            <div onClick={navigteToDashboard} className='navbar__dashboard'>DashBoard</div>
            <AddBoard toggleTriggerNav={toggleTriggerNav} toggleTrigger={toggleTrigger}/>
            {boards.map((board) => (
                <div key={board.id}>
                    <h3 onClick={() => handleNavigate(board.id)} className='navbar__body navbar__name'>{board.name}</h3>
                    <div onClick={() => handleNavigate(board.id, "project-details")} className='navbar__body' name="project-details">Project Details</div>
                    <div onClick={() => handleDelete(board.id)} className='navbar__body navbar__delete'>Delete Project</div>
                    <hr className='navbar__hr' />
                </div>
            ))}
        </div>
        <div>
        </div>
    </div>
    );
}