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
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Pattern(regexp = "84|0|[3|5|7|8|9] + (\\d{8})", message = "Invalid Phone!")
    @Column(unique = true)
    public String phone;

    @Size(min = 6, message = "Password must be at least 6 character!")
    public String password;

    public String fullName;

    @Enumerated(EnumType.STRING)
    public Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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

    @OneToMany
            @JsonIgnore
    List<Appointment> appointments;

    @Email(message = "invalid email!")
    @Column(unique = true)
    public String email;;
}