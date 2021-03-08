import {useState, useEffect} from 'react'
import BlogApi from './Api'
import './App.css';
import Home from './pages/Home'
import TokenContext from './TokenContext'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      BlogApi.getUser(token).then((res) => {
        console.log('Token verified')
        setUser(res.user)
        setIsLoading(false)
      }
      ).catch((error) => {
        console.log(error)
        setIsLoading(false)
      }
      )
    } else {
      setIsLoading(false)
    }
  }, [token])

  return (
    <div className="App">
      <TokenContext.Provider value={{token, user}}>
        <Home />
      </TokenContext.Provider>
    </div>
  );
}

export default App;
