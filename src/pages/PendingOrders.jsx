import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PendingOrders = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [orders, setOrders] = useState([]); // Store pending orders
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null); // To store user data (e.g., isAdmin)

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch('/users/check-auth', {
                    credentials: 'include', // Ensure session info is included
                });
                const data = await response.json();
                if (data.success && data.user) {
                    setUser(data.user);
                    if (data.user.isAdmin === false) {
                        // Redirect to home if not an admin
                        navigate('/');
                    } else {
                        // Fetch pending orders only if the user is admin
                        fetchPendingOrders();
                    }
                } else {
                    // Handle unauthenticated case (optional)
                    navigate('/');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                navigate('/');
            }
        };

        checkUserStatus(); // Run the function on component mount
    }, [navigate]);

    const fetchPendingOrders = async () => {
        try {
            const response = await fetch('/orders/pending', {
                credentials: 'include', // Include cookies for session management
            });
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            } else {
                setMessage('No pending orders found.');
            }
        } catch (error) {
            console.error('Error fetching pending orders:', error);
            setMessage('Failed to load pending orders.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pending-orders-container">
            <h1>Pending Orders</h1>
            {message && <div className="message">{message}</div>}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <li key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Customer: {order.customerName}</p>
                                <p>Status: {order.status}</p>
                            </li>
                        ))
                    ) : (
                        <p>No pending orders at the moment.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default PendingOrders;
