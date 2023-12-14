import { Link } from 'react-router-dom';
import { CurrentUser } from './UserConnector'

function NavBar() {
  return (
    <div className='nav-bar'>
      <Link to="/" className="btn btn-outline-primary">Цитаты</Link>
      <Link to="/chat" className="btn btn-outline-primary">Чат</Link>
      {!CurrentUser && <Link to="/login" className="btn btn-outline-primary">Вход</Link>}
      {!CurrentUser && <Link to="/signup" className="btn btn-outline-primary">Регистрация</Link>}
      {CurrentUser && <span>Привет {CurrentUser.name}</span>}
    </div>
  )
}

export default NavBar;
