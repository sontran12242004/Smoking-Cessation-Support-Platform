package com.smokingcessation.dto;

import com.smokingcessation.entity.Account;
import lombok.*;
import lombok.experimental.FieldDefaults;



@Data
public class EmailDetail {
    private Account receiver;
    private String recipient;
    private String subject;
    private String link;
}
