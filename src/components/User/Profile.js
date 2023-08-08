

import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Profile.css"
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';


const Profile = () => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    useEffect(() => {
        // if (isAuthenticated === false) {
        //     navigate("/login");
        // }
    }, [
        // isAuthenticated
    ])
    return (
        <Fragment>
            {loading ? (<Loader />) :
                <>
                    <Metadata title={`${user.name}'s Profile`} />
                    <div className='profileContainer'>
                        <div>
                            <h1>My Profile</h1>
                            <img alt='Profile Photo' />
                            <Link to={"/me/update"}> Edit Profile </Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to={"/orders/me"}> My Orders </Link>
                                <Link to={"/password/update"}> Change Password </Link>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Fragment>

    )
}

export default Profile