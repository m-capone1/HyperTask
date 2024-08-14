import React from 'react';
import Modal from 'react-modal';
import './ViewCard.scss';

const ViewCard = ({ isOpen, card, onClose }) => {

    console.log(card);

    const handleInputChange = (e) => {
        // your input change logic...
    };

    const handleAddCard = async (e) => {
        // your add card logic...
    };

    // console.log(card.target.innerText);
    // console.log(card);

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
                                <div className='modal__category'>{card.category}</div>
                            </div>
                        </div>
                        <input 
                            id='title' 
                            name='title' 
                            className='modal__input'
                            value={card.title}
                            onChange={handleInputChange}
                            placeholder="Enter the title of your card here..."
                        />
                    </form>
                </div>
                <div className='modal'>
                    <form className='modal__form'>
                        <div className='modal__description-row'>
                            <label htmlFor='description' className='modal__description'>Description</label>
                            <button className='modal__button'>AI Generate</button>         
                        </div>
                        <textarea 
                            type="text" 
                            name='description' 
                            id="description" 
                            className='modal__textarea'
                            value={card.description}
                            onChange={handleInputChange}
                            placeholder="Enter your description here..."
                        />
                    </form> 
                </div>
                <div className='modal__buttons'>
                    <button onClick={handleAddCard} className='modal__button'>+ Add Card</button>
                    <button onClick={onClose} className='modal__button'>Close</button>
                </div>
            </div>
        </Modal>
    );
}

export default ViewCard;