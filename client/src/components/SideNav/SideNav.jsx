import './SideNav.scss';
import cross from '../../assets/icons/cross.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddBoard from '../../components/AddBoard/AddBoard';
import Logout from '../Logout/Logout';

export default function SideNav({ openNav, closeNav }) {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const baseUrl = 'http://localhost:8080';

    const userId = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/project/user/${userId}`);
                setBoards(response.data);
            } catch (e) {
                console.log('Error fetching data', e);
            }
        };

        fetchData();
    }, [trigger]);

    const handleNavigate = (boardId, subPath = '') => {
        const path = subPath ? `/board/${boardId}/${subPath}` : `/board/${boardId}`;
        navigate(path);
    };

    const handleDelete = async (projectId) => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
    
        if (!confirmed) return;
    
        try {
            const response = await axios.delete(`${baseUrl}/project/${projectId}`);
            if (response) {
                toggleTrigger();
            }
        } catch (e) {
            console.log("Error deleting project", e);
        }
    };

    const toggleTrigger = () => {
        setTrigger(prev => !prev);
    };

    return (
        <div className={`navbar ${openNav ? 'navbar--open' : ''}`}>
            <div onClick={closeNav} className="navbar__button">
                <img className='navbar__cross' src={cross} alt="Close Menu"/>
            </div>
            <div className='navbar__boards'>
                <h2 className='navbar__header'>Boards</h2>
                <AddBoard toggleTrigger={toggleTrigger}/>
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
                <Logout />
            </div>
        </div>
    );
}