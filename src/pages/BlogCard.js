import {useState, useEffect} from 'react'
import BlogApi from '../Api'

function BlogCard({id = 1, author = 7}){
    let [blog, setBlog] = useState()
    let [user, setUser] = useState()
    let [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        let isMounted = true;
        if (!blog || !author){
            BlogApi.getBlogAndAuthor('token', id, author).then(res=>{
                setBlog(res.blog.data)
                setUser(res.author.data)
                setLoading(false)
            })
        }
        return () => { isMounted = false };
    }, [])

    if (loading){
        return <div>Loading</div>
    } else return(<>
        <h2><strong>{blog.title}</strong> - {user.id}</h2>
    </>)
}

export default BlogCard