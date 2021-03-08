import {useState, useEffect} from 'react'
import BlogApi from '../Api'
import BlogCard from "./BlogCard"
import { v4 as uuid } from 'uuid'

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
    }, [])

    if (loading) {
        return (<div>Loading</div>)
    } else{
        let cards = []
        cards = posts.map(post=><BlogCard key={uuid()} id={post.id} author={post.author} />)
        return (<div>
            <h1>Welcome to i18n_blog</h1>
            {cards}
        </div>)
    }
    
}

export default Home