import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import BlogApi from '../Api'
import TokenContext from '../TokenContext'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function BlogForm(){
    const history = useHistory();

    const initialState = {
        content: "",
        locale: "",
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

    return <>
        <Form.Group>
            <Form.Row>
                <Form.Label column="lg" lg={2}>
                Title
                </Form.Label>
                <Col>
                <Form.Control name="title" onChange={handleChange} size="lg" type="text" placeholder="Large text" />
                </Col>
            </Form.Row>
             <br />
            <Form.Row>
                <Form.Label column lg={2}>
                Content
                </Form.Label>
                <Col>
                <Form.Control name="content" onChange={handleChange} type="text" placeholder="Normal text" />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Form.Label column="sm" lg={2}>
                Tags
                </Form.Label>
                <Col>
                <Form.Control name="tags" onChange={handleChange} size="sm" type="text" placeholder="Small text" />
                </Col>
            </Form.Row>
            <Form.Row>
                <Form.Label column="sm" lg={2}>
                Locale
                </Form.Label>
                <Col>
                <Form.Control name="locale" onChange={handleChange} size="sm" type="text" placeholder="Small text" />
                </Col>
            </Form.Row>
        </Form.Group>
        <Button variant="primary" onClick={()=>handleSubmit(formData)}>Submit</Button>
    </>
}