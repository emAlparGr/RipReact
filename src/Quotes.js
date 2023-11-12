import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal'; 
import ModalA from './ModalA';
import { Link } from 'react-router-dom';

function Quotes() {

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowA, setModalShowA] = React.useState(false);
    const [ListQ, setListQ] = React.useState([]);

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

    const handlePut = (Quote, changeid) => {
        fetch("http://localhost:8000/api/quotes/qput/" + changeid, {
            method: "PUT",
            body: JSON.stringify({ author: Quote }),
        })
            .then(respone => { return respone.json() })
            .then(responeData => {
                let arr = Array.from(ListQ);
                let deleteId = arr.findIndex(item => item.id === changeid)
                arr.splice(deleteId, 1);
                arr.push(responeData.author);
                setListQ(arr);
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

    let idd = null;

    let changeid = id => {
        global.idd = id;
    }

    return (
        <div className='left-container'>
            <div className="ad"> <Button variant="outline-primary" onClick={() => setModalShowA(true)}>Добавить</Button>
                <Link to="/chat" className="btn btn-outline-primary">Чат</Link>
            </div>
            
            {ListQ.map((q) => (
                <span className="quot" key={q.id}>
                    <li>{q.author}</li>
                    <Button variant="outline-secondary" onClick={() => { changeid(q.id); setModalShow(true)}}>Редактировать</Button>
                    <Button variant="danger" onClick={() => handleDEL(q.id)}>Удалить</Button>
                </span>
            ))}
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                change={handlePut}
                changeid={global.idd}
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
