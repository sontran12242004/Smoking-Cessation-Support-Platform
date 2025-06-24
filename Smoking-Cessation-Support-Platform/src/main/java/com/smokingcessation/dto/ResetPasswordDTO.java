package com.smokingcessation.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResetPasswordDTO {
    @Size(min = 6, message = "Password must be at least 6 character!")
    String password;

}
