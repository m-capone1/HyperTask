import { useState } from 'react';
import './AddCard.scss';
import Modal from 'react-modal';

//Modal.setAppElement('AddCard');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const AddCard = () => {
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
    }

    const handleClick = () =>{ 

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
                    <div>                      
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add a Card</h2>
                        <div>
                            
                        </div>
                        <button onClick={closeModal}>close</button>
                    </div>
                </Modal>
                </div>
            </div>
        </div>
    );
}

export default AddCard;