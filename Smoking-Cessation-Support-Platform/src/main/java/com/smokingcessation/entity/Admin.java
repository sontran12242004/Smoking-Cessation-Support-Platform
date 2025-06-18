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

    public String email;
    public String phone;
    public String password;
    public String fullName;

    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    List<Coach> coach;
}