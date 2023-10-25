import React from 'react';
import { Modal, Button } from 'react-bootstrap';


export default function MyVerticallyCenteredModal(props) {
    const [ChangeQ, setChangeQ] = React.useState("");
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
                    <input className='inq' type='text' onChange={e => setChangeQ(e.target.value)}></input>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={() => {
                    console.log(props)
                    props.change(ChangeQ);
                }}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    );
}
