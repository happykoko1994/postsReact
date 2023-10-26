import { useContext } from "react"
import MyButton from "../components/UI/button/MyButton"
import MyInput from "../components/UI/input/MyInput"
import { AuthContext } from "../context"
import { Navigate } from "react-router-dom"

function Login() {
    const { isAuth, setIsAuth } = useContext(AuthContext)

    function submit() {
        
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    {
        if (isAuth) { return <Navigate to='/posts' /> }
        return (<div>
            <h1>Страница для логина</h1>
            
                <MyInput type="text" placeholder="Введите логин" />
                <MyInput type="password" placeholder="Введите пароль" />
                <MyButton onClick={submit}>Войти</MyButton>
            
        </div>)

    }
}
export default Login