import {useState, useEffect} from 'react'
import BlogApi from '../Api'
import BlogCard from "./BlogCard"
import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'

function Home(){
    let [posts, setPosts] = useState()
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        if (!posts){
            BlogApi.getBlogs().then((res)=>{
                setPosts(res)
                setLoading(false)
            })
        }
    }, [posts])

    // Direct to new blog
    const history = useHistory()
    const handleClick = ()=>{
        history.push('/posts/new');
    }

    if (loading) {
        return (<div>Loading</div>)
    } else{
        let cards = []
        cards = posts.map(post=><BlogCard key={uuid()} id={post.id} author={post.author} content={post.content} />)
        return (<div>
            <h1>Welcome to i18n_blog</h1>
            <Button onClick={handleClick} vairant="primary">New Blog</Button>
            {cards}
        </div>)
    }
    
}

export default Home