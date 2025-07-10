package com.smokingcessation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.smokingcessation.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
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
    private Integer cigarettesPer;
    @JsonProperty("registrationDate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;   // Thời gian tạo tài khoản - map thành registrationDate
    // Thông tin bổ sung cho admin member list
    @JsonProperty("id")
    private String id;                // ID cho admin list
    @JsonProperty("username")
    private String username;          // Username cho admin list
    @JsonProperty("package")
    private String packageType;       // Loại gói subscription
    @JsonProperty("status")
    private String status;            // Trạng thái tài khoản
    @JsonProperty("role")
    private Role role;                // Role của member
    // Thông tin bổ sung cho member edit profile
    @JsonProperty("firstname")
    private String firstname;         // Tên cho edit profile
    @JsonProperty("lastname")
    private String lastname;          // Họ cho edit profile
    @JsonProperty("quitDate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate quitDate;       // Ngày bỏ thuốc
    @JsonProperty("formerDailyUsage")
    private Integer formerDailyUsage; // Số điếu thuốc hút mỗi ngày trước đây
    @JsonProperty("primaryMotivation")
    private String primaryMotivation; // Động lực chính
    @JsonProperty("address")
    private String address;           // Địa chỉ
    @JsonProperty("gender")
    private String gender;            // Giới tính
    @JsonProperty("dateOfBirth")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;    // Ngày sinh
}
