import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'

export default function EditUser() {
  const { id } = useParams()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [comments, setComments] = useState([])
  
  useEffect(()=>{
    fetchPost()
  },[])
  
  const fetchPost = async () => {
    await axios.get(`http://localhost/blog-backend/public/api/posts/${id}`).then(({data})=>{
      const { title, description, comments } = data.post
      setTitle(title)
      setDescription(description)
      setComments(comments)
    }).catch(({response:{data}})=>{
      toast.error(data.message)
    })
  }
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <hr />
              <p>
                {description}
              </p>
            </div>
            <div className="card-footer">
              <h5>Comments:</h5>
              {
                comments.length > 0 && (
                  comments.map((row, key)=>(
                    <div className="card mb-2" key={key}>
                      <div className="card-body">
                        <p>{row.comment}</p>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
