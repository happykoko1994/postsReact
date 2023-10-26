import { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../../context'
import MyButton from '../button/MyButton'

function Navbar() {
    const { isAuth, setIsAuth, isLoading } = useContext(AuthContext)
    function logout() {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        isAuth
            ? <div className="navbar">

                <div className="navbar__links">
                    <MyButton><Link to="/about">О сайте</Link></MyButton>
                    <MyButton><Link to="/posts">Посты</Link></MyButton>
                </div>
                <MyButton onClick={logout}>Выйти</MyButton>
            </div>
            : <div className="navbar">
                <div className="navbar__links">
                    <MyButton><Link to="/about">О сайте</Link></MyButton>
                    <MyButton><Link to="/login">Логин</Link></MyButton>
                </div>
            </div>

    )
}
export default Navbar