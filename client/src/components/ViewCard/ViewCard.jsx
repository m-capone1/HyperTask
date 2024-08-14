import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './ViewCard.scss';
import { useParams } from 'react-router-dom';

const ViewCard = ({ isOpen, card, onClose, toggleTrigger }) => {
    const baseUrl = 'http://localhost:8080';
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });
    const { id } = useParams();

    useEffect(() => {
        if (card) {
            setFormData({
                title: card.title || '',
                description: card.description || '',
                category: card.category || ''
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

        console.log(updateCard);

        try {
            const response = await axios.put(`${baseUrl}/card/${cardId}`, updateCard)

        }catch(e){
            console.log("Error saving card", e);
        }
    
        onClose();
        toggleTrigger();
    };

    const handleDeleteCard = async(e) => {

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