package com.smokingcessation.dto;

import com.smokingcessation.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
    private String email;
    private String phone;
    private String fullName;
    private Role role;
    private String token;
}