import React from 'react'
import Login from '../components/Login/Login'
import Helmet from '../layout/Helmet'


const Home = () => {
  return (
    <Helmet title='URSETIT'>
      <Login />
    </Helmet>
    
  )
}

export default Home