import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RatingsFeedbacksManagement = () => {
    const [activeMenu, setActiveMenu] = useState('Ratings, Feedbacks');
    const [selectedRatingFilter, setSelectedRatingFilter] = useState('All Ratings');
    const [selectedSortFilter, setSelectedSortFilter] = useState('Newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbacksPerPage] = useState(5);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [feedbacks, setFeedbacks] = useState([
        {
            member: 'Ho Minh Quan',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'The personal training sessions have been amazing! My coach is very knowledgeable and pushes me to achieve my smoke-free goals. I\'ve seen significant improvements in just a few weeks.',
            date: '2025-05-26'
        },
        {
            member: 'Tran Dinh Son',
            rating: '⭐⭐⭐☆☆',
            feedback: 'Good environment but the coach is good but could be better, the community is friendly.',
            date: '2025-05-12'
        },
        {
            member: 'Duong Thanh Viet Anh',
            rating: '⭐⭐⭐☆☆',
            feedback: 'Community so funny, enthusiastic in helping each other to quit smoking.',
            date: '2025-05-21'
        },
        {
            member: 'Vo Dong Dang Khoa',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'I was able to quit smoking after that, thanks to this platform.',
            date: '2025-03-30'
        },
        {
            member: 'Tran Le Khoi Nguyen',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'Coach guides enthusiastically, good environment and good support. Highly recommended.',
            date: '2025-01-21'
        },
        {
            member: 'Le Thi My Linh',
            rating: '⭐⭐⭐⭐☆',
            feedback: 'Very helpful resources, but sometimes the app glitches.',
            date: '2025-02-15'
        },
        {
            member: 'Nguyen Van A',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'This platform changed my life! The support groups are amazing.',
            date: '2024-12-01'
        },
        {
            member: 'Pham Thanh B',
            rating: '⭐⭐☆☆☆',
            feedback: 'Not very satisfied. The coach was not responsive.',
            date: '2024-11-20'
        },
        {
            member: 'Hoang Duc C',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'Excellent content and motivation. I feel much healthier now.',
            date: '2024-10-05'
        },
        {
            member: 'Tran Thu D',
            rating: '⭐⭐⭐☆☆',
            feedback: 'It\'s okay, but I expected more personalized guidance.',
            date: '2024-09-10'
        },
        {
            member: 'Nguyen Thi E',
            rating: '⭐⭐⭐⭐☆',
            feedback: 'The daily check-ins kept me accountable. Good app!',
            date: '2024-08-22'
        },
        {
            member: 'Vo Van F',
            rating: '⭐⭐☆☆☆',
            feedback: 'The program is too rigid for my lifestyle.',
            date: '2024-07-18'
        },
        {
            member: 'Le Duc G',
            rating: '⭐⭐⭐⭐⭐',
            feedback: 'Truly grateful for this platform. It made quitting smoking possible.',
            date: '2024-06-03'
        },
        {
            member: 'Phan Thi H',
            rating: '⭐⭐⭐☆☆',
            feedback: 'Some features are buggy, but overall decent.',
            date: '2024-05-14'
        },
        {
            member: 'Dinh Cong I',
            rating: '⭐⭐⭐⭐☆',
            feedback: 'The community forum is very active and supportive.',
            date: '2024-04-29'
        }
    ]);
    const [showContentsDropdown, setShowContentsDropdown] = useState(false);

    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

    const getPaginationNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Max 5 page numbers (e.g., 1, 2, 3, ..., 10)

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                // Show 1, 2, 3, ..., lastPage
                for (let i = 1; i <= 3; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage > totalPages - 3) {
                // Show 1, ..., lastPage-2, lastPage-1, lastPage
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                // Show 1, ..., currentPage-1, currentPage, currentPage+1, ..., lastPage
                pageNumbers.push(1);
                pageNumbers.push('...');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    const handleDelete = (memberName) => {
        if (window.confirm(`Are you sure you want to delete the feedback from ${memberName}?`)) {
            setFeedbacks(feedbacks.filter(feedback => feedback.member !== memberName));
            if (currentFeedbacks.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    const handleView = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleBackToList = () => {
        setSelectedFeedback(null);
    };

    const handleRatingFilterChange = (event) => {
        setSelectedRatingFilter(event.target.value);
        console.log('Selected rating filter:', event.target.value);
    };

    const handleSortFilterChange = (event) => {
        setSelectedSortFilter(event.target.value);
        console.log('Selected sort filter:', event.target.value);
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <h1 style={styles.sidebarTitle}>NicOff</h1>
                    <p style={styles.sidebarSubtitle}>Turn Off Nicotine, Turn On Life!</p>
                </div>

                <div style={styles.userSection}>
                    <p style={styles.userName}>Jason (Admin)</p>
                    <p style={styles.userRole}>Super Admin</p>
                </div>

                {/* Menu Sections */}
                <div style={styles.menuContainer}>
                    {/* MAIN Section */}
                    <div style={styles.menuSection}>
                        <h4 style={styles.sectionTitle}>MAIN</h4>
                        <ul style={styles.menuList}>
                            <Link to="/admin/dashboard" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Dashboard' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Dashboard')}
                                >
                                    Dashboard
                                </li>
                            </Link>
                            <Link to="/admin/analytics" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Analytics' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Analytics')}
                                >
                                    Analytics
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* MANAGEMENT Section */}
                    <div style={styles.menuSection}>
                        <h4 style={styles.sectionTitle}>MANAGEMENT</h4>
                        <ul style={styles.menuList}>
                            <Link to="/admin/members" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Members' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Members')}
                                >
                                    Members
                                </li>
                            </Link>
                            <Link to="/admin/packages" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Packages' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Packages')}
                                >
                                    Packages
                                </li>
                            </Link>
                            <li 
                                style={activeMenu.startsWith('Contents') ? styles.activeMenuItem : styles.menuItem} 
                                onClick={() => setShowContentsDropdown(!showContentsDropdown)}
                            >
                                Contents <span style={{ float: 'right' }}>{showContentsDropdown ? '▲' : '▼'}</span>
                            </li>
                            {showContentsDropdown && (
                                <ul style={{...styles.menuList, paddingLeft: '20px'}}>
                                    <Link to="/admin/contents/send-notification" style={styles.menuLink}>
                                        <li style={activeMenu === 'ContentsSendNotification' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendNotification')}>Send Notification To Members</li>
                                    </Link>
                                    <Link to="/admin/contents/send-motivation" style={styles.menuLink}>
                                        <li style={activeMenu === 'ContentsSendMotivation' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendMotivation')}>Send Motivation To Members</li>
                                    </Link>
                                    <Link to="/admin/contents/send-email" style={styles.menuLink}>
                                        <li style={activeMenu === 'ContentsSendEmail' ? styles.activeMenuItem : styles.menuItem} onClick={() => setActiveMenu('ContentsSendEmail')}>Send Email</li>
                                    </Link>
                                </ul>
                            )}
                            <Link to="/admin/coaches" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Coaches' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Coaches')}
                                >
                                    Coaches
                                </li>
                            </Link>
                            <Link to="/admin/ratings" style={styles.menuLink}>
                                <li 
                                    style={activeMenu === 'Ratings, Feedbacks' ? styles.activeMenuItem : styles.menuItem}
                                    onClick={() => setActiveMenu('Ratings, Feedbacks')}
                                >
                                    Ratings, Feedbacks
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={styles.mainContent}>
                <header style={styles.contentHeader}>
                    <h1 style={styles.contentTitle}>Ratings, Feedbacks Management</h1>
                </header>

                <div style={styles.contentBody}>
                    {selectedFeedback ? (
                        <div style={styles.feedbackDetailContainer}>
                            <h2 style={styles.feedbackDetailTitle}>Feedback Details</h2>
                            <div style={styles.detailCard}>
                                <h3 style={styles.detailMemberName}>{selectedFeedback.member}</h3>
                                <p style={styles.detailRating}>{selectedFeedback.rating}</p>
                                <p style={styles.detailDate}>{selectedFeedback.date}</p>
                                <p style={styles.detailFeedbackText}>{selectedFeedback.feedback}</p>
                                <button style={styles.backButton} onClick={handleBackToList}>Back to List</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={styles.filtersAndSort}>
                                <select 
                                    style={styles.dropdown}
                                    value={selectedRatingFilter}
                                    onChange={handleRatingFilterChange}
                                >
                                    <option value="All Ratings">All Ratings</option>
                                    <option value="5 Stars">5 Stars</option>
                                    <option value="4 Stars">4 Stars</option>
                                    <option value="3 Stars">3 Stars</option>
                                    <option value="2 Stars">2 Stars</option>
                                    <option value="1 Star">1 Star</option>
                                </select>
                                <select 
                                    style={styles.dropdown}
                                    value={selectedSortFilter}
                                    onChange={handleSortFilterChange}
                                >
                                    <option value="Newest">Sort by Newest</option>
                                    <option value="Oldest">Sort by Oldest</option>
                                    <option value="Highest Rating">Sort by Highest Rating</option>
                                    <option value="Lowest Rating">Sort by Lowest Rating</option>
                                </select>
                            </div>

                            <table style={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th style={styles.tableHeader}>Member</th>
                                        <th style={styles.tableHeader}>Rating</th>
                                        <th style={styles.tableHeader}>Feedback</th>
                                        <th style={styles.tableHeader}>Date</th>
                                        <th style={styles.tableHeader}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentFeedbacks.map((feedback, index) => (
                                        <tr key={index} style={styles.tableRow}>
                                            <td style={styles.tableCell}>{feedback.member}</td>
                                            <td style={styles.tableCell}>{feedback.rating}</td>
                                            <td style={styles.tableCell}>{feedback.feedback.substring(0, 50)}...</td>
                                            <td style={styles.tableCell}>{feedback.date}</td>
                                            <td style={styles.tableCell}>
                                                <button 
                                                    style={styles.viewButton} 
                                                    onClick={() => handleView(feedback)}
                                                >
                                                    View
                                                </button>
                                                <button 
                                                    style={styles.deleteButton} 
                                                    onClick={() => handleDelete(feedback.member)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div style={styles.pagination}>
                                <button 
                                    style={styles.paginationButton}
                                    disabled={currentPage === 1}
                                    onClick={() => paginate(currentPage - 1)}
                                >
                                    &lt;
                                </button>
                                {getPaginationNumbers().map((number, index) => (
                                    number === '...' ? (
                                        <span key={index} style={styles.paginationEllipsis}>...</span>
                                    ) : (
                                        <button 
                                            key={index}
                                            style={currentPage === number ? styles.activePaginationButton : styles.paginationButton}
                                            onClick={() => paginate(number)}
                                        >
                                            {number}
                                        </button>
                                    )
                                ))}
                                <button 
                                    style={styles.paginationButton}
                                    disabled={currentPage === totalPages}
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    &gt;
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#DFF5DE'
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#DFF5DE',
        padding: '25px',
        borderRight: '15px solid #fff'
    },
    sidebarHeader: {
        marginBottom: '30px'
    },
    sidebarTitle: {
        fontSize: '24px',
        color: '#2E7D32',
        margin: '0 0 5px 0',
        fontWeight: 'bold'
    },
    sidebarSubtitle: {
        fontSize: '14px',
        color: '#666',
        margin: '0',
        fontStyle: 'italic'
    },
    userSection: {
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    userName: {
        fontSize: '16px',
        color: '#333',
        margin: '0 0 5px 0',
        fontWeight: 'bold'
    },
    userRole: {
        fontSize: '14px',
        color: '#666',
        margin: '0'
    },
    menuContainer: {
        marginTop: '20px'
    },
    menuSection: {
        marginBottom: '25px'
    },
    sectionTitle: {
        fontSize: '12px',
        color: '#666',
        textTransform: 'uppercase',
        margin: '0 0 10px 0',
        letterSpacing: '1px',
        fontWeight: 'bold'
    },
    menuList: {
        listStyle: 'none',
        padding: '0',
        margin: '0'
    },
    menuItem: {
        padding: '10px 15px',
        color: '#555',
        cursor: 'pointer',
        borderRadius: '6px',
        marginBottom: '5px',
        transition: 'all 0.2s ease',
        ':hover': {
            backgroundColor: '#C8E6C9'
        }
    },
    activeMenuItem: {
        padding: '10px 15px',
        color: '#2E7D32',
        backgroundColor: '#A4E087',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '6px',
        marginBottom: '5px',
        transition: 'all 0.2s ease'
    },
    menuLink: {
        textDecoration: 'none',
        color: 'inherit'
    },
    menuIcon: {
        width: '20px',
        height: '20px',
        marginRight: '10px',
    },
    mainContent: {
        flex: 1,
        padding: '30px',
        backgroundColor: '#DFF5DE'
    },
    contentHeader: {
        margin: '0 0 30px 0',
        padding: '0'
    },
    contentTitle: {
        fontSize: '28px',
        color: '#2E7D32',
        margin: '0',
        fontWeight: 'bold'
    },
    contentBody: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
    },
    filtersAndSort: {
        display: 'flex',
        gap: '15px',
        marginBottom: '25px'
    },
    dropdown: {
        padding: '10px 15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '14px',
        color: '#555',
        backgroundColor: '#fff',
        cursor: 'pointer'
    },
    dataTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '25px'
    },
    tableHeader: {
        textAlign: 'left',
        padding: '15px',
        borderBottom: '1px solid #eee',
        backgroundColor: '#f8f8f8',
        color: '#666',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '13px'
    },
    tableRow: {
        ':hover': {
            backgroundColor: '#f9f9f9'
        }
    },
    tableCell: {
        padding: '15px',
        borderBottom: '1px solid #eee',
        fontSize: '14px',
        color: '#444'
    },
    viewButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#45a049'
        }
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#da190b'
        }
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px'
    },
    paginationButton: {
        padding: '8px 15px',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        color: '#666',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px'
    },
    activePaginationButton: {
        padding: '8px 12px',
        border: '1px solid #4d8b3c',
        backgroundColor: '#4d8b3c',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '14px'
    },
    paginationEllipsis: {
        color: '#666',
        fontSize: '14px'
    },
    activeMenuIndicator: {
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '5px',
        height: '20px',
        backgroundColor: '#4CAF50',
        borderRadius: '2.5px',
    },
    feedbackDetailContainer: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
    },
    feedbackDetailTitle: {
        fontSize: '24px',
        color: '#2E7D32',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee'
    },
    detailCard: {
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
    },
    detailMemberName: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#333'
    },
    detailRating: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#FFD700'
    },
    detailDate: {
        fontSize: '14px',
        color: '#777',
        marginBottom: '15px'
    },
    detailFeedbackText: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#444',
        marginBottom: '20px'
    },
    backButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#45a049'
        }
    }
};

export default RatingsFeedbacksManagement; 