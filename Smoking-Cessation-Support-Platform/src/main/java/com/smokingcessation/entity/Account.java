package com.smokingcessation.entity;

import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Email(message = "Email not valid!!")
    public String email;

    @NotBlank(message = "Name can not blank!!")
    public String name;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid!")
    public String phone;

    @NotBlank(message = "Password can not blank!!")
    @Size(min = 6, message = "Password must be at least 6 characters!")
    public String password;

    @Enumerated(EnumType.STRING)
    public Role role;
}
