package com.smokingcessation.service;

import com.smokingcessation.repository.AuthReponsitory;
import com.smokingcessation.model.LoginRequest;
import com.smokingcessation.model.RegisterRequest;
import com.smokingcessation.dto.Users;
import com.smokingcessation.repository.UserRepository;
import com.smokingcessation.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service

public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email này đã tồn tại trong hệ thống");
        }

        Users users = new Users();
        users.setName(request.getName());
        users.setEmail(request.getEmail());
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        users.setRole("MEMBER");
        users.setCreateAt(LocalDate.now());

        userRepository.save(users);
    }

    public AuthReponsitory login(LoginRequest request) {
        Users users = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(request.getPassword(), users.getPassword())) {
            throw new RuntimeException("Password is incorrect");
        }

        // Check role Users
        if (!users.getRole().equals("ADMIN") && !users.getRole().equals("MEMBER")) {
            throw new RuntimeException("Invalid user role");
        }

        String token = jwtUtil.generateToken(users);
        return new AuthReponsitory(token, users.getRole(), users.getName());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
