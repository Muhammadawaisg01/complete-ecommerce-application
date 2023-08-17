
import React, { useState, useEffect } from 'react';
import "../../styles/UpdatePassword.css";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from "../layout/Metadata";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const { oldPassword, newPassword, confirmPassword } = passwords;

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        console.log("Hello before");
        dispatch(updatePassword(passwords));
        console.log("Hello after");
        navigate("/account");
    };

    const updatePasswordDataChange = (e) => {
        setPasswords({
            ...passwords, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated successfully");
            dispatch(loadUser());
            navigate("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [isUpdated, alert, error, dispatch])


    return (
        <>
            {loading ? <Loader /> : (
                <div className='updatePasswordContainer'>
                    <MetaData title={"Update Password"} />
                    <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>Update Password</h2>

                        <form
                            className="updatePasswordForm"
                            encType="multipart/form-data"
                            onSubmit={updatePasswordSubmit}
                        >
                            <div>
                                <VpnKeyIcon />
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={updatePasswordDataChange}
                                />
                            </div>
                            <div>
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={updatePasswordDataChange}
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
                                    onChange={updatePasswordDataChange}
                                />
                            </div>

                            <input type="submit" value="Update" className="updatePasswordBtn" />
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdatePassword