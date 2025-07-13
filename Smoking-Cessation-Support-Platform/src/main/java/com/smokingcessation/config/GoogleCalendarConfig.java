package com.smokingcessation.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.StringReader;

@Configuration
public class GoogleCalendarConfig {

    @Value("${google.calendar.client.id}")
    private String clientId;

    @Value("${google.calendar.client.secret}")
    private String clientSecret;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Bean
    public GoogleClientSecrets googleClientSecrets() throws IOException {
        String clientSecretsJson = String.format(
                "{\"installed\":{\"client_id\":\"%s\",\"client_secret\":\"%s\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"redirect_uris\":[\"http://localhost:8080/login/oauth2/code/google\"]}}",
                clientId, clientSecret);

        return GoogleClientSecrets.load(JSON_FACTORY, new StringReader(clientSecretsJson));
    }
}
