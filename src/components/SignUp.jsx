import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const SignUp = (props) => {
  const navigate = useNavigate();
  
  const [registerInput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    error_list: [],
  })
  
  const [formHasErrors, setFormHasErrors] = useState(false)
  
  const handleInput = (e) => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value
    })
  }
  
  const signUpSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password
    }
    
    axios.get('http://localhost/blog-backend/public/sanctum/csrf-cookie').then(res =>{
      axios.post('http://localhost/blog-backend/public/api/register-user', data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          localStorage.setItem('user_id', res.data.user_id)
          props.setLoggedIn(true)
          navigate('/')
          toast.success(res.data.message);
          setFormHasErrors(false);
        }else{
          toast.error('Error occurred.');
          setFormHasErrors(true);
          setRegisterInput({
            ...registerInput , error_list: res.data.validation_errors
          })
        }
      })
    })
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>
              Sign Up
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={signUpSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" onChange={handleInput} value={registerInput.name} className="form-control" id="name" autoComplete="off"/>
                <span className="text-danger">{formHasErrors && registerInput.error_list.name }</span>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" id="email" autoComplete="off"/>
                <span className="text-danger">{formHasErrors && registerInput.error_list.email}</span>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" id="password" autoComplete="off"/>
                <span className="text-danger">{formHasErrors && registerInput.error_list.password}</span>
              </div>
              <div className="form-group mb-2">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
