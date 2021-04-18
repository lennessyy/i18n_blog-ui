import {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import BlogApi from '../Api'
import { IntlProvider, FormattedMessage } from 'react-intl'
import messages from '../messages'

function Blog(){
    let { id } = useParams()
    let [ blog, setBlog ] = useState()
    let [ loading, setLoading ] = useState(true)
    
    // Get full content of blog from API
    useEffect(()=>{
        if (!blog){
            BlogApi.getBlog('token', id).then(res=>{
                setBlog(res.data)
                setLoading(false)
            })
        }
    }, [blog, id])


    if (loading){
        return <div>
                <FormattedMessage id="loading">
                </FormattedMessage>
            </div>
    } else {
        let locale = blog.locale.slice(0, 2)
        if (locale !== 'zh' && locale !== 'en'){
            locale = 'en'
        }
        
        return(
    <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
            <h2><strong>{blog.title}</strong></h2>
            <h3><FormattedMessage id="byAuthor" values={{name:blog.author}}></FormattedMessage></h3>
            <h4><FormattedMessage id="language" values={{language:blog.locale}}></FormattedMessage></h4>
            <p>{blog.content}</p>
            <p><FormattedMessage id="createdAt" values={{time: Intl.DateTimeFormat(blog.locale).format(new Date(blog.created_at))}}></FormattedMessage></p>
            <p><FormattedMessage id="tags"></FormattedMessage> {blog.tags.length !== 0 ? blog.tags.join(", ") : ""}</p>
        </div>
    </IntlProvider>)
    }
}

export default Blog