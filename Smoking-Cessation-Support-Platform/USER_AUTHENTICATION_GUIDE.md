# User Authentication & Personalization Guide

## Tổng quan
Hệ thống user authentication và personalization đã được cập nhật để hiển thị tên thực của user thay vì tên cứng "John" hoặc "jason".

## Các file đã được cập nhật

### 1. UserContext.jsx
- **Chức năng**: Quản lý thông tin user toàn cục
- **Tính năng**:
  - Lưu trữ thông tin user trong localStorage
  - Cung cấp hàm `getUserName()` để lấy tên user
  - Tự động load user data khi app khởi động
  - Xử lý logout và clear data

### 2. apiService.js
- **Chức năng**: Centralized API service
- **Tính năng**:
  - Quản lý tất cả API calls
  - Tự động thêm authentication headers
  - Xử lý lỗi 401 (unauthorized)
  - Interceptors cho request/response

### 3. Login.jsx
- **Cập nhật**: Sử dụng UserContext và ApiService
- **Tính năng mới**:
  - Lưu thông tin user khi đăng nhập thành công
  - Sử dụng ApiService thay vì axios trực tiếp

### 4. EliteDashboard.jsx
- **Cập nhật**: Hiển thị tên thực của user
- **Tính năng mới**:
  - Sử dụng UserWelcome component
  - Logout với clear data
  - Sử dụng ApiService cho health metrics

### 5. EliteHome.jsx
- **Cập nhật**: Hiển thị tên thực của user
- **Tính năng mới**:
  - Sử dụng UserWelcome component
  - Logout với clear data

### 6. UserWelcome.jsx
- **Chức năng**: Component tái sử dụng để hiển thị welcome message
- **Tính năng**:
  - Tự động lấy tên user từ context
  - Có thể tùy chỉnh emoji
  - Responsive design

## Cách sử dụng

### 1. Trong component mới
```javascript
import { useUser } from '../UserContext';
import UserWelcome from '../components/UserWelcome';

function MyComponent() {
  const { getUserName, logout } = useUser();
  
  return (
    <div>
      <h1><UserWelcome /></h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. Lấy thông tin user
```javascript
const { user, getUserName, isAuthenticated } = useUser();

// Lấy tên đầy đủ
const fullName = getUserName();

// Kiểm tra đã đăng nhập chưa
if (isAuthenticated) {
  // User đã đăng nhập
}
```

### 3. Sử dụng API Service
```javascript
import ApiService from '../apiService';

// Lấy health metrics
const metrics = await ApiService.getHealthMetrics(userId);

// Update user profile
const updatedUser = await ApiService.updateUserProfile(userId, profileData);
```

## Cấu trúc User Data

Backend API cần trả về user data với cấu trúc:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": "MEMBERS",
  "username": "johndoe"
}
```

### Fallback Logic cho tên user:
1. `firstName + lastName` (nếu có cả hai)
2. `firstName` (nếu chỉ có firstName)
3. `name` (nếu có field name)
4. `fullName` (nếu có field fullName)
5. `email.split('@')[0]` (lấy phần trước @ của email)
6. `username` (nếu có username)
7. "User" (fallback cuối cùng)

## Các trang cần cập nhật tiếp theo

### Elite Member Pages:
- [ ] EliteAchievement.jsx
- [ ] EliteCoach.jsx
- [ ] EliteCommunity.jsx
- [ ] EliteFeedback.jsx
- [ ] EliteNotificationsCenter.jsx
- [ ] EliteEditProfile.jsx
- [ ] EliteViewSubscription.jsx

### Standard Member Pages:
- [ ] StandardMemberHome.jsx
- [ ] StandardMemberDashboard.jsx
- [ ] StandardAchievement.jsx
- [ ] StandardMember_Coach.jsx
- [ ] StandardMember_Commun.jsx
- [ ] Feedback.jsx
- [ ] NotificationCenter.jsx
- [ ] StandardEditProfile.jsx

### Coach Pages:
- [ ] CoachDashboard.jsx
- [ ] CoachProfile.jsx
- [ ] RequestSchedule.jsx
- [ ] CoachEditProfile.jsx

## Cách cập nhật trang mới

### Bước 1: Import UserContext và UserWelcome
```javascript
import { useUser } from '../UserContext';
import UserWelcome from '../components/UserWelcome';
```

### Bước 2: Sử dụng trong component
```javascript
const { logout } = useUser();

const handleLogout = () => {
  logout();
  navigate('/login');
};
```

### Bước 3: Thay thế welcome message
```javascript
// Thay vì:
<h2>Welcome back, <span className="welcome-name">John!</span> 👋</h2>

// Sử dụng:
<h2><UserWelcome /></h2>
```

### Bước 4: Cập nhật logout button
```javascript
// Thay vì:
<button onClick={() => navigate('/login')}>Logout</button>

// Sử dụng:
<button onClick={handleLogout}>Logout</button>
```

## Testing

### Test Cases:
1. **Login với user có firstName + lastName**
2. **Login với user chỉ có firstName**
3. **Login với user có email**
4. **Logout và kiểm tra data được clear**
5. **Refresh page và kiểm tra user data được restore**
6. **Test với user không có thông tin tên**

### Test Data:
```javascript
// Test case 1: Full name
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
// Expected: "John Doe"

// Test case 2: Only firstName
{
  "firstName": "John",
  "email": "john.doe@example.com"
}
// Expected: "John"

// Test case 3: Only email
{
  "email": "john.doe@example.com"
}
// Expected: "john.doe"
```

## Troubleshooting

### Lỗi thường gặp:
1. **"useUser must be used within a UserProvider"**
   - Đảm bảo App.jsx đã wrap với UserProvider

2. **User name không hiển thị**
   - Kiểm tra localStorage có user data không
   - Kiểm tra API response có đúng format không

3. **Logout không hoạt động**
   - Đảm bảo đã import và sử dụng hàm logout từ useUser

### Debug:
```javascript
// Kiểm tra user data trong localStorage
console.log(localStorage.getItem('user'));

// Kiểm tra user context
const { user, getUserName } = useUser();
console.log('User:', user);
console.log('User name:', getUserName());
``` 