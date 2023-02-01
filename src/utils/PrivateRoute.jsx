import { Route, Redirect, useHistory } from 'react-router-dom'
import { useContext,useEffect,useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../context/FirebaseConfig'
import { useAuthState,useIdToken } from "react-firebase-hooks/auth";


const PrivateRoute = ({children, ...rest}) => {

    let history = useHistory()
    
    //let {isAuthenticated} = useContext(AuthContext)
    const [user, loading, error] = useAuthState(auth);
    
    useEffect(() => {
        if (loading) 
        if (!user) history.push("/home");
      }, [user,loading]);
    
    console.log(user)

    let authState
    if (user===null){
        authState = false
    }else{
        authState = true
    }
    
    console.log(authState)

    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return(
        <Route{...rest}> {!authState? <Redirect to = '/login'/> : children} </Route>
    )
}

export default PrivateRoute