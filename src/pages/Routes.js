import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'

function Routes(){
    return(
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route exact path="/posts/:id">
                <Blog />
            </Route>
        </Switch>
    )
}

export default Routes;