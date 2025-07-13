package com.smokingcessation.dto;

import com.smokingcessation.enums.PaymentStatus;
import lombok.Data;

@Data
public class PaymentDTO {
    long paymentId;
    long packageId;
    PaymentStatus paymentStatus;
}
