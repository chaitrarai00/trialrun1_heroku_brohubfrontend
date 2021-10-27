import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from './pages/Register';
import Login from './pages/Login';
import {AuthContext} from './helpers/AuthContext'
import {useState, useEffect} from "react"
import axios from 'axios';

function App() {
  //keep track of the authenticated state
  //setting it to false would be done on each refersh-->each render
  const [authState, setAuthState]= useState(false);

  //control render and control need to login each time you refresh
  useEffect(()=>{
    axios.get('http://localhost:3001/auth/auth', {headers:{
      accessToken: localStorage.getItem("accessToken"),
    },
  }).then((response)=>{
      if(response.data.error){
        setAuthState(false);
      }
      else{
        setAuthState(true);
      }
    });
    //if(localStorage.getItem("accessToken")){--> we will make a request as this will be easy for anyone to 
    //fake an access token using the console
      //setAuthState(true);
  },[]);

  return ( //add as many routes here
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
    <div className="navbar">
    <Link to="/createpost">Create a Post</Link>
    <Link to="/">Home</Link>
    {!authState && (<>
    <Link to="/auth">Register</Link>
    <Link to="/login">Login</Link>
    </>)}
    </div>
      <Switch>
        <Route path="/" exact component={Home}/> 
        <Route path="/createpost" exact component={CreatePost}/>
        <Route path="/post/:id" exact component={Post}/>
        <Route path="/auth" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  </div>
  );
}

export default App;
