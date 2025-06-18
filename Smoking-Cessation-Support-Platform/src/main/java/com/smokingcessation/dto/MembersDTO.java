package com.smokingcessation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MembersDTO {
    // Thông tin cơ bản
    private Long memberID;            // Mã định danh duy nhất cho thành viên
    private String name;              // Họ tên thành viên
    private String email;             // Email duy nhất, dùng để đăng nhập
    private String phone;             // Số điện thoại
    private String password;          // Mật khẩu (đã hash)
    private LocalDateTime createdAt;   // Thời gian tạo tài khoản
}
