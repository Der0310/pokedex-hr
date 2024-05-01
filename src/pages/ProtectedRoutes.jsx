import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const trainer = useSelector((store) => store.trainer);

    // console.log(trainer);

    if (trainer.length > 2) {
      return <Outlet/>// se renderizan las rutas de Routes
      
    } else {
      return <Navigate to='/' />
    }
  return (
    <div>ProtectedRoutes</div>
  )
}

export default ProtectedRoutes;