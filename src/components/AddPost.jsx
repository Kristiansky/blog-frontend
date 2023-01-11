import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddPost = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [validationError,setValidationError] = useState({})
  
  
  const createPost = async (e) => {
    e.preventDefault();
    
    const formData = new FormData()
    
    formData.append('title', title)
    formData.append('description', description)
    formData.append('user_id', localStorage.getItem('user_id'))
    
    await axios.post(`/api/posts`, formData).then(({data})=>{
      toast.success(data.message)
      navigate("/")
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
              <h4 className="card-title">Create Post</h4>
              <hr />
              <div className="form-wrapper">
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
                <Form onSubmit={createPost}>
                  <div className="row">
                    <div className="col-12">
                      <Form.Group controlId="Name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(event)=>{
                          setTitle(event.target.value)
                        }}/>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-12">
                      <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                          setDescription(event.target.value)
                        }}/>
                      </Form.Group>
                    </div>
                  </div>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AddPost
