package com.smokingcessation.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;

public class ForgotPasswordDTO {
    @Email(message = "invalid email!")

    public String email;;

}
