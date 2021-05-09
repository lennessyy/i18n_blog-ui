import {useState, useEffect, useContext} from 'react'
import BlogApi from '../Api'
import BlogCard from "./BlogCard"
import Button from 'react-bootstrap/Button'
import {Jumbotron, Container, Row} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from "react-intl";
import TokenContext from '../TokenContext'


function Home(){
    let [ posts, setPosts ] = useState()
    let [ loading, setLoading ] = useState(true)
    // context: {token: "", user: {}}
    const context = useContext(TokenContext)

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
        if (context.token){
            history.push('/posts/new');
        } else {
            history.push("/signup")
        }
    }

    const createPostbutton = <Button onClick={handleClick} variant="light">
    <FormattedMessage id="createNew"></FormattedMessage>
    </Button>

    const signupButtons =(
        <div className="row">
            <Button onClick={handleClick} variant="light" style={{margin:"1rem"}}>
            <FormattedMessage id="signup"></FormattedMessage>
            </Button>
            <Button onClick={()=>history.push("/signin")} variant="light" style={{margin:"1rem"}}>
                <FormattedMessage id="signin"></FormattedMessage>
            </Button>
        </div>
    ) 

    if (loading) {
        return (<div><FormattedMessage id="loading"></FormattedMessage></div>)
    } else{
        let cards = []
        cards = posts.map(post=><BlogCard key={uuid()} id={post.id} author={post.author} content={post.content} />)
        return (
            <div id="home" style={{backgroundColor: "#687980"}}>
                <Jumbotron id="welcome" style ={{padding: "5rem", backgroundColor: "#02475e"}}>
                    <h1 style={{margin: "2rem 0", color:"#fefecc"}}><FormattedMessage id="greeting"></FormattedMessage></h1>
                
                    {context.token ? createPostbutton : signupButtons}
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