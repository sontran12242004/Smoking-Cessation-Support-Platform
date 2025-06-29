package com.smokingcessation.config;

import com.smokingcessation.entity.Account;
import com.smokingcessation.exception.exceptions.AuthenticationException;
import com.smokingcessation.service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.List;

@Component
public class Filter extends OncePerRequestFilter {

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Autowired
    TokenService tokenService;

    // Danh sách public endpoints không cần token
    private final List<String> PUBLIC_ENDPOINTS = List.of(
            // Swagger UI
            "/swagger-ui",
            "/swagger-ui.html",
            "/v3/api-docs",
            "/swagger-resources",
            "/webjars",
            
            // Authentication (chỉ register, login, forgot-password)
            "/api/register",
            "/api/login", 
            "/api/forgot-password",
            
            // Public data
            "/api/membership-plans",
            "/api/health-metrics",
            "/api/medicineService",
            "/api/{memberId}/edit-profile"
    );

    private boolean isPublicEndpoint(String uri) {
        AntPathMatcher matcher = new AntPathMatcher();
        return PUBLIC_ENDPOINTS.stream().anyMatch(pattern -> 
            matcher.match(pattern + "/**", uri) || matcher.match(pattern, uri)
        );
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String uri = request.getRequestURI();
        
        // Bỏ qua token validation cho public endpoints
        if (isPublicEndpoint(uri)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Xác thực token cho các endpoints khác
        String token = getToken(request);

        if(token == null){
            resolver.resolveException(request, response, null, new AuthenticationException("Empty token!"));
            return;
        }

        // Verify token
        Account account;
        try {
            account = tokenService.extractAccount(token);
        } catch (ExpiredJwtException expiredJwtException) {
            resolver.resolveException(request, response, null, new AuthenticationException("Expired Token!"));
            return;
        } catch (MalformedJwtException malformedJwtException) {
            resolver.resolveException(request, response, null, new AuthenticationException("Invalid Token!"));
            return;
        }

        // Token hợp lệ - set authentication context
        UsernamePasswordAuthenticationToken authToken = 
            new UsernamePasswordAuthenticationToken(account, token, account.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return null;
        return authHeader.substring(7);
    }
}