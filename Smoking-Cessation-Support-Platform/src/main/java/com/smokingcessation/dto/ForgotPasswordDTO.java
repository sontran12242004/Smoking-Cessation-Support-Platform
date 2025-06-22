package com.smokingcessation.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ForgotPasswordDTO {
    @Email(message = "invalid email!")

    public String email;;

}
