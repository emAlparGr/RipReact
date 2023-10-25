import { Button } from 'react-bootstrap';
import React from 'react';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'; // Замените 'ModalComponents' на путь к вашим модальным окнам
import ModalA from './ModalA';

function Quotes() {

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowA, setModalShowA] = React.useState(false);
    const [ListQ, setListQ, changeListQ] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8000/api/quotes/qget")
            .then(respone => { return respone.json() })
            .then(responeData => { setListQ(responeData.quotes) })

    }, [])

    const handleSave = Quote => {
        let fd = new FormData();
        fd.append('author', Quote);
        fetch("http://localhost:8000/api/quotes/qpost", {
            method: "POST",
            body: fd,
        })
            .then(respone => { return respone.json() })
            .then(responeData => {
                let arr = Array.from(ListQ);
                arr.push(responeData.author);
                setListQ(arr);
                setModalShowA(false);
            })
    }

    const handlePut = Quote => {
        fetch("http://localhost:8000/api/quotes/qput/" + Quote, {
            method: "PUT",
            body: JSON.stringify({ author: Quote }),
        })
            .then(respone => { return respone.json() })
            .then(responeData => {
                let arr = Array.from(ListQ);
                // arr.push(responeData.author);
                changeListQ(arr);
                setModalShow(false);
            })
    }

    const handleDEL = Quote => {
        fetch("http://localhost:8000/api/quotes/" + Quote, {
            method: "DELETE",
        })
            .then(respone => { return respone.json() })
            .then(responeData => {
                let arr = Array.from(ListQ);
                let deleteId = arr.findIndex(item => item.id === Quote)
                arr.splice(deleteId, 1);
                setListQ(arr);
            })
    }

    return (
        <div className='left-container'>
            <div className="ad"> <Button variant="outline-primary" onClick={() => setModalShowA(true)}>Добавить</Button></div>
            {ListQ.map((q) => (
                <span className="quot" key={q.id}>
                    <li>{q.author}</li>
                    <Button variant="outline-secondary" onClick={() => setModalShow(true)}>Редактировать</Button>
                    <Button variant="danger" onClick={() => handleDEL(q.id)}>Удалить</Button>
                </span>
            ))}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                change={handlePut}
            />
            <ModalA
                show={modalShowA}
                onHide={() => setModalShowA(false)}
                Save={handleSave}
            />
        </div>
    )
}
export default Quotes;
