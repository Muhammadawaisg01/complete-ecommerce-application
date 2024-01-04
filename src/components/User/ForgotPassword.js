
import React, { useState, useEffect } from 'react';
import "../../styles/ForgotPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/Metadata";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Hello before");
        dispatch(forgotPassword(email));
        console.log("Hello after");
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }
    }, [message, alert, error, dispatch])

    return (

        <>
            {loading ? <Loader /> : (
                <div className='forgotPasswordContainer'>
                    <MetaData title={"Forgot Password"} />
                    <div className='forgotPasswordBox'>
                        <h2 className='forgotPasswordHeading'>Update Password</h2>

                        <form
                            className="forgotPasswordForm"
                            onSubmit={forgotPasswordSubmit}
                        >
                            <div className='loginEmail'>
                                <MailOutlineIcon />
                                <input
                                    type='email'
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Update" className="forgotPasswordBtn" />
                        </form>
                    </div>
                </div>
            )}
        </>)
}

export default ForgotPassword