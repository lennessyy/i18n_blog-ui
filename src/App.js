import {useState, useEffect} from 'react'
import BlogApi from './Api'
import './App.css';
import Routes from './pages/Routes';
import { BrowserRouter } from "react-router-dom";
import TokenContext from './TokenContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from "react-intl";
import messages from './messages'

function App() {
  const [token] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      BlogApi.getUser(token).then((res) => {
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

  if (isLoading){
    return (<p>Loading</p>)
  }

  let locale = navigator.language.slice(0, 2) || "en";

  return (
    <TokenContext.Provider value={{token, user}}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <div className="App">
                < BrowserRouter>
                  <Routes />
                </BrowserRouter>
          </div>
        </IntlProvider>
    </TokenContext.Provider>
  );
}

export default App;
