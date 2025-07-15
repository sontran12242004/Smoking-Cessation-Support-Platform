package com.smokingcessation.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.smokingcessation.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    public String email;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "Phone number should be 10-11 digits")
    public String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    public String password;

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    public String fullName;

    @Enumerated(EnumType.STRING)
    public Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Thêm quyền chính dựa trên vai trò
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        // Cấp quyền bổ sung dựa trên mối quan hệ phân cấp
        if (role == Role.ADMIN) {
            // Admin có tất cả quyền
            authorities.add(new SimpleGrantedAuthority("PERMISSION_FULL_ACCESS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_ALL"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_MEMBERS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_COACHES"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_SUBSCRIPTIONS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_REPORTS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_CONTENT"));
        } else if (role == Role.MEMBERS) {
            // Members có quyền truy cập tính năng sau khi đăng ký
            authorities.add(new SimpleGrantedAuthority("PERMISSION_ACCESS_FEATURES"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_PROFILE"));
        } else if (role == Role.COACH) {
            // Coach có quyền xem thông tin members
            authorities.add(new SimpleGrantedAuthority("PERMISSION_VIEW_MEMBERS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_APPOINTMENTS"));
            authorities.add(new SimpleGrantedAuthority("PERMISSION_MANAGE_PROFILE"));
        }
        // GUEST không có quyền bổ sung

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

    // Relationship với Members entity
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnore
    private Members member;

    // Relationship với Admin entity
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "admin_id")
    @JsonIgnore
    private Admin admin;

    // Relationship với Coach entity
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "coach_id")
    @JsonIgnore
    private Coach coach;



}