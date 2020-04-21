import React, { useContext } from 'react'
import { PostContext } from '../../App'
import { Link } from 'react-router-dom';

const Home = () => {
    const post =useContext(PostContext);

    return (
        <div>
            {post.loading ? 
        (<div>...loading</div>):
           ( post.postdata.map(singlePost =>(
           <div>
            <p>{singlePost.url}</p>
            </div>
            ))
           )}
           {post.error ? (
               <p>An error occurred ! pleas check the url and try again</p>
           ):(
               post.postdata.map(singlePost =>(
                   <div>
                       <p>{singlePost.url}</p>
                   </div>
               ))
           )}
           <Link to="/about"><span>About</span></Link>
        </div>
    )
}

export default Home
