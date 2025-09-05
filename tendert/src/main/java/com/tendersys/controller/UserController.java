package com.tendersys.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.tendersys.model.User;
import com.tendersys.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(value =  "*") 
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

//    @PostMapping("/login")
//    public Object loginUser(@RequestBody User loginUser) {
//        User user = userRepository.findByEmail(loginUser.getEmail());
//        if (user == null) {
//            return "User not found!";
//        }
//
//        if (!user.getPassword().equals(loginUser.getPassword())) {
//            return "Invalid password!";
//        }
//
//        return user;
//    }
//    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("error", "User not found!"));
        }

        if (!user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(Map.of("error", "Invalid password!"));
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}

