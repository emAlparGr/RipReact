import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [backendMessage, setBackendMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ваш запрос на бэкенд для обработки данных для авторизации/регистрации
        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Проверка кода ответа
                if (data.error) {
                    // Вывод ошибки
                    setLoginError('Ошибка');
                } else if (data.success) {
                    // Пользователь уже существует (авторизация)
                    setLoggedIn(true);
                    setLoginError('');
                    setWelcomeMessage('Добро пожаловать!');
                    setBackendMessage('');
                }
            })
            .catch(error => {
                // Обработка ошибок при запросе на бэкенд
                setLoggedIn(false);
                setLoginError('Ошибка при регистрации');
            });
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setEmail('');
        setPassword('');
        setLoginError('');
        setWelcomeMessage('');
        setBackendMessage(''); // Очищаем сообщение от бэка при выходе
        window.location.reload();
        navigate('/quotes')
    };

    return (
        <div className="left-container__auth mt-5">
            <div className="col-md-6">
                <div className="gray-border p-4">
                    {isLoggedIn ? (
                        // TODO redirect
                        <div>
                            {welcomeMessage && <Alert variant="success">{welcomeMessage}</Alert>}
                            {backendMessage && <Alert variant="info">{backendMessage}</Alert>}
                            <Button variant="light" onClick={handleLogout}>
                                <span aria-hidden="true">OK</span>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="mb-4">Вход</h2>
                            {loginError && <Alert variant="danger">{loginError}</Alert>}
                            {backendMessage && <Alert variant="info">{backendMessage}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Войти</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
