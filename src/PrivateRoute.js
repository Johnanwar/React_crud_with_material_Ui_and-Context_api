import React , {useContext} from "react"
import { Route, Redirect } from "react-router-dom"
// import {EmployeeContext} from './contexts/employeeContext'

export default function PrivateRoute({ component: Component, ...rest }) {
   const isLogin = localStorage.getItem('isLogin');
 

  return (
    <Route
      {...rest}
      render={props => {
        return isLogin === 'true' ? <Component {...props} /> : <Redirect to="/Login" />
      }}
    ></Route>
  )
}
