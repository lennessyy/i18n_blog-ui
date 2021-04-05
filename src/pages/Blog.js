import {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import BlogApi from '../Api'

function Blog(){
    let { id } = useParams()
    let [blog, setBlog] = useState()
    let [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        if (!blog){
            BlogApi.getBlog('token', id).then(res=>{
                setBlog(res.data)
                setLoading(false)
            })
        }
    }, [blog, id])

    if (loading){
        return <div>Loading</div>
    } else return(<>
        <h2><strong>{blog.title}</strong></h2>
        <h3>By: {blog.author}</h3>
        <h4>Language: {blog.locale}</h4>
        <p>{blog.content}</p>
        <p>Created at: {Intl.DateTimeFormat(blog.locale).format(new Date(blog.created_at))}</p>
        <p>Tags: {blog.tags.length !== 0 ? blog.tags.join(", ") : ""}</p>
    </>)
}

export default Blog