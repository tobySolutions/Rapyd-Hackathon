import React from 'react'

const Sidebar = () => {
    return (
        <div>
            <h1 className="logo">Rapyd Dating</h1>
            <div className="nav-menu">
                <div className="nav-item selected">
                    {/* TODO: Add icon */}
                    <h3>Home</h3>
                </div>
                <div className="nav-item">
                    {/* TODO: Add icon */}
                    <h3>Explore</h3>
                </div>
                <div className="nav-item">
                    {/* TODO: Add icon */}
                    <h3>Messages</h3>
                </div>
                <div className="nav-item">
                    {/* TODO: Add icon */}
                    <h3>Schedules</h3>
                </div>
                <div className="nav-item">
                    {/* TODO: Add icon */}
                    <h3>Wallet</h3>
                </div>
                <div className="nav-item">
                    {/* TODO: Add icon */}
                    <h3>Settings</h3>
                </div>
            </div>
        </div>
    )
}

export default Sidebar