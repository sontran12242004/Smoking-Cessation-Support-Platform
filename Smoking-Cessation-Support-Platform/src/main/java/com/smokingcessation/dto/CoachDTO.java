package com.smokingcessation.dto;

import java.time.LocalDateTime;

public class CoachDTO {
    private Long coachID;            // Mã định danh duy nhất cho thành viên
    private String name;              // Họ tên thành viên
    private String email;             // Email duy nhất, dùng để đăng nhập
    private String phone;             // Số điện thoại
    private String password;          // Mật khẩu (đã hash)
    private LocalDateTime createdAt;   // Thời gian tạo tài khoản
}
