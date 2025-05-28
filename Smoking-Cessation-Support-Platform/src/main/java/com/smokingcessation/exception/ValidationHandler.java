package com.smokingcessation.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class ValidationHandler {


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handResponseEntity(MethodArgumentNotValidException exception){
        String message = " ";

        // cu moi thuoc tinh loi => gan vao bien message
        for(FieldError fieldError : exception.getBindingResult().getFieldErrors()){
            // name, Studentcode, Score
            message += fieldError.getField() + ": " + fieldError.getDefaultMessage();

        }
        return ResponseEntity.ok(message);
    }

}
