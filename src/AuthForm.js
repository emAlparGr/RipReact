import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [backendMessage, setBackendMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка, что пароль и подтверждение пароля совпадают
        if (password !== confirmPassword) {
            setLoginError('Пароль и подтверждение пароля не совпадают');
            return;
        }

        // Ваш запрос на бэкенд для обработки данных для авторизации/регистрации
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                confirm_password: confirmPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Проверка кода ответа
                if (data.error) {
                    // Вывод ошибки
                    console.error('Ошибка:', data.error);
                    setLoginError('Ошибка');
                } else if (data.message) {
                    // Пользователь уже существует (авторизация)
                    console.log('Добро пожаловать:', data.message);
                    setLoggedIn(true);
                    setLoginError('');
                    setWelcomeMessage('Добро пожаловать!');
                    setBackendMessage('');
                } else {
                    // Новая регистрация
                    console.log('Вы зарегистрировались:', data);
                    setLoggedIn(true);
                    setLoginError('');
                    setWelcomeMessage('Вы зарегистрировались');
                    setBackendMessage('');
                }
            })
            .catch(error => {
                // Обработка ошибок при запросе на бэкенд
                console.error('Ошибка при запросе на бэкенд:', error);
                setLoggedIn(false);
                setLoginError('Ошибка при регистрации');
            });
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoginError('');
        setWelcomeMessage('');
        setBackendMessage(''); // Очищаем сообщение от бэка при выходе
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <div className="gray-border p-4"> 
                {isLoggedIn ? (
                    <div>
                        {welcomeMessage && <Alert variant="success">{welcomeMessage}</Alert>}
                        {backendMessage && <Alert variant="info">{backendMessage}</Alert>}
                        <Button variant="light" onClick={handleLogout}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-4">Регистрация</h2>
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

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;


/*
import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [backendMessage, setBackendMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка, что пароль и подтверждение пароля совпадают
        if (password !== confirmPassword) {
            setLoginError('Пароль и подтверждение пароля не совпадают');
            return;
        }

        // Ваш запрос на бэкенд для обработки данных для авторизации/регистрации
        // В этом примере просто имитируем успешную авторизацию
        // В реальном приложении замените это на ваш запрос к API

        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                confirmPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Проверяем, успешна ли авторизация
                if (data.success) {
                    setLoggedIn(true);
                    setLoginError('');
                    setWelcomeMessage('Добро пожаловать!');
                    setBackendMessage(data.message || ''); // Устанавливаем сообщение от бэка
                } else {
                    setLoggedIn(false);
                    setLoginError(data.message || 'Произошла ошибка при авторизации');
                    setBackendMessage(''); // Очищаем сообщение от бэка
                }
            })
            .catch(error => {
                // Обработка ошибок при запросе на бэкенд
                console.error('Ошибка при запросе на бэкенд:', error);
                setLoggedIn(false);
                setLoginError('Ошибка при регистрации');
            });
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoginError('');
        setWelcomeMessage('');
        setBackendMessage(''); // Очищаем сообщение от бэка при выходе
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                {isLoggedIn ? (
                    <div>
                        {welcomeMessage && <Alert variant="success">{welcomeMessage}</Alert>}
                        {backendMessage && <Alert variant="info">{backendMessage}</Alert>}
                        <Button variant="light" onClick={handleLogout}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-4">Регистрация</h2>
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

                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
*/
