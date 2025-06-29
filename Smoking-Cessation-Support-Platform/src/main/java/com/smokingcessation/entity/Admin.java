package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    // Chỉ giữ lại fullName, các field khác lấy từ Account
    public String fullName;

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    List<Coach> coach;

    // Relationship với Account entity - sử dụng mappedBy để tránh circular cascade
    @OneToOne(mappedBy = "admin")
    @JsonIgnore
    private Account account;
}