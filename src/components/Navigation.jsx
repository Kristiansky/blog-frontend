import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import Nav from 'react-bootstrap/Nav'
import { useContext } from 'react'
import { LoggedInContext } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const Navigation = (props) => {
  const navigate = useNavigate();
  const loggedIn = useContext(LoggedInContext);
  
  const logoutSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/logout').then(res => {
      if(res.data.status === 200){
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_name')
        localStorage.removeItem('user_id')
        navigate('/')
        props.setLoggedIn(false)
        toast.success(res.data.message);
      }
    })
  }
  
  return (
    <Navbar bg="success shadow">
      <div className="container">
        <Link to={"/"} className="navbar-brand text-white">
          <img src={logo} alt="home" width="50px"/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href={"/"} className="text-white">Home</Nav.Link>
            <Nav.Link href={"/posts"} className="text-white">All Posts</Nav.Link>
            <Nav.Link href={"/post/create"} className="text-white">Add Post</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {loggedIn ? (
            <Nav>
              <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href={"/login"} className="text-white">Login</Nav.Link>
              <Nav.Link href={"/sign-up"} className="text-white">Sign Up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Navigation;
