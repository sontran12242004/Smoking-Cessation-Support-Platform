package com.smokingcessation.config;

import com.smokingcessation.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

import java.util.Arrays;

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
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(
                        req -> req
                                // PUBLIC endpoints - không cần authentication
                                .requestMatchers(
                                        // Swagger UI
                                        "/swagger-ui/**",
                                        "/swagger-ui.html",
                                        "/v3/api-docs/**",
                                        "/swagger-resources/**",
                                        "/webjars/**",

                                        // Authentication (chỉ register, login, forgot-password)
                                        "/api/register",
                                        "/api/login",
                                        "/api/forgot-password",

                                        // Public data - membership plans (basic endpoints only)
                                        "/api/membership-plans",
                                        "/api/membership-plans/{id:[0-9]+}",
                                        "/api/health-metrics/**",
                                        "/api/medicineService",
                                        "/api/medicineService/*",
                                        "/api/quit-plans",
                                        "/api/members/*/edit-profile",
                                        "/api/members/*/available-plans",
                                        "/member/{memberId}/submit",

                                        // Appointment endpoints (nếu muốn public)
                                        "/api/appointment/api/members/appoiment/",
                                        "/api/appointment/upcoming/coach/*",

                                        // Coach endpoints - public access
                                        "/api/coaches",
                                        "/api/coaches/**"
                                ).permitAll()

                                // Tất cả endpoints khác cần authentication
                                .anyRequest().authenticated()
                )
                .userDetailsService(authenticationService)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Cho phép tất cả origins - trong production nên chỉ định cụ thể
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));

        // Cho phép các HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Cho phép tất cả headers
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Cho phép credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);

        // Expose headers cho frontend có thể đọc
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));

        // Áp dụng cho tất cả endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
