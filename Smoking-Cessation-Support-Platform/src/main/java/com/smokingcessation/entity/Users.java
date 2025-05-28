package com.smokingcessation.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "users")

public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userID;
    private String name;
    private String email;
    private String password;
    private String role;
    private LocalDate createAt;

    protected void onCreate(){
        this.createAt = LocalDate.now();
    }
}
