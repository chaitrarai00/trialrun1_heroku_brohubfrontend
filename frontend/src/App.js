import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from './pages/Register';
import Login from './pages/Login';


function App() {  
  return ( //add as many routes here
  <div className="App">
    <Router>
    <div className="navbar">
    <Link to="/createpost">Create a Post</Link>
    <Link to="/">Home</Link>
    <Link to="/auth">Register</Link>
    <Link to="/login">Login</Link>
    </div>
      <Switch>
        <Route path="/" exact component={Home}/> 
        <Route path="/createpost" exact component={CreatePost}/>
        <Route path="/post/:id" exact component={Post}/>
        <Route path="/auth" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </Router>
  </div>
  );
}

export default App;
