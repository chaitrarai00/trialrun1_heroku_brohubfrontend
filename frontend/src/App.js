import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound'
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import {AuthContext} from './helpers/AuthContext'
import {useState, useEffect} from "react"
import axios from 'axios';

function App() {
  //keep track of the authenticated state
  //setting it to false would be done on each refersh-->each render
  const [authState, setAuthState]= useState({
    username:"",
    id:0,
    status:false,
  });

//control render and control need to login each time you refresh
  useEffect(()=>{
    axios.get('https://deployment-trail-run.herokuapp.com/auth/auth', {headers:{
      accessToken: localStorage.getItem("accessToken"),
    },
  }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false}); //grabbing the authstate and only changing the status field/attribute
      }
      else{
        setAuthState({
          username:response.data.username,
          id:response.data.id,
          status:true,
        });
      }
    });
    //if(localStorage.getItem("accessToken")){--> we will make a request as this will be easy for anyone to 
    //fake an access token using the console
      //setAuthState(true);
  },[]);

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };


  return ( //add as many routes here
  <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
    <div className="navbar">
      <div className="links">
        {/* the conditions to show login register if user isnt registered or loggedin and else it shouldnt */}
        {!authState.status ? (
        <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link>
      </>
      ):(
        <>
          <Link to="/">Home</Link>
          <Link to="/createpost">Create a Post</Link>
        </>
      )}
      </div>
      <div className="loggedInContainer">
        <h1>{authState.username}</h1>
        {authState.status && <button onClick={logout}>Logout</button>}
      </div>
    </div>
      <Switch>
        <Route path="/" exact component={Home}/> 
        <Route path="/createpost" exact component={CreatePost}/>
        <Route path="/post/:id" exact component={Post}/>
        <Route path="/registration" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/profile/:id" exact component={Profile}/>
        <Route path="/changepassword" exact component={ChangePassword}/>
        {/* last resort or option if the path isnt defined */}
        <Route path="*" exact component={PageNotFound}/>
      </Switch>
    </Router>
    </AuthContext.Provider>
  </div>
  );
}


export default App;