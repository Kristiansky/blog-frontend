import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  
  const [posts, setPosts] = useState([])
  
  useEffect(()=>{
    fetchPosts()
  },[])
  
  const fetchPosts = async () => {
    await axios.get(`http://localhost/blog-backend/public/api/posts`).then(({data})=>{
      setPosts(data)
    })
  }
  
  return (
    <div className="container">
      <div className="row">
        <div className='col-12'>
          <Link className='btn btn-primary mb-2 float-end' to={"/post/create"}>
            Create Post
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {
                  posts.length > 0 && (
                    posts.map((row, key)=>(
                      <tr key={key}>
                        <td>{row.title}</td>
                        <td>{row.description}</td>
                        <td>
                          <Link to={`/post/${row.id}`} className='btn btn-success me-2'>
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Posts
