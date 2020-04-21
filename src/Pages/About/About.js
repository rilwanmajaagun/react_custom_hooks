import React,{useReducer, useEffect, useState}from 'react'

const initialState = {
    state:false,
    apidata:[],
    error:{}
  }

const reducer =(state=initialState, action)=>{
    switch(action.type){
        case "GET_DATA_START":
        return {
            ...state,
            start:true
        };
        case "GET_DATA_SUCCESS":
        return {
            ...state,
            apidata: action.payload
        };
        case "GET_DATA_FAILURE":
        return {
            ...state,
            error: action.payload
        };
        default:
            return state
    }
}   
const About = () => {
     const [data, setState] = useState({data:[]});
 const [state, dispatch] = useReducer(reducer, initialState);

 useEffect(() => {
    dispatch({type:'GET_DATA_START'})
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(res => dispatch({type:"GET_DATA_SUCCESS", payload:res}))
    .catch(err => dispatch({type:"GET_DATA_FAILURE", payload:"Error"}))
 },[]);

    const result = state.apidata.map((singlePost,ID)=>{
        return(
            <div>
                <li>{singlePost.id}</li>
                <li>{singlePost.title}</li>
            </div>
        )
    })
    const handleClick = ()=>{
      setState({data:[...state.apidata]})
    }
    return (
        <div>
            <button onClick={handleClick}>Fectch Data</button>
            {result}
        </div>
    )
}

export default About
