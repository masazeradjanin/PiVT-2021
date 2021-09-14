import React from 'react';
import { Link } from 'react-router-dom';

class TopMenuProperties {
    currentMenuType: "user" | "administrator" | "visitor" = "visitor";
}

export default class TopMenu extends React.Component<TopMenuProperties> {
    render() {
        if (this.props.currentMenuType === "visitor") {
            return (
               
                <ul className="justify-content-center"> 
                    <li>
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/furniture">Furniture</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/user/login">User login</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/user/register">Register</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/administrator/login">Administrator login</Link>
                    </li>
                </ul>
            );
        }

        if (this.props.currentMenuType === "administrator") {
            return (
                <ul className="justify-content-center">
                    <li>
                        <Link className="nav-link" to="/dashboard/category">Categories</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/dashboard/article">Articles</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/dashboard/user">Users</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/dashboard/order">Orders</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/dashboard/administrator">Administrators</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/administrator/logout">Logout</Link>
                    </li>
                </ul>
            );
        }

        if (this.props.currentMenuType === "user") {
            return (
                <ul className="justify-content-center">
                    <li>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/category">Categories</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/profile">My Account</Link>
                    </li>

                    <li>
                        <Link className="nav-link" to="/user/logout">Logout</Link>
                    </li>
                </ul>
            );
        }
    }
}