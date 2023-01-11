import { Outlet, Navigate } from 'react-router'
import { useContext } from 'react'
import { LoggedInContext } from '../App'

const PrivateRoute = (props) => {
  const loggedIn = useContext(LoggedInContext);
  
  if(props.isPrivate === true){
    return loggedIn ? <Outlet/> : <Navigate to="/" />
  }else if(props.isPrivate === false){
    return loggedIn ? <Navigate to="/" /> : <Outlet/>
  }
}

export default PrivateRoute
