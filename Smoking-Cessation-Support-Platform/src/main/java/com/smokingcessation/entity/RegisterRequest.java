package com.smokingcessation.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
}
