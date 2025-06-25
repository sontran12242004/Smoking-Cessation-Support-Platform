package com.smokingcessation.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Getter
@Setter
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    public String email;
    public String phone;
    public String password;
    public String fullName;

    @Enumerated(EnumType.STRING)
    public Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Thêm quyền chính dựa trên vai trò
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        // Cấp quyền bổ sung dựa trên mối quan hệ phân cấp
        switch (role) {
            case ADMIN:
                // Admin có tất cả quyền
                authorities.add(new SimpleGrantedAuthority("PERMISSION_FULL_ACCESS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_ALL"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_MEMBERS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_COACHES"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_SUBSCRIPTIONS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_REPORTS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_CONTENT"));
                break;
            case MEMBERS:
                // Members có quyền truy cập tính năng sau khi đăng ký
                authorities.add(new SimpleGrantedAuthority("PERMISSION_ACCESS_FEATURES"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_PROFILE"));
                break;
            case Coach:
                // Coach có quyền xem thông tin members
                authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_MEMBERS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_APPOINTMENTS"));
                authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_PROFILE"));
                break;
            case GUEST:
                // Guest không có quyền bổ sung
                break;
            default:
                break;
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<AccountSlot> accountSlots;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Appointment> appointments;

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//    List<Rating> ratings;
//
//    @OneToMany(mappedBy = "account")
//    List<Report> reports;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}