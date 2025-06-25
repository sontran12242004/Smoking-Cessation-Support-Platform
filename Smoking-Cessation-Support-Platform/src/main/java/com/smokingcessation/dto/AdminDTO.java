package com.smokingcessation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.smokingcessation.enums.Role;
import lombok.Data;


@Data
public class AdminDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long id;
    private String email;
    private String phone;
    private String fullName;
}