package com.smokingcessation.dto;

import com.smokingcessation.enums.Role;
import lombok.Data;

@Data
public class AccountDTO {
    public String email;
    public String phone;
    public String fullName;
    public Role role;
    public String token;
}
