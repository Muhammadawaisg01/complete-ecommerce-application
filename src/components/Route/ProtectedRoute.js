
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const Protected = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.user);

    if (loading === false) {
        if (!isAuthenticated) {
            console.log("Not Authenticated");
            return <Navigate to={"/login"} replace />
        }
        return children;
    }
};

export default Protected;
