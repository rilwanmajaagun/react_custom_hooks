import React, {useReducer, useEffect}from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';


export const PostContext = React.createContext();

const initialState = {
  loading: false,
  postdata:[],
  error: false
}

const reducer = (state= initialState, action)=>{
  switch (action.type) {
    case 'GET_DATA_START':
      return {
        ...state,
        loading:true 
      };
      case 'GET_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        postdata:action.payload
      };
      case 'GET_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error:true
      };
    default:return  state
  }
}

function App() {
   const [post, dispatch] = useReducer(reducer, initialState);

   useEffect(() => {
      dispatch({type:'GET_DATA_START'})
      fetch("https://api.github.com/users/wycats/gists")
      .then(res => res.json())
      .then(res => dispatch({type:"GET_DATA_SUCCESS", payload:res}))
      .catch(err => dispatch({type:"GET_DATA_FAILURE", payload:"Error"}))
   },[]);
  return (
    <div className="App">
      <PostContext.Provider value={post}>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      </Switch>
      </PostContext.Provider>
    </div>
  );
}

export default App;
