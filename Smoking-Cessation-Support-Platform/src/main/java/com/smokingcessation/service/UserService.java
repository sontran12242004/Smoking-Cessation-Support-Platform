package com.smokingcessation.service;

import com.smokingcessation.entity.AuthResponse;
import com.smokingcessation.entity.LoginRequest;
import com.smokingcessation.entity.RegisterRequest;
import com.smokingcessation.entity.Users;
import com.smokingcessation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;

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
            throw new RuntimeException("Email already exists");
        }

        Users users = new Users();
        users.setName(request.getName());
        users.setEmail(request.getEmail());
        users.setPassword(passwordEncoder.encode(request.getPassword()));
        users.setRole("MEMBER");
        users.setCreateAt(date.now());

        userRepository.save(users);
    }

    public AuthResponse login(LoginRequest request) {
        Users users = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(request.getPassword(), users.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(users);
        return new AuthResponse(token, users.getRole(), users.getName());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Component
    public class JwtUtil {
        private final String jwtSecret = "secret";
        private final long expiration = 86400000;

        public String generateToken(Users user) {
            return Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("role", user.getRole())
                    .claim("name", user.getName())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
        }
    }

}
