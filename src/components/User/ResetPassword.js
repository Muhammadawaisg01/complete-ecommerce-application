
import React, { useState, useEffect } from 'react';
import "../../styles/ResetPassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from "../layout/Metadata";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const { newPassword, confirmPassword } = passwords;

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, passwords));
        navigate("/login");
    };

    const resetPasswordDataChange = (e) => {
        setPasswords({
            ...passwords, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Reset successfully");
            navigate("/login");
        }

    }, [success, alert, error, dispatch, navigate]);


    return (
        <>
            {loading ?
                <Loader /> : (
                    <div className='resetPasswordContainer'>
                        <MetaData title={"Reset Password"} />
                        <div className='resetPasswordBox'>
                            <h2 className='resetPasswordHeading'>Reset Password</h2>

                            <form
                                className="resetPasswordForm"
                                encType="multipart/form-data"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={resetPasswordDataChange}
                                    />
                                </div>
                                <div>
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={resetPasswordDataChange}
                                    />
                                </div>
                                <input type="submit" value="Update" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                )}
        </>
    )
}

export default ResetPassword