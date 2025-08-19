import React from 'react'
import { Outlet } from 'react-router'
import Header from '../component/User/Header'
import Footer from '../component/User/Footer'

const UserLayout = () => {
    return (
        <>
            <Header />
          
            
                <Outlet />
        
            <Footer />
        </>
    )
}

export default UserLayout