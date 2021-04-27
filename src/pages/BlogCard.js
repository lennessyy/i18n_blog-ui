import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import BlogApi from '../Api'
import {FormattedMessage} from 'react-intl'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

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
        return <div>
            <FormattedMessage id="loading"></FormattedMessage>
        </div>
    } else return(
        <Col xs="3" style={{margin: "1rem 0"}}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {blog.title}
                    </Card.Title>
                    <Card.Subtitle>
                        {user.username}
                    </Card.Subtitle>
                    <Card.Link onClick={handleClick}>Read</Card.Link>
                </Card.Body>
            </Card>
        </Col>)
}

export default BlogCard