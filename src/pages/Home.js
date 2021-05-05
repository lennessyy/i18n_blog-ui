import {useState, useEffect} from 'react'
import BlogApi from '../Api'
import BlogCard from "./BlogCard"
import Button from 'react-bootstrap/Button'
import {Jumbotron, Container, Row} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from "react-intl";


function Home(){
    let [ posts, setPosts ] = useState()
    let [ loading, setLoading ] = useState(true)

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
        return (<div><FormattedMessage id="loading"></FormattedMessage></div>)
    } else{
        let cards = []
        cards = posts.map(post=><BlogCard key={uuid()} id={post.id} author={post.author} content={post.content} />)
        return (
            <div id="home" style={{backgroundColor: "#687980"}}>
                <Jumbotron id="welcome" style ={{padding: "5rem", backgroundColor: "#02475e"}}>
                    <h1 style={{margin: "2rem 0", color:"#fefecc"}}><FormattedMessage id="greeting"></FormattedMessage></h1>
                
                    <Button onClick={handleClick} variant="light">
                        <FormattedMessage id="createNew"></FormattedMessage>
                    </Button>
                </Jumbotron>
                <Container>
                    <Row>
                       {cards}
                    </Row>   
                </Container>  
            </div>)
    }
    
}

export default Home