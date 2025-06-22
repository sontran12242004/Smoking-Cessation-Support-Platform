package com.smokingcessation.dto;

import com.smokingcessation.entity.Account;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
public class EmailDetail {
    private String recipient;
    private String subject;
    private Account receiver;
    private String link;
}
