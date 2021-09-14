import React from 'react';
import { Link } from 'react-router-dom';
import './TopMenu.scss';

class TopMenuProperties {
    currentMenuType: "user" | "administrator" | "visitor" = "visitor";
}

export default class TopMenu extends React.Component<TopMenuProperties> {
    render() {
        if (this.props.currentMenuType === "visitor") {
            return (
                <ul className="justify-content-center"> 
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/user/login">User login</Link>
                    </li>

                    <li>
                        <Link to="/user/register">Register</Link>
                    </li>
                </ul>
            );
        }

        if (this.props.currentMenuType === "administrator") {
            return (
                <ul className="justify-content-center">
                    <li>
                        <Link to="/dashboard/category">Categories</Link>
                    </li>
                    <li>
                        <Link to="/furniture">Furniture</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/article">Articles</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/user">Users</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/order">Orders</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/administrator">Administrators</Link>
                    </li>

                    <li>
                        <Link to="/administrator/logout">Logout</Link>
                    </li>
                </ul>
            );
        }

        if (this.props.currentMenuType === "user") {
            return (
                <ul className="justify-content-center">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/furniture">Furniture</Link>
                    </li>
                    <li>
                        <Link to="/user/logout">Logout</Link>
                    </li>
                </ul>
            );
        }
    }
}