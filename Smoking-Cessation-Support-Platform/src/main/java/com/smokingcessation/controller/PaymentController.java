package com.smokingcessation.controller;

import com.smokingcessation.dto.PaymentDTO;
import com.smokingcessation.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/payment")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@SecurityRequirement(name = "api")
public class PaymentController {
    @Autowired
    PaymentService paymentService;

    @PostMapping
    public ResponseEntity setStatus(@RequestBody PaymentDTO request){
        return ResponseEntity.ok(paymentService.setStatus(request));
    }
}
