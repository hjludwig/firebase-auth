import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import AddItem from "./AddItem";
import { useUserData } from "../contexts/UserDataContext";

const Dashboard = () => {
    const { logout } = useAuth();
    const history = useHistory();
    const handleClick = async () => {
        await logout();
        history.push("/login");
    };

    const user = useAuth().currentUser;
    const data = useUserData();
    console.log(data);
    return (
        <div>
            <h1>The Dashboard</h1>
            <p>
                Welcome, {user.displayName}. Your email is {user.email}
            </p>
            <h2>Your items</h2>
            {data?.items && (
                <ul>
                    {data.items.map(item => (
                        <li>{item}</li>
                    ))}
                </ul>
            )}
            <Button primary onClick={handleClick}>
                Log Out
            </Button>

            <AddItem />
        </div>
    );
};

export default Dashboard;
