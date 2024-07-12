import React, { useState, useEffect } from 'react';
import { getLocation } from '../../utils/getLocation';
import config from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import { LuClock } from "react-icons/lu";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {
    FiHome,
    FiLogOut,
    FiUsers,
    FiFolder,
    FiCalendar,
    FiLayout,
    FiTrello,
    FiDownload
} from 'react-icons/fi';
import { FaList } from 'react-icons/fa';
import { BiCog, BiCalendar, BiUserMinus } from 'react-icons/bi';
import { MdAddCard, MdPayment, MdOutlinePolicy } from "react-icons/md";
import {
    IoToggleOutline,
    IoToggleSharp,
    IoNotificationsOutline,
    IoSettingsOutline,
    IoPersonOutline
} from 'react-icons/io5';
import { ImUserTie, ImListNumbered  } from "react-icons/im";
import { 
    RiUserSearchLine, 
    RiFolderDownloadLine, 
    RiArrowDropDownLine, 
    RiMailSendLine, 
    RiDraftLine  
} from "react-icons/ri";
import { TbCalendarUser, TbUserEdit, TbLayoutBoardSplit } from "react-icons/tb";
import { PiInvoiceDuotone } from "react-icons/pi";
import './Navbar.css';
import axios from 'axios';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { isAuthenticated, role, logout, userId } = useAuth();
    const [menuCollapse, setMenuCollapse] = useState(false);
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isSubmenuOpen2, setIsSubmenuOpen2] = useState(false);
    const [isSubmenuOpen3, setIsSubmenuOpen3] = useState(false);
    const [isSubmenuOpen4, setIsSubmenuOpen4] = useState(false);

    const menuIconClick = () => {
        setMenuCollapse(!menuCollapse);
    };

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const toggleSubmenu2 = () => {
        setIsSubmenuOpen2(!isSubmenuOpen2);
    };
    const toggleSubmenu3 = () => {
        setIsSubmenuOpen3(!isSubmenuOpen3);
    };
    const toggleSubmenu4 = () => {
        setIsSubmenuOpen4(!isSubmenuOpen4);
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await getLocation();
                setLocation(data);
            } catch (error) {
                setError('Failed to fetch location');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await axios.get(`${config.apiBASEURL}/profile/username?userId=${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserName();
    }, []);

    const getProfileLink = () => {
        switch (role) {
            case 'Employee':
                return "/employee/profile";
            case 'Admin':
                return "/admin/profile";
            case 'Client':
                return "/client/profile";
            case 'HR':
                return "/HR/profile";
            default:
                return "/profile";
        }
    };

    const getNavLinks = () => {
        // If user is not authenticated, only show Logout link
        if (!isAuthenticated) {
            return (
                <Menu iconShape="square">
                    <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            );
        }

        // Show navigation links based on the user role
        switch (role) {
            case 'Employee':
                return (
                    <>
                        <Link to="/employee/home"><MenuItem icon={<FiHome />}>
                            Dashboard
                        </MenuItem></Link>
                        <Link to="/employee/EmployeeList"><MenuItem icon={<FiUsers />}>
                            Employee List
                        </MenuItem></Link>
                        <Link to="/employee/projects"><MenuItem icon={<FiFolder />}>
                            Projects
                        </MenuItem></Link>
                        <Link to="/employee/taskBoard"><MenuItem icon={<FiTrello />}>
                            Project Task
                        </MenuItem></Link>
                        <Link to="/employee/Leaves"><MenuItem icon={<FiCalendar />}>
                            Leaves
                        </MenuItem></Link>
                        <Link to="/employee/Tasksheet"><MenuItem icon={<FiLayout />}>
                            Tasks Sheet
                        </MenuItem></Link>
                        <Link to="/employee/calendar"><MenuItem icon={<BiCalendar />}>
                            Calendar
                        </MenuItem></Link>   


                        <Link to="/employee/comingsoon"><MenuItem icon={<BiUserMinus />}>
                            Resignation
                        </MenuItem></Link>

                        {/* <Link to="/employee/Resignation"><MenuItem icon={<BiUserMinus />}>
                            Resignation
                        </MenuItem></Link> */}
                        <hr/>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                );
            case 'Admin':
                return (
                    <>
                        <Link to="/admin/comingsoon"> <MenuItem icon={<FiHome />}>
                            Dashboard
                        </MenuItem></Link>
                        <Link to="/admin/verify"><MenuItem icon={<BiCog />}>
                            Verify
                        </MenuItem></Link>
                        <Link to="/admin/comingsoon"> <MenuItem icon={<ImUserTie />}>
                            Clients
                        </MenuItem></Link>
                        <div>
                            <div onClick={toggleSubmenu2} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiUsers />}>
                                    Employee
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen2 && (
                                <div className='submenu_padding'>
                                    <Link to="/admin/EmployeeList">
                                        <MenuItem icon={<ImListNumbered />}>List</MenuItem>
                                    </Link>
                                    <Link to="/admin/profile_edit">
                                        <MenuItem icon={<TbUserEdit />}>Profile Edit</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* <Link to="/admin/allleaves"> <MenuItem icon={<FiCalendar />}>
                            Leaves
                        </MenuItem></Link>
                        <Link to="/admin/overtime"> <MenuItem icon={<LuClock />}>
                            Overtime
                        </MenuItem></Link> */}
                        <Link to="/admin/Calender"> <MenuItem icon={<TbCalendarUser />}>
                            Calendar
                        </MenuItem></Link>
                        {/* <Link to="/admin/tasksheet"> <MenuItem icon={<FiTrello />}>
                            Tasksheet
                        </MenuItem></Link> */}
                        
                        <div>
                            <div onClick={toggleSubmenu4} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiFolder/>}>
                                    Projects 
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen4 && (
                                <div className='submenu_padding'>
                                    <Link to="/admin/projects">
                                        <MenuItem icon={<RiFolderDownloadLine />}>All Project</MenuItem>
                                    </Link>
                                    <Link to="/admin/taskBoard">
                                        <MenuItem icon={<TbLayoutBoardSplit />}>Project Task</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <div onClick={toggleSubmenu3} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<MdAddCard/>}>
                                    Accounts 
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen3 && (
                                <div className='submenu_padding'>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<MdPayment />}>Payments</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<PiInvoiceDuotone />}>Invoice Add</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiMailSendLine />}>Invoice Sent</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiDraftLine />}>Invoice Draft</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <div onClick={toggleSubmenu} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiDownload />}>
                                    Download 
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen && (
                                <div className='submenu_padding'>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Payslip</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Report</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Project File</MenuItem>
                                    </Link>
                                    <Link to="/admin/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Policy</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <hr/>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                );
            case 'Client':
                return (
                    <>
                        <Link to="/client/home"> <MenuItem icon={<FiHome />}>
                            Home
                        </MenuItem></Link>
                        <Link to="/client/projects"> <MenuItem icon={<FiFolder/>}>
                            Projects
                        </MenuItem></Link>
                        <Link to="/client/Comingsoon"> <MenuItem icon={<PiInvoiceDuotone />}>
                            View Invoice
                        </MenuItem></Link>
                        <Link to="/client/Comingsoon"> <MenuItem icon={<FaList />}>
                            Project Status
                        </MenuItem></Link>
                        <Link to="/client/Comingsoon"> <MenuItem icon={<FiDownload />}>
                            File Upload
                        </MenuItem></Link>
                        <Link to="/client/Comingsoon"> <MenuItem icon={<MdOutlinePolicy />}>
                            Company Policy
                        </MenuItem></Link>
                        <hr/>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                );
            case 'HR':
                return (
                    <>
                        <Link to="/HR/comingsoon"> <MenuItem icon={<FiHome />}>
                            Dashboard
                        </MenuItem></Link>
                        <Link to="/HR/verify"><MenuItem icon={<RiUserSearchLine />}>
                            Verify
                        </MenuItem></Link>
                        <div>
                            <div onClick={toggleSubmenu2} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiUsers />}>
                                    Employee
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen2 && (
                                <div className='submenu_padding'>
                                    <Link to="/HR/EmployeeList">
                                        <MenuItem icon={<ImListNumbered />}>List</MenuItem>
                                    </Link>
                                    <Link to="/HR/profile_edit">
                                        <MenuItem icon={<TbUserEdit />}>Profile Edit</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/HR/allleaves"> <MenuItem icon={<FiCalendar />}>
                            Leaves
                        </MenuItem></Link>
                        <Link to="/HR/comingsoon"> <MenuItem icon={<LuClock />}>
                            Overtime
                        </MenuItem></Link>
                        <div>
                            <div onClick={toggleSubmenu4} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiFolder/>}>
                                    Projects 
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen4 && (
                                <div className='submenu_padding'>
                                    <Link to="/HR/projects">
                                        <MenuItem icon={<RiFolderDownloadLine />}>All Project</MenuItem>
                                    </Link>
                                    <Link to="/HR/taskBoard">
                                        <MenuItem icon={<TbLayoutBoardSplit />}>Project Task</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link to="/HR/Calender"> <MenuItem icon={<TbCalendarUser />}>
                            Calendar
                        </MenuItem></Link>
                        <Link to="/HR/comingsoon"> <MenuItem icon={<FiTrello />}>
                            Tasksheet
                        </MenuItem></Link>
                        <div>
                            <div onClick={toggleSubmenu} style={{ cursor: 'pointer' }}>
                                <MenuItem icon={<FiDownload />}>
                                    Download 
                                    <span className='subIcon'><RiArrowDropDownLine /></span>
                                </MenuItem>
                            </div>
                            {isSubmenuOpen && (
                                <div className='submenu_padding'>
                                    <Link to="/HR/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Payslip</MenuItem>
                                    </Link>
                                    <Link to="/HR/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Report</MenuItem>
                                    </Link>
                                    <Link to="/HR/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Project File</MenuItem>
                                    </Link>
                                    <Link to="/HR/comingsoon">
                                        <MenuItem icon={<RiFolderDownloadLine />}>Policy</MenuItem>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <hr className='mb-0'/>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div id="header">
            <div className='topheader'>
                <ul>
                    <li className='iconsize'>
                        <Link to="#"><IoNotificationsOutline /></Link>
                        <div className='count_no'>0</div>
                    </li>
                    <li>
                        {`${location?.status} | ${role}`}
                    </li>
                    <li>
                        <MDBDropdown>
                            <MDBDropdownToggle>{userDetails.username}</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem tag={Link} to={getProfileLink()}><IoPersonOutline /> My Profile</MDBDropdownItem>
                                <MDBDropdownItem tag={Link} to="#"><IoSettingsOutline /> Settings</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </li>
                </ul>
            </div>
            <Sidebar collapsed={menuCollapse} className="sidebar">
                <div className="logotext">
                    {menuCollapse ? (
                        <p><img src={require("../../assets/images/logogf.png")} alt="Logo" style={{ width: '30px', height: '30px' }} /></p>
                    ) : (
                        <p><img src={require("../../assets/images/logogf.png")} alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} /> BlackBox</p>
                    )}
                </div>
                <div className="closemenu" onClick={menuIconClick}>
                    {menuCollapse ? <IoToggleOutline /> : <IoToggleSharp />}
                </div>
                <Menu iconShape="square">
                    {getNavLinks()}
                </Menu>
            </Sidebar>
        </div>
    );
};

export default Navbar;
