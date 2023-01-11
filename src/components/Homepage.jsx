import { useEffect, useState } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [postCount, setPostCount] = useState(0)
  
  useEffect(()=>{
    fetchPosts()
  },[])
  
  const fetchPosts = async () => {
    await axios.get(`/api/posts-count`).then(({data})=>{
      setPostCount(data)
    })
  }
  
  return (
    <h4>Number of posts: {postCount}</h4>
  )
}

export default Homepage