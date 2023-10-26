import { Route, Routes } from "react-router-dom"
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import ProtectectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import LoginRoute from "./LoginRoute";
import Loader from "./UI/loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../context";



function AppRouter() {
    const { isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <Loader />
    }
    return (
        <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/' element={<LoginRoute><Login /></LoginRoute>} />
            <Route path='/login' element={<LoginRoute><Login /></LoginRoute>} />
            <Route exact path='/posts/' element={<ProtectectedRoute><Posts /></ProtectectedRoute>} />
            <Route path='/posts/:id' element={<ProtectectedRoute><PostIdPage /></ProtectectedRoute>} />
            <Route path='/error' element={<Error />} />
        </Routes>
    )
}
export default AppRouter