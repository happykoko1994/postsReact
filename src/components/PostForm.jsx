import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import { useState } from 'react';


function PostForm({ create }) {
    const [post, setPost] = useState({ title: '', body: '' })

    function addNewPost() {

        const newPost = { ...post, id: Date.now() }
        create(newPost)
        setPost({ title: '', body: '' })

    }

    return (
        <div><MyInput onChange={(e) => setPost({ ...post, title: e.target.value })} value={post.title} placeholder={'Название поста'} />
            <MyInput onChange={(e) => setPost({ ...post, body: e.target.value })} value={post.body} placeholder={'Описание поста'} />
            <MyButton onClick={addNewPost} children={'Создать пост'} />
        </div>
    )
}
export default PostForm