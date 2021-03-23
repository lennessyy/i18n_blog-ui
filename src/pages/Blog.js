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
        <p>{blog.content}</p>
    </>)
}

export default Blog