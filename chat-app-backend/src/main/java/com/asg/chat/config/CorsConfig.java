package com.asg.chat.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigin;

    @Value("${app.cors.allowed-methods}")
    private String[] allowedMethods;

    @Value("${app.cors.allowed-headers}")
    private String[] allowedHeaders;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
        .allowedOrigins(allowedOrigin)
        .allowedMethods(allowedMethods)
        .allowedHeaders(allowedHeaders);
    }

    

}
