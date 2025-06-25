package com.smokingcessation.config;

import com.smokingcessation.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    Filter filter;

    @Autowired
    AuthenticationService authenticationService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors() //  Kích hoạt CORS
                .and()
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req -> req
                                // Các endpoints công khai, không cần xác thực
                                .requestMatchers("/api/auth/**", "/api/public/**", "/swagger-ui/**", "/v3/api-docs/**").permitAll()

                                // ===== ADMIN PERMISSIONS =====
                                // Các endpoints chỉ dành cho ADMIN
                                .requestMatchers("/api/admins/**").hasRole("ADMIN")

                                // Endpoints quản lý membership plans - chỉ ADMIN mới có quyền tạo, sửa, xóa
                                .requestMatchers(HttpMethod.POST, "/api/membership-plans/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/membership-plans/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/membership-plans/**").hasRole("ADMIN")

                                // Endpoints quản lý coaches - chỉ ADMIN mới có quyền thêm, sửa, xóa
                                .requestMatchers(HttpMethod.POST, "/api/coach/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/coach/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/coach/**").hasRole("ADMIN")

                                // Endpoints xem báo cáo - chỉ ADMIN mới có quyền xem
                                .requestMatchers("/api/reports/**").hasRole("ADMIN")

                                // Endpoints quản lý người dùng - chỉ ADMIN mới có quyền
                                .requestMatchers(HttpMethod.GET, "/api/members/**").hasAnyRole("ADMIN", "Coach")
                                .requestMatchers(HttpMethod.POST, "/api/members/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/members/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")

                                // ===== MEMBERS PERMISSIONS =====
                                // Endpoints cho tính năng chỉ có MEMBERS đã đăng ký mới được dùng
                                .requestMatchers("/api/features/**").hasAnyAuthority("PERMISSION_ACCESS_FEATURES")
                                .requestMatchers("/api/daily-process/**").hasAnyAuthority("PERMISSION_ACCESS_FEATURES")
                                .requestMatchers("/api/health-metrics/**").hasAnyAuthority("PERMISSION_ACCESS_FEATURES")
                                .requestMatchers("/api/appointment/book/**").hasAnyAuthority("PERMISSION_ACCESS_FEATURES")
                                .requestMatchers("/api/members/profile/**").hasAnyAuthority("PERMISSION_MANAGE_PROFILE")

                                // ===== COACH PERMISSIONS =====
                                // Endpoints cho coach xem thông tin members và quản lý lịch hẹn
                                .requestMatchers("/api/coach/members/**").hasAnyAuthority("PERMISSION_VIEW_MEMBERS")
                                .requestMatchers("/api/coach/appointments/**").hasAnyAuthority("PERMISSION_MANAGE_APPOINTMENTS")
                                .requestMatchers("/api/coach/profile/**").hasAnyAuthority("PERMISSION_MANAGE_PROFILE")

                                // Mọi request khác cần phải xác thực (đăng nhập)
                                .anyRequest().authenticated()
                )
                .userDetailsService(authenticationService)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); //  Cho phép gửi cookies/token từ FE

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
