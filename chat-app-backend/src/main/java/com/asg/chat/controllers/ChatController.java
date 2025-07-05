package com.asg.chat.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import com.asg.chat.entities.Message;
import com.asg.chat.entities.Room;
import com.asg.chat.payload.MessageRequest;
import com.asg.chat.repos.RoomRepository;

@Controller
// @CrossOrigin("http://192.168.31.217:5173")
public class ChatController {

    private final RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // This  method will used for both sending and publising messages 
    @MessageMapping("/sendMessage/{roomId}") // this url will recive messages url = /app/sendMessage/{roomId}
    @SendTo("/topic/room/{roomId}") // this url will publish that message and subsribe
    public Message sendMessage(
        @DestinationVariable String roomId,
        @RequestBody MessageRequest request){

           Room room = roomRepository.findByRoomId(request.getRoomId());

           Message message = new Message();
           message.setContent(request.getContent());
           message.setSender(request.getSender());
           message.setTimestamp(LocalDateTime.now());

           if(room != null){
            room.getMessages().add(message);
            roomRepository.save(room);
           }else{
            throw new RuntimeException("room not found");
           }

           return message;

    }
    
}
