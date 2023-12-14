import React from 'react';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import ModalA from './ModalA';
import { CurrentUser, Token } from './UserConnector'

function Quotes() {

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowA, setModalShowA] = React.useState(false);
    const [ListQ, setListQ] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8000/api/quotes/qget", {
            method: 'get',
        })
            .then(response => { return response.json() })
            .then(responseData => { setListQ(responseData.quotes) })
    }, [])

    const handleSave = Quote => {
        let fd = new FormData();
        fd.append('author', Quote);
        fetch("http://localhost:8000/api/quotes/qpost", {
            method: "POST",
            headers: {
                'LAB-TOKEN': Token
            },
            body: fd,
        })
            .then(response => { return response.json() })
            .then(responseData => {
                let arr = Array.from(ListQ);
                arr.push(responseData.author);
                setListQ(arr);
                setModalShowA(false);
            })
    }

    const handlePut = (Quote, changeid) => {
        fetch("http://localhost:8000/api/quotes/qput/" + changeid, {
            method: "PUT",
            body: JSON.stringify({ author: Quote }),
            headers: {
                'LAB-TOKEN': Token
            }
        })
            .then(response => { return response.json() })
            .then(responseData => {
                let arr = Array.from(ListQ);
                let deleteId = arr.findIndex(item => item.id === changeid)
                arr.splice(deleteId, 1);
                arr.push(responseData.author);
                setListQ(arr);
                setModalShow(false);
            })
    }

    const handleDEL = Quote => {
        fetch("http://localhost:8000/api/quotes/" + Quote, {
            method: "DELETE",
            headers: {
                'LAB-TOKEN': Token
            }
        })
            .then(response => { return response.json() })
            .then(responseData => {
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
            <h2 className='centered'>Цитаты</h2>

            <div className='container__quotes'>
                {ListQ.map((q) => (
                    <div className="container__quotes__one" key={q.id}>
                        <span className="quot">
                            <li>{q.author}</li>
                            {CurrentUser && <div className='quot__buttons'>
                                <Button variant="outline-secondary" onClick={() => { changeid(q.id); setModalShow(true) }}>Редактировать</Button>
                                <Button variant="danger" onClick={() => handleDEL(q.id)}>Удалить</Button>
                            </div>}
                        </span>
                        <hr />
                    </div>
                ))}
            </div>
            {CurrentUser && <div className="ad">
                <Button variant="outline-primary" onClick={() => setModalShowA(true)}>Добавить</Button>
            </div>}
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
