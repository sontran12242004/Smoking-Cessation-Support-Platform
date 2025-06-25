package com.smokingcessation.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class AccountSlot
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
    LocalDate date;
    boolean isAvailable = true;
    @ManyToOne
    @JoinColumn(name = "account_id")
    Account account;
    @ManyToOne
    @JoinColumn(name ="slot_id")
    @JsonIgnore
    Slot slot;
}

