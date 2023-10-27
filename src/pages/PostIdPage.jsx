import { useNavigate, useParams } from "react-router-dom"
import { useFetching } from "../hooks/useFatching"
import { useEffect, useState } from "react"
import PostService from "../API/PostService"
import Loader from "../components/UI/loader/Loader"
import '../styles/App.css'
import { useContext } from "react"
import { AuthContext } from "../context"

function PostIdPage() {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const router = useNavigate()
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsById(params.id)
        setComments(response.data)
    })
    const { page, setPage } = useContext(AuthContext)

    useEffect(() => {
        fetchPostById()
        fetchComments()
        setPage(localStorage.getItem('page'))
    }, [])

    return (
        <div className="comm">
            <h1 className="post_title">Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div className="post_body">{post.id}. {post.title}</div>
            }
            <button
                className="post__button"
                onClick={() => router(`/posts?page=${page}`)}

            >Назад</button>
            <h3 className="comm_title">Комментарии</h3>
            {isComLoading
                ? <Loader />
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{ marginTop: 15 }}>
                            <h5 className="comm_email">{comm.email}</h5>
                            <div className="comm_body">{comm.body}</div>
                            <hr />

                        </div>
                    )}

                </div>
            }
        </div>
    )
}
export default PostIdPage