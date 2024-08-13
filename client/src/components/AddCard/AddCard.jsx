import { useState } from 'react';
import './AddCard.scss';
import Modal from 'react-modal';

//Modal.setAppElement('AddCard');

const customStyles = {
    content: {
    //   top: '10%',
      left: '15%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-10%, -10%)',
        width: '70%',
        backgroundColor: 'blue',
        borderRadius: '1rem'
    },
  };

const AddCard = ({category}) => {
    const [isHovered, setIsHovered] = useState(false);

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
        setIsHovered(false);
    }
    
    function handleAddCard() {

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
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <div className='modal-container'>                      
                        <div className='modal'>
                            <form className='modal__form'>
                                <div className='modal__title-container'>
                                    <label htmlFor='title' className='modal__title'>Title</label>
                                    <div className='modal__category'>Category: {category}</div>
                                </div>
                                <input id='title' name='title' className='modal__input'></input>
                            </form>
                        </div>
                        <div className='modal'>
                            <form className='modal__form'>
                                <label htmlFor='description' className='modal__description'>Description</label>
                                <textarea type="text" name='description' id="description" className='modal__textarea'></textarea>
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