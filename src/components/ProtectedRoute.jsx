import { Navigate } from "react-router-dom"
import { AuthContext } from "../context"
import { useContext } from "react"

function ProtectectedRoute({ children }) {
    const { isAuth } = useContext(AuthContext)

    if (!isAuth) {
        return <Navigate to='/login' />
    }
    return children

}
export default ProtectectedRoute