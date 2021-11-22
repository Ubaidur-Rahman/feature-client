import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Admin from './Components/Admin/Admin';
import Alphabeticaly from './Components/Alphabeticaly/Alphabeticaly';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Signup from './Components/Signup/Signup';
import SortByNew from './Components/SortByNew/SortByNew';
import SortByNumOfVote from './Components/SortByNumOfVote/SortByNumOfVote';


export const UserContext = createContext();
export const UserDataContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
          <Navbar />
            <Home />
          </Route>
          <Route path="/login">
          <Navbar />
            <Login />
          </Route>
          <Route path="/signup">
          <Navbar />
            <Signup />
          </Route>
          <Route path="/numOfVote">
          <Navbar />
          <SortByNumOfVote />
          </Route>
          <Route path="/numOfComment">
          <Navbar />
            <Home />
          </Route>
          <Route path="/new">
          <Navbar />
          <SortByNew />
          </Route>
          <Route path="/alphabetically">
          <Navbar />
          <Alphabeticaly />
          </Route>
          <Route path="/random">
          <Navbar />
          <Home />
          </Route>
          <Route path="/status">
          <Navbar />
            <Home />
          </Route>
          <PrivateRoute path="/admin">
          <Admin />
            <Login />
          </PrivateRoute>
          <PrivateRoute path="/comment">
          
            
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
