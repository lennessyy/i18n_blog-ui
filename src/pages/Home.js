import {useState, useEffect} from 'react'
import BlogApi from '../Api'
import BlogCard from "./BlogCard"
import Button from 'react-bootstrap/Button'
import { v4 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from '../messages'


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

    // Get locale from browser
    let locale = "zh" //navigator.language.slice(0, 2)

    if (loading) {
        return (<div><FormattedMessage id="loading"></FormattedMessage></div>)
    } else{
        let cards = []
        cards = posts.map(post=><BlogCard key={uuid()} id={post.id} author={post.author} content={post.content} />)
        return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div>
                <h1><FormattedMessage id="greeting"></FormattedMessage></h1>
                <Button onClick={handleClick} vairant="primary">
                    <FormattedMessage id="createNew"></FormattedMessage>
                </Button>
                {cards}
            </div>
        </IntlProvider>)
    }
    
}

export default Home