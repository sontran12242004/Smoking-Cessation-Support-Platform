package com.smokingcessation.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthReponsitory {
    private String token;
    private String role;
    private String name;
}
