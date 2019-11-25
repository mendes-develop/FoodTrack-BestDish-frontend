import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styled from 'styled-components'
import {getUser} from './fetch/Fetch.js'
import Navbar from './views/NavBar'
import Login from './views/Login'
import MapDiv from './views/MapDiv'
import BoxSearch from './views/BoxSearch'
import Default from './views/Default'
// import Default from './components/Default'
import {useSelector, useDispatch} from 'react-redux'

function App() {

  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleData = (data) => {
      if (data){
        dispatch({type: "SET_USER", payload: data.current_user})
      }
    }

    const handleToken = async () => {
      let user = await getUser()
      handleData(user)
    }
  
    if (localStorage.token) {
      handleToken()
    }
  },[dispatch])


    return (
      <>
        <Navbar/>
        <Switch>
          <Route exact path={'/'} component={BoxSearch}/>
          <Route exact path={'/restaurants'} component={MapDiv}/>
          <Route exact path={'/login'} component={Login}/>
          <Route exact path={'/restaurants/:id'} component={Login}/>
          <Route default component={Default}/>
        </Switch>
      </>
      
      

    )
}

// function mapStateToProps(state){
//   return {
//     currentUser: state.currentUser
//   }
// }

// function mapDispatchToProps(dispatch){
//   return {
//     setUser: (user) => {
//       dispatch({type: "SET_USER", payload: user})
//     }
//   }
// }

export default (App)