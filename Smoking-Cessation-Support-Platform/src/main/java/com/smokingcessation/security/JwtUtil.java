//package com.smokingcessation.security;
//
//import com.smokingcessation.entity.Users;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Component;
//
//import java.security.Key;
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//    private final long expiration = 86400000L; // 24 hours in milliseconds
//
//    public String generateToken(Users user) {
//        return Jwts.builder()
//                .setSubject(user.getEmail())
//                .claim("role", user.getRole())
//                .claim("name", user.getName())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expiration))
//                .signWith(key)
//                .compact();
//    }
//}
