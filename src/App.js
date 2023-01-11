import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import AddPost from './components/AddPost'
import SinglePost from './components/SinglePost'
import Posts from './components/Posts'
import Login from './components/Login'
import SignUp from './components/SignUp'
import axios from 'axios'
import { createContext, useState } from 'react'
import Navigation from './components/Navigation'
import PrivateRoute from './components/PrivateRoute'
import Homepage from './components/Homepage'

axios.defaults.baseURL = 'http://localhost/blog-backend/public';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
})

export const LoggedInContext = createContext(false);

function App() {
  const [loggedIn, setLoggedIn] = useState(()=>{
    return !!localStorage.getItem('auth_token');
  })
  
  return (
      <Router>
        <LoggedInContext.Provider value={loggedIn}>
        <Navigation setLoggedIn={setLoggedIn}/>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                <Route exact path='/' element={<Homepage />}/>
                <Route path='/post/create' element={<PrivateRoute isPrivate={true}/>}>
                  <Route path='/post/create' element={<AddPost />}/>
                </Route>
                <Route path='/post/:id' element={<PrivateRoute isPrivate={true}/>}>
                  <Route path='/post/:id' element={<SinglePost />}/>
                </Route>
                <Route path='/posts' element={<PrivateRoute isPrivate={true}/>}>
                  <Route path='/posts' element={<Posts />}/>
                </Route>
                <Route path='/login' element={<PrivateRoute isPrivate={false}/>}>
                  <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
                </Route>
                <Route path='/sign-up' element={<PrivateRoute isPrivate={false}/>}>
                  <Route path='/sign-up' element={<SignUp setLoggedIn={setLoggedIn}/>}/>
                </Route>
              </Routes>
            </div>
          </div>
        </div>
        </LoggedInContext.Provider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
  );
}

export default App;
