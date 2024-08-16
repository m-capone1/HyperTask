import './SideNav.scss';
import cross from '../../assets/icons/cross.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddBoard from '../../components/AddBoard/AddBoard'

export default function SideNav({ openNav, closeNav }) {

    let navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const baseUrl='http://localhost:8080';

    //update this friday
    let userId = 1;

    useEffect(()=> {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${baseUrl}/project/user/${userId}`);
                
                setBoards(response.data);

            }catch(e){
                console.log('Error fetching data', e)
            }
        }
        fetchData();

    }, [])

    console.log(boards);
    
    const handleNavigate = (boardId, subPath = '') => {
        if (subPath) {
            navigate(`/board/${boardId}/${subPath}`);
        } else {
            navigate(`/board/${boardId}`);
        }
    };

    return (
        <div className={`navbar ${openNav ? 'navbar--open' : ''}`}>
            <button onClick={closeNav} className="navbar__button">
                <img className='navbar__cross' src={cross}></img>
            </button>
            <div className='navbar__boards'>
                <h2 className='navbar__header'>
                    Boards
                </h2>
                <AddBoard />
                {boards.map((board) => (
                    <div key={board.id}>
                        <h3 onClick={() => handleNavigate(board.id)} className='navbar__body'>{board.name}</h3>
                        <div onClick={() => handleNavigate(board.id, "project-details")} className='navbar__body' name="project-details">Project Details</div>
                    </div>
                ))}
            </div>
            <section>
            </section>
        </div>
    );
}