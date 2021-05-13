import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Container, Form, Button, Jumbotron} from 'react-bootstrap'
import BlogApi from '../Api'


export default function Signup(){
    const history = useHistory();

    const initialState = {
        username: "",
        password: "",
        first_name: "",
        last_name: ""
    }

    const [formData, setFormData] = useState(initialState);
    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData(data => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const handleSubmit = (data)=>{
        
        BlogApi.authenticate(data).then(result=>{
            const token = result.token
            localStorage.setItem("token", token)
            history.push('/')
        }).catch(e=>{
            console.log(e);
        })
    }

    return (
        <Container>
            <Jumbotron style ={{padding: "5rem", backgroundColor: "#02475e"}} >
            <h1 style={{margin: "2rem 0", color:"#fefecc"}}> 
             Sign in
            </h1> 
            </Jumbotron>
            <Form onChange={handleChange}>
                <Form.Group controlId="formBasic">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>
                

                <Button onClick={(e)=>{e.preventDefault();handleSubmit(formData)}} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}