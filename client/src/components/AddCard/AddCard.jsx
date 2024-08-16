import { useState } from 'react';
import './AddCard.scss';
import Modal from 'react-modal';
import axios from'axios';
import { useParams } from 'react-router-dom';

const AddCard = ({category, toggleTrigger}) => {
    const { id } = useParams();
    const initialForm = {
        title: "",
        description: "",
        category: category,
        project_id: id,
        story_points: 0
    }

    const [aiContent, setAiContent] = useState("");
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
        setAiContent("");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function validateForm() {
        const { title, description, story_points} = formData;

        if (!title || !description || !story_points) {
            alert("This field is required.")
            return false;
        }
        return true;
    }
    
    const handleAddCard = async(e) => {
        e.preventDefault();
        console.log(formData);

        // formData.story_points = formData.story_points.toString();

        if (validateForm()){
            try {
                const response = await axios.post(`${baseUrl}/card/cards/${id}`, formData);
                
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

    const validateAi =() => {
        const { title } = formData;

        if (!title) {
            alert("This field is required.")
            return false;
        }
        return true;
    }

    const handleGenerate = async(e) => {
        e.preventDefault();

        const { title } = formData;

        if(validateAi()) {
            const prompt = `Write 2-3 sentence kanban card task description based on the following title: ${title}. Enusre that only the content is provided, no headers, special characters, or seperations.`;

            try { 
                const response = await axios.post(`${baseUrl}/openai/generate`,
                    {prompt}
                );

                let generatedContent = response.data;
                setAiContent(generatedContent);
                setFormData(prevState => ({
                    ...prevState,
                    description: generatedContent
                }));

            }catch(e){
                console.log("Error generating card content:", e)
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
                { isHovered && <button onClick={openModal} className='overlay modal-button'>+ Add a Card</button>}
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
                                    <label htmlFor='title' className='modal__title'>Title</label>
                                    <div className='modal__title-right'>
                                        <div className='modal__category'>Category: {category}</div>
                                    </div>
                                </div>
                                <input 
                                    id='title' 
                                    name='title' 
                                    className='modal__input'
                                    onChange={handleInputChange}
                                    placeholder="Enter the title of your card here...">
                                </input>
                            </form>
                        </div>
                        <div className='modal'>
                            <form className='modal__form'>
                                <div className='modal__description-row'>
                                    <label htmlFor='description' className='modal__description'>Description</label>
                                    <button className='modal__button' onClick={handleGenerate}>AI Generate</button>         
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
                                    <label htmlFor='story_points'>Points</label>
                                    <input 
                                        className='modal__number-input' 
                                        id="story_points"
                                        name="story_points" 
                                        type="number"
                                        onChange={handleInputChange}
                                        value={formData.story_points} 
                                        min={0} />
                                </div>
                            </form> 
                        </div>
                        <div className='modal__buttons'>
                            <button onClick={handleAddCard} className='modal__button'>+ Add Card</button>
                            <button onClick={closeModal} className='modal__button'>Close</button>
                        </div>
                    </div>
                </Modal>
                </div>
            </div>
        </div>
    );
}

export default AddCard;