import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const UserProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ? <h1>Welcome, {user.name}</h1> : <h1>Please log in</h1>}
        </div>
    );
};

export default UserProfile;