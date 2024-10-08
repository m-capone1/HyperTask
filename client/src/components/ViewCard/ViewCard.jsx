import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ViewCard.scss';
import { useParams } from 'react-router-dom';

const ViewCard = ({ isOpen, card, onClose, toggleTrigger }) => {

    const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();
    let token = sessionStorage.getItem('token');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        story_points: 0
    });

    useEffect(() => {
        if (card) {
            setFormData({
                title: card.title || '',
                description: card.description || '',
                category: card.category || '',
                story_points: card.story_points || 0
            });
        }
    }, [card]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveCard = async (e) => {
        e.preventDefault();
        let cardId = card.id;

        let updateCard = {
            ...formData,
            id: `${cardId}`,
            project_id: id
        }

        try {
            await axios.put(`${baseUrl}/card/${cardId}`, updateCard, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

        }catch(e){
            console.log("Error saving card", e);
        }
    
        onClose();
        toggleTrigger();
    };

    const handleDeleteCard = async(e) => {
        e.preventDefault();
        let cardId = card.id;
        
        try {
            await axios.delete(`${baseUrl}/card/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

        }catch(e){
            console.log("Error saving card", e);
        }

        onClose();
        toggleTrigger();

    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className='modal-container'
            ariaHideApp={false}
        >
            <div className='modal'>
                <div className='modal'>
                    <form className='modal__form'>
                        <div className='modal__title-container'>
                            <label htmlFor='title' className='modal__title'>Title</label>
                            <div className='modal__title-right'>
                                <div className='modal__category'>{formData.category}</div>
                            </div>
                        </div>
                        <input 
                            id='title' 
                            name='title' 
                            className='modal__input'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter the title of your card here..."
                        />
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
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter your description here..."
                        />
                        <div className='modal__number'>
                            <label htmlFor='points'>Points</label>
                            <input
                                name='story_points'
                                onChange={handleInputChange} 
                                className='modal__number-input' 
                                id="points" 
                                type="number" 
                                min={0} 
                                value={formData.story_points} />
                        </div>
                    </form> 
                </div>
                <div className='modal__buttons'>
                    <button onClick={handleSaveCard} className='modal__button'>Save</button>
                    <button onClick={onClose} className='modal__button'>Close</button>
                    <button onClick={handleDeleteCard} className='modal__button delete'>Delete Card</button>
                </div>
            </div>
        </Modal>
    );
}

export default ViewCard;