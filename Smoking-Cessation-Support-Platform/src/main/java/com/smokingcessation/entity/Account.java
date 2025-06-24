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

    public String email;
    public String phone;
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

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Appointment> appointments;

//    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
//    List<Rating> ratings;
//
//    @OneToMany(mappedBy = "account")
//    List<Report> reports;

}