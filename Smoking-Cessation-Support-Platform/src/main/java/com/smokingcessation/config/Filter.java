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

    // Thêm vào danh sách PUBLIC_API trong Filter.java
    private final List<String> PUBLIC_API = List.of(
            "POST:/api/register",
            "POST:/api/login",
            "POST:/api/forgot-password",
            "POST:/api/reset-password",
            "GET:/api/members/*",
            "POST:/api/members",
            "PUT:/api/members/*",
            "GET:/api/membership-plans",
            "GET:/api/membership-plans/*",
            "POST:/api/daily-process/member/*/submit",
            "GET:/api/daily-process/member/*/health-metrics",
            "POST:/api/daily-process/member/*",
            "GET:/api/daily-process/member/*",
            "GET:/api/daily-process/member/*/date/*",
            "GET:/api/daily-process/member/*/range",
            "DELETE:/api/daily-process/*"
    );

    public boolean isPublicAPI(String uri, String method) {
        AntPathMatcher matcher = new AntPathMatcher();

        if(method.equals("GET")) return true;

        return PUBLIC_API.stream().anyMatch(pattern -> {
            String[] parts = pattern.split(":", 2);
            if (parts.length != 2) return false;

            String allowedMethod = parts[0];
            String allowedUri = parts[1];

            return method.equalsIgnoreCase(allowedMethod) && matcher.match(allowedUri, uri);
        });
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // function này sẽ đc chạy mỗi khi mà có request từ FE
        // cho phép truy cập vào lớp controller

        String uri = request.getRequestURI();
        String method = request.getMethod();

        if(isPublicAPI(uri, method)){
            // nếu public cho qua luôn ko cần check
            filterChain.doFilter(request, response);
        }else{
            // xác thực
            String token = getToken(request);

            if(token == null){
                resolver.resolveException(request, response, null, new AuthenticationException("Empty token!"));
                return;
            }

            // có cung cấp token
            // verify token
            Account account;
            try {
                // từ token tìm ra thằng đó là ai
                account = tokenService.extractAccount(token);
            } catch (ExpiredJwtException expiredJwtException) {
                // token het han
                resolver.resolveException(request, response, null, new AuthenticationException("Expired Token!"));
                return;
            } catch (MalformedJwtException malformedJwtException) {
                resolver.resolveException(request, response, null, new AuthenticationException("Invalid Token!"));
                return;
            }
            // => token dung
            UsernamePasswordAuthenticationToken
                    authenToken =
                    new UsernamePasswordAuthenticationToken(account, token, account.getAuthorities());
            authenToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenToken);

            // token ok, cho vao`
            filterChain.doFilter(request, response);
        }
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.substring(7);
    }
}