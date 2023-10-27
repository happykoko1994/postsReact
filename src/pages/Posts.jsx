import '../styles/App.css'
import { getPageCount } from '../utils/pages'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter'
import { useState, useEffect } from 'react';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFatching';
import Pagination from '../components/UI/pagination/Pagination';
import { useLocation, useSearchParams } from 'react-router-dom';

function Posts() {
    const location = useLocation()
    const setParams = new URLSearchParams(location.search)
    const search = setParams.get('page')
    const [pageParams, setPageParams] = useSearchParams('')
    const [modal, setModal] = useState(false)
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [posts, setPosts] = useState([])
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(search)
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })



    useEffect(() => {
        fetchPosts()
        setPageParams({ page: page })
        // setPage(localStorage.getItem('page'))

    }, [page])

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const changePage = (page) => {
        setPage(page)
        localStorage.setItem('page', page)

    }


    return (
        <div className="App">
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {postError &&
                <h1>Произошла ошибка {postError}</h1>}
            {isPostLoading
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список постов'} />

            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages} />
        </div>
    );
}

export default Posts;