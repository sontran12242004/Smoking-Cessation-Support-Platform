package com.smokingcessation.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int dailyCost;

    private LocalDate quitDate;

    private String email;


    // Các thuộc tính khác (username, email, ...)
}
