import { Navigate } from "react-router-dom"
import { AuthContext } from "../context"
import { useContext, useEffect } from "react"

function LoginRoute({ children }) {
    const { isAuth } = useContext(AuthContext)

    if (!isAuth) {
        return children
    }
    return <Navigate to='/posts' />

}
export default LoginRoute