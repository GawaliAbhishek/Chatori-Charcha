package com.asg.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        // configures the prefix of route to subscribe one topic so server can send and recive messages 
        // only on those topics which are prefixed by this given string
        config.enableSimpleBroker("/topic");

        // this is used to set the prefix of chat sending url
        // so basically it will route all /app requests to controller of chat 
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        // this is configure /chat as endpoint for connection establishment 
        registry.addEndpoint("/chat")
                .setAllowedOrigins("http://192.168.31.217:5173","http://localhost:5173")
                .withSockJS();

        // Sock JS enables the websocket fallback incase if websocket fails this will handle the sichvation
        // it will provide alternate method for that 
    }

}
