package com.smokingcessation.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        
        // Custom deserializer để xử lý ISO format với timezone
        javaTimeModule.addDeserializer(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
            @Override
            public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
                String dateStr = p.getText();
                // Loại bỏ timezone suffix (Z hoặc +00:00)
                if (dateStr.endsWith("Z")) {
                    dateStr = dateStr.substring(0, dateStr.length() - 1);
                } else if (dateStr.contains("+")) {
                    dateStr = dateStr.substring(0, dateStr.indexOf("+"));
                }
                
                // Parse theo format ISO
                return LocalDateTime.parse(dateStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            }
        });

        return Jackson2ObjectMapperBuilder.json()
                .modules(javaTimeModule)
                .build();
    }
}