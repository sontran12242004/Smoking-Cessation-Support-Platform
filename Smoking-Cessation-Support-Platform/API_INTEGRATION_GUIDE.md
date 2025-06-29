# API Integration Guide - Frontend

## Tổng quan
Hướng dẫn tích hợp API cho frontend của Smoking Cessation Support Platform.

## Cấu trúc API Service

### File: `apiService.js`
Service chính để quản lý tất cả API calls:

```javascript
import ApiService from '../apiService';

// Submit daily check-in
await ApiService.submitDailyCheckIn(userId, dailyProcessData);

// Get health metrics
const metrics = await ApiService.getHealthMetrics(userId);

// Get user profile
const profile = await ApiService.getUserProfile(userId);
```

## API Endpoints

### 1. Submit Daily Check-In
- **URL**: `POST /api/daily-process`
- **Body**:
```json
{
  "userId": 1,
  "smokedToday": false,
  "cigaretteStrength": 5,
  "feeling": "great",
  "cravingTrigger": "stress",
  "confidence": "confident",
  "checkInDate": "2025-01-31"
}
```

### 2. Get Health Metrics
- **URL**: `GET /api/health-metrics/{userId}`
- **Response**:
```json
{
  "daysSmokeFree": 15,
  "daysToNext": 5,
  "moneySaved": 150.00,
  "healthImproved": 75,
  "lungsCapacity": 85,
  "heartRate": 72
}
```

### 3. Get User Profile
- **URL**: `GET /api/users/{userId}`
- **Response**: User profile information

## Components đã được cập nhật

### 1. Daily Check-In Components
- **EliteDailyCheckIn.jsx**: Tích hợp API submit daily check-in
- **StandardMember/DailyCheckIn.jsx**: Tích hợp API submit daily check-in

**Tính năng mới:**
- Validation form trước khi submit
- Loading state khi đang submit
- Success/Error message display
- Auto navigation sau khi submit thành công

### 2. Dashboard Components
- **EliteDashboard.jsx**: Tích hợp API get health metrics
- **StandardMemberDashboard.jsx**: Tích hợp API get health metrics

**Tính năng mới:**
- Auto fetch health metrics khi component mount
- Loading state khi đang fetch data
- Error handling với fallback values
- Real-time health metrics display

## Cách sử dụng

### 1. Trong Daily Check-In Component
```javascript
import ApiService from '../apiService';

const handleSubmit = async () => {
  try {
    const dailyProcessData = {
      smokedToday: smokedToday === 'no' ? false : true,
      cigaretteStrength: cigaretteStrength,
      feeling: feeling,
      cravingTrigger: cravingTrigger,
      confidence: confidence,
      checkInDate: new Date().toISOString().split('T')[0]
    };

    await ApiService.submitDailyCheckIn(userId, dailyProcessData);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 2. Trong Dashboard Component
```javascript
import ApiService from '../apiService';

useEffect(() => {
  const fetchHealthMetrics = async () => {
    try {
      const metrics = await ApiService.getHealthMetrics(userId);
      setHealthMetrics(metrics);
    } catch (error) {
      // Handle error with fallback values
    }
  };

  fetchHealthMetrics();
}, [userId]);
```

## Cấu hình

### API Base URL
Mặc định: `http://localhost:8080/api`

Để thay đổi, cập nhật trong `apiService.js`:
```javascript
const API_BASE_URL = 'your-api-base-url';
```

### User ID
Hiện tại sử dụng mock user ID = 1. Trong production, cần:
1. Tích hợp với authentication system
2. Lấy user ID từ auth context/token
3. Thêm authentication headers

## Error Handling

### Network Errors
- API service tự động log errors
- Components hiển thị user-friendly error messages
- Fallback values cho dashboard metrics

### Validation Errors
- Form validation trước khi submit
- Clear error messages cho từng field
- Disable submit button khi có lỗi

## Testing

### Test API Calls
1. Đảm bảo backend server đang chạy
2. Kiểm tra network tab trong browser dev tools
3. Verify request/response format

### Test Error Scenarios
1. Disconnect network để test network errors
2. Submit invalid data để test validation
3. Test loading states

## Next Steps

### Authentication Integration
- [ ] Tích hợp JWT authentication
- [ ] Add auth headers to API calls
- [ ] Handle token refresh

### Real-time Updates
- [ ] WebSocket integration cho real-time metrics
- [ ] Auto-refresh dashboard data
- [ ] Push notifications

### Offline Support
- [ ] Service worker cho offline functionality
- [ ] Local storage cho cached data
- [ ] Sync khi online trở lại

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Đảm bảo backend có CORS configuration
   - Check API base URL

2. **Network Errors**
   - Verify backend server đang chạy
   - Check API endpoints

3. **Data Format Issues**
   - Verify request/response format
   - Check date format (YYYY-MM-DD)

### Debug Tips
- Use browser dev tools Network tab
- Check console logs
- Verify API responses
- Test with Postman/curl 