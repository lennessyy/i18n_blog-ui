import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import BlogApi from '../Api'

function BlogCard({id, author}){
    let [blog, setBlog] = useState()
    let [user, setUser] = useState()
    let [loading, setLoading] = useState(true)
    const history = useHistory()

    const handleClick = ()=>{
        history.push(`/posts/${id}`)
    }
    
    useEffect(()=>{
        if (!blog || !author){
            BlogApi.getBlogAndAuthor('token', id, author).then(res=>{
                setBlog(res.blog.data)
                setUser(res.author.data)
                setLoading(false)
            })
        }
    }, [author, blog, id])

    if (loading){
        return <div>Loading</div>
    } else return(<>
        <h2 onClick={handleClick}><strong>{blog.title}</strong> - {user.id}</h2>
    </>)
}

export default BlogCard