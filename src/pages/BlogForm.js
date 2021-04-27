import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import BlogApi from '../Api'
import TokenContext from '../TokenContext'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { FormattedMessage } from 'react-intl'

export default function BlogForm(){
    const history = useHistory();

    const initialState = {
        content: "",
        locale: navigator.language.slice(0, 2),
        title: "",
        tags: []
    }

    const context = useContext(TokenContext)

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "tags"){
            const newTags = value.split(',');
            setFormData(data=>{
                return {
                    ...data,
                    [name]: newTags
                }
            })
        } else {
            setFormData(data => {
                return {
                    ...data,
                    [name]: value
                }
            })
        }
    }

    const handleSubmit = async (formData)=>{
        const result = await BlogApi.createBlog(context.token, formData)
        if (result.status === 201){
            console.log("Post created!");
        }
        history.push('/')
    }

    return (
    <Container style={{padding: "5rem"}}>
        <Form.Group>
            <Form.Row>
                <Form.Label column="lg" lg={2}>
                    <FormattedMessage id="formTitle"></FormattedMessage>
                </Form.Label>
                <Col>
                <Form.Control name="title" onChange={handleChange} size="lg" type="text"/>
                </Col>
            </Form.Row>
             <br />
            <Form.Row>
                <Form.Label column lg={2}>
                    <FormattedMessage id="formContent"></FormattedMessage>
                </Form.Label>
                <Col>
                <Form.Control name="content" onChange={handleChange} as="textarea" rows={10} />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="sm" lg={2}>
                    <FormattedMessage id="formTags"></FormattedMessage>
                </Form.Label>
                <Col>
                <Form.Control name="tags" onChange={handleChange} size="sm" type="text" />
                </Col>
            </Form.Row>
        </Form.Group>
        <Button variant="primary" onClick={()=>handleSubmit(formData)}>
            <FormattedMessage id="formSubmit"></FormattedMessage>
        </Button>
    </Container>)
}