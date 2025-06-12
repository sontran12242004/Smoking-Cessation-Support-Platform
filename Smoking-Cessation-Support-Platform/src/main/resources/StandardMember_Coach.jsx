import React, { useState } from 'react';
import EditProfileModal from './EditProfileModal';

function StandardMember_Coach() {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const styles = `
    html, body, #root {
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: Arial, sans-serif;
    }
    body {
        margin: 0;
        background-color: #f0f2f5;
    }
    .main-header {
        width: 100vw;
        background: #e0f7fa;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 36px 18px 36px;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
    }
    .header-left {
        display: flex;
        align-items: center;
        gap: 24px;
    }
    .member-btn {
        display: flex;
        align-items: center;
        background: #43b649;
        color: #fff;
        border: none;
        border-radius: 999px;
        padding: 10px 28px 10px 16px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(67,182,73,0.10);
        transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
        outline: none;
        gap: 10px;
    }
    .member-btn .user-icon {
        font-size: 22px;
        color: #6c2eb7;
        margin-right: 8px;
    }
    .logo-section {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .logo {
        font-size: 28px;
        font-weight: bold;
        color: #222;
        margin-right: 10px;
    }
    .nicoff-title {
        color: #43b649;
        font-weight: 700;
        font-size: 26px;
        margin-right: 0;
    }
    .nicoff-slogan {
        color: #666;
        font-size: 15px;
        font-style: italic;
        margin-left: 2px;
    }
    .main-menu {
        display: flex;
        align-items: center;
        gap: 36px;
        margin-left: 40px;
    }
    .main-menu-item {
        color: #222;
        font-weight: 700;
        font-size: 18px;
        text-decoration: none;
        padding-bottom: 2px;
        border-bottom: 2.5px solid transparent;
        transition: color 0.2s, border-bottom 0.2s;
        background: none;
        cursor: pointer;
    }
    .main-menu-item.active, .main-menu-item:hover {
        color: #43b649;
        border-bottom: 2.5px solid #43b649;
    }
    .header-right {
        display: flex;
        align-items: center;
        gap: 18px;
    }
    .bell-icon {
        font-size: 26px;
        color: #ffb300;
        margin-right: 2px;
    }
    .logout-btn {
        background: #222;
        color: #fff;
        border: none;
        border-radius: 12px;
        padding: 10px 32px;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        transition: background 0.2s, transform 0.15s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .logout-btn:hover {
        background: #111;
        transform: translateY(-2px) scale(1.04);
    }
    @media (max-width: 1100px) {
        .main-header { flex-direction: column; align-items: flex-start; gap: 18px; }
        .main-menu { margin-left: 0; gap: 18px; }
    }
    main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Center content vertically */
        padding: 40px;
        background-color: #E6F0E6; /* Light green background */
        background-image: url('https://via.placeholder.com/1500x500?text=Forest+Path+Background'); /* Background image */
        background-size: cover;
        background-position: center;
        color: #fff;
        text-align: center;
        position: relative;
        min-height: calc(100vh - 80px); /* Adjust based on header/footer height */
    }

    main::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(230, 240, 230, 0.7); /* Slightly transparent overlay */
        z-index: 1;
    }

    .content-card {
        background-color: #fff;
        color: #333;
        border-radius: 15px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        padding: 50px;
        width: 80%;
        max-width: 600px;
        text-align: center;
        z-index: 2;
    }

    .sad-face {
        font-size: 100px;
        color: #4CAF50;
        margin-bottom: 20px;
    }

    .message h2 {
        font-size: 28px;
        color: #4CAF50;
        margin-bottom: 15px;
    }

    .message h3 {
        font-size: 20px;
        color:rgb(0, 0, 0);
        margin-bottom: 15px;
    }

    .upgrade-link {
        font-size: 18px;
        color: #1976D2;
        text-decoration: underline;
        cursor: pointer;
        margin-bottom: 30px;
        display: block; /* Make it a block element for margin */
    }

    .upgrade-button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 15px 30px;
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .upgrade-button:hover {
        background-color: #388E3C;
    }

    footer {
        background-color: #333;
        color: #fff;
        padding: 40px;
        text-align: center;
    }

    .footer-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: left;
        margin-bottom: 30px;
    }

    .footer-column {
        flex: 1;
        min-width: 200px;
        margin: 15px;
    }

    .footer-column h3 {
        font-size: 20px;
        margin-bottom: 15px;
        color: #4CAF50;
    }

    .footer-column p,
    .footer-column ul {
        font-size: 14px;
        color: #ccc;
        line-height: 1.6;
    }

    .footer-column ul {
        list-style: none;
        padding: 0;
    }

    .footer-column ul li {
        margin-bottom: 8px;
    }

    .footer-column ul li a {
        color: #ccc;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-column ul li a:hover {
        color: #4CAF50;
    }

    .newsletter-input {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin-bottom: 10px;
        background-color: #555;
        color: #fff;
    }

    .newsletter-button {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        width: 100%;
    }

    .newsletter-button:hover {
        background-color: #388E3C;
    }

    .newsletter-text {
        font-size: 12px;
        color: #ccc;
        margin-top: 10px;
    }

    .footer-bottom {
        border-top: 1px solid #555;
        padding-top: 20px;
        margin-top: 30px;
        font-size: 14px;
        color: #ccc;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
        main {
            padding: 20px;
        }

        .content-card {
            width: 95%;
            padding: 30px;
        }

        .sad-face {
            font-size: 80px;
        }

        .message h2 {
            font-size: 24px;
        }

        .upgrade-link {
            font-size: 16px;
        }

        .upgrade-button {
            font-size: 18px;
            padding: 12px 25px;
        }

        .footer-content {
            flex-direction: column;
            align-items: center;
        }

        .footer-column {
            width: 90%;
            text-align: center;
            margin: 10px 0;
        }

        .footer-column ul {
            padding-left: 0;
        }
    }

    @media (max-width: 480px) {
        .logo-section {
            flex-direction: column;
            gap: 5px;
        }

        .logo {
            font-size: 20px;
        }

        .nicoff-title {
            font-size: 20px;
        }

        .nicoff-slogan {
            font-size: 12px;
        }

        .member-btn {
            font-size: 14px;
            padding: 8px 15px;
        }

        main {
            padding: 15px;
        }

        .content-card {
            padding: 20px;
        }

        .sad-face {
            font-size: 60px;
        }

        .message h2 {
            font-size: 20px;
        }

        .upgrade-link {
            font-size: 14px;
        }

        .upgrade-button {
            font-size: 16px;
            padding: 10px 20px;
        }

        footer {
            padding: 20px;
        }

        .footer-column h3 {
            font-size: 18px;
        }

        .footer-column p,
        .footer-column ul {
            font-size: 12px;
        }

        .newsletter-input {
            padding: 8px;
        }

        .newsletter-button {
            padding: 8px 15px;
            font-size: 12px;
        }

        .newsletter-text {
            font-size: 10px;
        }

        .footer-bottom {
            font-size: 12px;
        }
    }
    `;
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const menuItems = [
        { label: 'Home', href: '#' },
        { label: 'Dashboard', href: '#' },
        { label: 'Achievement', href: '#' },
        { label: 'Coach', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Feedback', href: '#' },
    ];
    const handleUpgrade = () => {
        window.location.href = "/upgradepackage1";
    };
    return (
        <div>
            <style>{styles}</style>
            <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} onSave={() => setShowEditProfile(false)} />
            <div className="main-header">
                <div className="header-left">
                    <button className="member-btn" onClick={() => setShowEditProfile(true)}>
                        <span className="user-icon">&#128100;</span> Standard Member
                    </button>
                    <div className="logo-section">
                        <span className="logo">LOGO</span>
                        <span className="nicoff-title">NicOff</span>
                        <span className="nicoff-slogan">Turn Off Nicotine, Turn On Life!</span>
                    </div>
                </div>
                <div className="main-menu">
                    {menuItems.map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`main-menu-item${activeMenu === item.label ? ' active' : ''}`}
                            onClick={() => setActiveMenu(item.label)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
                <div className="header-right">
                    <span className="bell-icon">&#128276;</span>
                    <button className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
            <main>
                <div className="content-card">
                    <div className="sad-face">:(</div>
                    <div className="message">
                        <h2>We're sorry, but this feature is not available for your account!</h2>
                    </div>
                    <div className="message">
                        <h3>Upgrade your account to unlock this feature!</h3>
                    </div>
                    <button className="upgrade-button" onClick={handleUpgrade}>Upgrade</button>
                </div>
            </main>
            <footer>
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>NicOff</h3>
                        <p>We're dedicated to helping you break free from smoking addiction through science-backed methods and community support</p>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Programs</a></li>
                            <li><a href="#">Success Stories</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Term Of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>NewsLetter</h3>
                        <input type="email" placeholder="Your Email Address..." className="newsletter-input" />
                        <button className="newsletter-button">Subscribe</button>
                        <p className="newsletter-text">Get the latest tips and motivation to stay smoke-free delivered to your inbox</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    © 2025 NicOff. All rights reserved
                </div>
            </footer>
        </div>
    );
}

export default StandardMember_Coach; 