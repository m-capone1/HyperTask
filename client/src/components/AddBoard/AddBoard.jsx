import { useState } from 'react';
import Modal from 'react-modal';
import axios from'axios';

const AddBoard = ({toggleTriggerNav, toggleTrigger}) => {
    
    const user_id = 1;
    const initialForm = {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        user_id: user_id
    }

    let token = sessionStorage.getItem('token');

    const [formData, setFormData] = useState(initialForm);
    const [modalIsOpen, setIsOpen] = useState(false);
    
    let baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
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
    
        if (validateForm()){
            try {
                const response = await axios.post(`${baseUrl}/project`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
    
                if(response) {
                    const newProjectId = response.data.id;
                    setFormData(initialForm);
                    toggleTriggerNav();
                    toggleTrigger();
                    setIsOpen(false);
                }
            } catch(e) {
                console.log("Error adding project", e);
            }
        }
    }

    return (
        <div>
            <div>
                <button onClick={openModal} className='overlay modal-button'>+ Add a Project</button>
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
                                    <label htmlFor='start_date'>Projected Start Date</label>
                                    <input 
                                        className='modal__number-input' 
                                        name="start_date" 
                                        id="start_date" 
                                        type="date"
                                        onChange={handleInputChange}
                                        value={formData.start_date} />
                                </div>
                                <div className='modal__number'>
                                    <label htmlFor='end_date'>Projected Completion Date</label>
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
    );
}

export default AddBoard;