package com.smokingcessation.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
public class AccountMemberShip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    @JsonIgnore
    Account account;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "membershipPlan_id")
    @JsonIgnore
    MembershipPlan membershipPlan;

    LocalDate startDate;
    LocalDate endDate;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "accountMemberShip")
    List<Payment> payments;

}
