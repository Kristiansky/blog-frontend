import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const Login = (props) => {
  const navigate = useNavigate();
  
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  })
  
  const [formHasErrors, setFormHasErrors] = useState(false)
  
  const handleInput = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value
    })
  }
  
  const loginSubmit = (e) => {
    e.preventDefault()
    
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }
  
    axios.get('/sanctum/csrf-cookie').then(res => {
      axios.post('/api/login', data).then(res => {
        if (res.data.status === 200) {
          setFormHasErrors(false);
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          localStorage.setItem('user_id', res.data.user_id)
          navigate('/')
          props.setLoggedIn(true)
          toast.success(res.data.message);
        } else if (res.data.status === 401) {
          toast.warning(res.data.message)
          setFormHasErrors(false);
        } else {
          setFormHasErrors(true);
          setLoginInput({ ...loginInput, error_list: res.data.validation_errors })
        }
      });
    })
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4>
              Login screen
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" onChange={handleInput} value={loginInput.email} id="email"/>
                <span className="text-danger">{formHasErrors && loginInput.error_list.email }</span>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleInput} value={loginInput.password} id="password"/>
                <span className="text-danger">{formHasErrors && loginInput.error_list.password }</span>
              </div>
              <div className="form-group mb-2">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
