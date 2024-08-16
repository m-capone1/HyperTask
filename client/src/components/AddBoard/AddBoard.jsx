import { useState } from 'react';
// import './AddCard.scss';
import Modal from 'react-modal';
import axios from'axios';
import { useParams } from 'react-router-dom';

const AddBoard = ({toggleTrigger}) => {
    const { id } = useParams();
    const user_id = 1;
    const initialForm = {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        user_id: user_id
    }

    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    let baseUrl = 'http://localhost:8080';

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setIsHovered(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            user_id: user_id
        }));
    };

    function validateForm() {
        const { name, description, start_date, end_date} = formData;

        if (!name || !description || !start_date || !end_date) {
            alert("This field is required.")
            return false;
        }
        return true;
    }
    
    const handleAddProject = async(e) => {
        e.preventDefault();

        console.log(formData);

        if (validateForm()){
            try {
                const response = await axios.post(`${baseUrl}/project`, formData);
                console.log(response.data);
                if(response) {
                    setFormData(initialForm);
                    toggleTrigger();
                    setIsOpen(false);
                    setIsHovered(false);
                }
            } catch(e) {
                console.log("Error adding card", e);
            }
        }
    }

    return (
        <div>
            <div
                className="container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
            <div>
                { isHovered && <button onClick={openModal} className='overlay modal-button'>+ Add a Project</button>}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className='modal-container'
                    ariaHideApp={false}
                >
                    <div className='modal'>                      
                        <div className='modal'>
                            <form className='modal__form'>
                                <div className='modal__title-container'>
                                    <label htmlFor='name' className='modal__title'>Project</label>
                                </div>
                                <input 
                                    id='name' 
                                    name='name' 
                                    className='modal__input'
                                    onChange={handleInputChange}
                                    placeholder="Enter the title of your project here...">
                                </input>
                            </form>
                        </div>
                        <div className='modal'>
                            <form className='modal__form'>
                                <div className='modal__description-row'>
                                    <label htmlFor='description' className='modal__description'>Description</label>       
                                </div>
                                <textarea 
                                    type="text" 
                                    name='description' 
                                    id="description"
                                    className='modal__textarea'
                                    onChange={handleInputChange}
                                    value={formData.description}
                                    placeholder="Enter your description here...">
                                </textarea>
                                <div className='modal__number'>
                                    <label htmlFor='points'>Projected Start Date</label>
                                    <input 
                                        className='modal__number-input' 
                                        name="start_date" 
                                        id="start_date" 
                                        type="date"
                                        onChange={handleInputChange}
                                        value={formData.start_date} />
                                </div>
                                <div className='modal__number'>
                                    <label htmlFor='points'>Projected Completion Date</label>
                                    <input 
                                        className='modal__number-input' 
                                        name="end_date" 
                                        id="end_date" 
                                        type="date"
                                        onChange={handleInputChange}
                                        value={formData.end_date} />
                                </div>
                            </form> 
                        </div>
                        <div className='modal__buttons'>
                            <button onClick={handleAddProject} className='modal__button'>+ Add Project</button>
                            <button onClick={closeModal} className='modal__button'>Close</button>
                        </div>
                    </div>
                </Modal>
                </div>
            </div>
        </div>
    );
}

export default AddBoard;