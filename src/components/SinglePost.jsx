import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function EditUser() {
  const { id } = useParams()
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [newPost, setNewPost] = useState(false)
  const [validationError,setValidationError] = useState({})
  
  useEffect(()=>{
    fetchPost()
  },[newPost])
  
  const fetchPost = async () => {
    await axios.get(`http://localhost/blog-backend/public/api/posts/${id}`).then(({data})=>{
      const { title, description, comments } = data.post
      setTitle(title)
      setDescription(description)
      setComments(comments)
      setNewPost(false);
    }).catch(({response:{data}})=>{
      toast.error(data.message)
    })
  }
  
  const addComment = async (e) => {
    e.preventDefault()
    const formData = new FormData()
  
    formData.append('comment', comment)
    formData.append('post_id', id)
    formData.append('user_id', localStorage.getItem('user_id'))
    
    await axios.post(`http://localhost/blog-backend/public/api/comments`, formData).then(({data})=>{
      toast.success(data.message)
      setNewPost(true)
      setComment('')
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        toast.error(response.data.message)
      }
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
              <h5>Add a comment:</h5>
              <hr/>
              {
                Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {
                            Object.entries(validationError).map(([key, value])=>(
                              <li key={key}>{value}</li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              }
              <Form onSubmit={addComment}>
                <div className="row">
                  <div className="col-12">
                    <Form.Group className="mb-3" controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as="textarea" rows={3} value={comment} onChange={(event)=>{
                        setComment(event.target.value)
                      }}/>
                      <Button variant="primary" className="mt-2" size="sm" block="block" type="submit">
                        Submit
                      </Button>
                    </Form.Group>
                  </div>
                </div>
              </Form>
              
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
