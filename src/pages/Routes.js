import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'
import BlogForm from "./BlogForm"
import Signup from './Signup'
import Signin from './Signin'

function Routes(){
    return(
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/signin">
                <Signin />
            </Route>
            <Route exact path="/posts/new">
                <BlogForm />
            </Route>
            <Route exact path="/posts/:id">
                <Blog />
            </Route>
        </Switch>
    )
}

export default Routes;