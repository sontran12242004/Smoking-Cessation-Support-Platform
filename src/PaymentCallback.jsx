import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ApiService from './apiService';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [paymentInfo, setPaymentInfo] = useState({});
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentApiStatus, setPaymentApiStatus] = useState(null); // 'calling', 'success', 'failed'

  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        // Handle special URL format with multiple ? characters
        // URL format: /?packageID=3?paymentID=11&vnp_Amount=3999000...
        const currentUrl = window.location.href;
        
        // Parse parameters manually to handle the unusual format
        let packageID = null;
        let paymentID = null;
        
        // Extract packageID and paymentID from the unusual format
        const packageMatch = currentUrl.match(/packageID=(\d+)/);
        const paymentMatch = currentUrl.match(/paymentID=(\d+)/);
        
        if (packageMatch) packageID = packageMatch[1];
        if (paymentMatch) paymentID = paymentMatch[1];
        
        // Extract VNPay parameters using searchParams (these should work normally)
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
        const vnp_Amount = searchParams.get('vnp_Amount');
        const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
        const vnp_PayDate = searchParams.get('vnp_PayDate');
        const vnp_TxnRef = searchParams.get('vnp_TxnRef');
        const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
        const vnp_BankCode = searchParams.get('vnp_BankCode');

        // Store payment info
        const paymentData = {
          responseCode: vnp_ResponseCode,
          transactionStatus: vnp_TransactionStatus,
          amount: vnp_Amount ? (parseInt(vnp_Amount) / 100) : 0, // VNPay amount is in VND * 100
          orderInfo: vnp_OrderInfo,
          payDate: vnp_PayDate,
          txnRef: vnp_TxnRef,
          transactionNo: vnp_TransactionNo,
          bankCode: vnp_BankCode,
          packageID: packageID,
          paymentID: paymentID
        };

        setPaymentInfo(paymentData);

        // Determine payment status
        if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
          setPaymentStatus('success');
          
          // Call payment API after successful payment
          if (packageID && paymentID) {
            try {
              setPaymentApiStatus('calling');
              const paymentApiData = {
                paymentId: parseInt(paymentID),
                packageId: parseInt(packageID),
                paymentStatus: "CREATED"
              };
              
              console.log('Calling payment API with data:', paymentApiData);
              const paymentResult = await ApiService.createPayment(paymentApiData);
              console.log('Payment API response:', paymentResult);
              setPaymentApiStatus('success');
            } catch (paymentError) {
              console.error('Error calling payment API:', paymentError);
              setPaymentApiStatus('failed');
              // Don't change the payment status if this fails, as the main payment was successful
            }
          }
        } else {
          setPaymentStatus('failed');
        }

        // Try to get package information
        if (packageID) {
          try {
            const packages = await ApiService.getMembershipPlans();
            const selectedPackage = packages.find(pkg => pkg.planID.toString() === packageID);
            setPackageInfo(selectedPackage);
          } catch (error) {
            console.error('Error fetching package info:', error);
          }
        }

      } catch (error) {
        console.error('Error processing payment callback:', error);
        setPaymentStatus('error');
      } finally {
        setLoading(false);
      }
    };

    processPaymentCallback();
  }, [searchParams]);

  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 14) return 'N/A';
    
    // Format: YYYYMMDDHHmmss
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);
    
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleContinue = () => {
    if (paymentStatus === 'success') {
      // Redirect to appropriate dashboard based on package
      if (packageInfo && packageInfo.price > 0) {
        navigate('/elite/home');
      } else {
        navigate('/standard/home');
      }
    } else {
      // Redirect back to package selection
      navigate('/package');
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'error':
        return '⚠️';
      default:
        return '⏳';
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      case 'error':
        return 'Payment Error';
      default:
        return 'Processing Payment...';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'success':
        return '#4CAF50';
      case 'failed':
        return '#f44336';
      case 'error':
        return '#ff9800';
      default:
        return '#2196F3';
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#DFF5DE',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      textAlign: 'center'
    },
    header: {
      marginBottom: '30px'
    },
    statusIcon: {
      fontSize: '64px',
      marginBottom: '16px'
    },
    statusMessage: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: getStatusColor(),
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '30px'
    },
    infoSection: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '30px',
      textAlign: 'left'
    },
    infoTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px',
      textAlign: 'center'
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid #e0e0e0'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#666',
      fontWeight: '500'
    },
    infoValue: {
      fontSize: '14px',
      color: '#333',
      fontWeight: '600'
    },
    button: {
      backgroundColor: getStatusColor(),
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 32px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '20px'
    },
    backButton: {
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 24px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginLeft: '12px'
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid getStatusColor()',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <h2>Processing payment information...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.statusIcon}>{getStatusIcon()}</div>
          <h1 style={styles.statusMessage}>{getStatusMessage()}</h1>
          {paymentStatus === 'success' && (
            <div>
              <p style={styles.subtitle}>
                Thank you for your purchase! Your subscription has been activated.
              </p>
              {paymentApiStatus === 'calling' && (
                <p style={{ ...styles.subtitle, color: '#2196F3', fontSize: '14px' }}>
                  🔄 Processing subscription details...
                </p>
              )}
              {paymentApiStatus === 'success' && (
                <p style={{ ...styles.subtitle, color: '#4CAF50', fontSize: '14px' }}>
                  ✅ Subscription successfully registered!
                </p>
              )}
              {paymentApiStatus === 'failed' && (
                <p style={{ ...styles.subtitle, color: '#ff9800', fontSize: '14px' }}>
                  ⚠️ Payment successful, but subscription registration pending. Please contact support if needed.
                </p>
              )}
            </div>
          )}
          {paymentStatus === 'failed' && (
            <p style={styles.subtitle}>
              Your payment could not be processed. Please try again.
            </p>
          )}
          {paymentStatus === 'error' && (
            <p style={styles.subtitle}>
              There was an error processing your payment. Please contact support.
            </p>
          )}
        </div>

        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>Payment Details</h3>
          
          {packageInfo && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Package:</span>
              <span style={styles.infoValue}>{packageInfo.name}</span>
            </div>
          )}
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Amount:</span>
            <span style={styles.infoValue}>{formatAmount(paymentInfo.amount)}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Transaction ID:</span>
            <span style={styles.infoValue}>{paymentInfo.transactionNo || 'N/A'}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Payment Date:</span>
            <span style={styles.infoValue}>{formatDate(paymentInfo.payDate)}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Bank:</span>
            <span style={styles.infoValue}>{paymentInfo.bankCode || 'N/A'}</span>
          </div>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Reference:</span>
            <span style={styles.infoValue}>{paymentInfo.txnRef || 'N/A'}</span>
          </div>
          
          {paymentInfo.orderInfo && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Order Info:</span>
              <span style={styles.infoValue}>{decodeURIComponent(paymentInfo.orderInfo)}</span>
            </div>
          )}
          
          {paymentStatus === 'success' && paymentApiStatus && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Subscription Status:</span>
              <span style={styles.infoValue}>
                {paymentApiStatus === 'calling' && '🔄 Processing...'}
                {paymentApiStatus === 'success' && '✅ Registered'}
                {paymentApiStatus === 'failed' && '⚠️ Pending'}
              </span>
            </div>
          )}
        </div>

        <div>
          <button 
            style={{
              ...styles.button,
              opacity: paymentApiStatus === 'calling' ? 0.6 : 1,
              cursor: paymentApiStatus === 'calling' ? 'not-allowed' : 'pointer'
            }} 
            onClick={handleContinue}
            disabled={paymentApiStatus === 'calling'}
          >
            {paymentApiStatus === 'calling' ? 'Processing...' : 
             (paymentStatus === 'success' ? 'Continue to Dashboard' : 'Try Again')}
          </button>
          
          <button style={styles.backButton} onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback; 