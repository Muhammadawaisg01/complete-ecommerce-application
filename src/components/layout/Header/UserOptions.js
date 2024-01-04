
import React, { Fragment, useState } from 'react'
import "./../../../styles/Header.css"
import { useDispatch, useSelector } from 'react-redux';
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { logout } from '../../../actions/userAction';
import { Backdrop } from '@material-ui/core';


const UserOptions = ({ user }) => {

    const navigate = useNavigate();
    // const { role } = user;

    const options = [
        { icon: <PersonIcon />, name: "Account", func: account },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ];

    // if (role === "Admin") {
    //     options.unshift({
    //         icon: <DashboardIcon />,
    //         name: "Dashboard",
    //         func: dashboard
    //     })
    // }

    function orders() {

    }

    function logoutUser() {
        navigate('/login');
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    function account() {
        navigate("/account");
    }

    function dashboard() {

    }

    const alert = useAlert();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                open={open}
                direction='down'
                icon={<SpeedDialIcon />}
                className='speedDial'
                style={{ zIndex: "11" }}
            >
                {
                    options.map((item) => {
                        return (<SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                        />)
                    })
                }
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions

