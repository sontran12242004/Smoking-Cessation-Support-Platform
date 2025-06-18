package com.smokingcessation.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterSlotDTO
{
    LocalDate date;
    long accountId;
}
