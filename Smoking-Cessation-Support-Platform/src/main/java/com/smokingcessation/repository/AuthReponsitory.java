package com.smokingcessation.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthReponsitory {
    private Long userId;
    private String name;
    private String role;
}
