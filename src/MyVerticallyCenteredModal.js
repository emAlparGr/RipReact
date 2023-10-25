import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export default function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Режим редактирования
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Введите измененную цитату</h4>
                <p>
                    <input className='inq' type='text'></input>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' >Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
}
