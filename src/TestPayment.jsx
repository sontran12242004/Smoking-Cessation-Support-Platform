import React from 'react';
import { useSearchParams } from 'react-router-dom';

const TestPayment = () => {
  const [searchParams] = useSearchParams();
  const currentUrl = window.location.href;

  // Test URL parsing
  const packageMatch = currentUrl.match(/packageID=(\d+)/);
  const paymentMatch = currentUrl.match(/paymentID=(\d+)/);
  
  const packageID = packageMatch ? packageMatch[1] : null;
  const paymentID = paymentMatch ? paymentMatch[1] : null;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Payment URL Test</h1>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Current URL:</h3>
        <code style={{ wordBreak: 'break-all' }}>{currentUrl}</code>
      </div>

      <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Parsed Parameters:</h3>
        <ul>
          <li><strong>Package ID:</strong> {packageID || 'Not found'}</li>
          <li><strong>Payment ID:</strong> {paymentID || 'Not found'}</li>
          <li><strong>VNP Response Code:</strong> {searchParams.get('vnp_ResponseCode') || 'Not found'}</li>
          <li><strong>VNP Transaction Status:</strong> {searchParams.get('vnp_TransactionStatus') || 'Not found'}</li>
          <li><strong>VNP Amount:</strong> {searchParams.get('vnp_Amount') || 'Not found'}</li>
          <li><strong>VNP Pay Date:</strong> {searchParams.get('vnp_PayDate') || 'Not found'}</li>
          <li><strong>VNP Transaction No:</strong> {searchParams.get('vnp_TransactionNo') || 'Not found'}</li>
          <li><strong>VNP Bank Code:</strong> {searchParams.get('vnp_BankCode') || 'Not found'}</li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
        <h3>All Search Params:</h3>
        <ul>
          {Array.from(searchParams.entries()).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Test URLs:</h3>
        <p>Try these URLs to test:</p>
        <ul>
          <li>
            <code>/?packageID=3?paymentID=11&vnp_ResponseCode=00&vnp_TransactionStatus=00&vnp_Amount=3999000</code>
          </li>
          <li>
            <code>/test-payment?packageID=3&paymentID=11&vnp_ResponseCode=00&vnp_TransactionStatus=00&vnp_Amount=3999000</code>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestPayment; 