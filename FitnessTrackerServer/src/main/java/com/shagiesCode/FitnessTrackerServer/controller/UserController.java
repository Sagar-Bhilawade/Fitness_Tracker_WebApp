package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.SignInRequest;
import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {
    private final IUserService userService;

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDTO signUpDTO){
        try{
            return  ResponseEntity.status(HttpStatus.CREATED).body(userService.signUp(signUpDTO));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @GetMapping("/signin")
    public ResponseEntity<String> getUserByEmailAndPassword(@Valid @RequestBody SignInRequest signInRequest) {
        return new ResponseEntity<>(userService.getUserByEmailAndPassword(signInRequest.getEmail(), signInRequest.getPassword()), HttpStatus.OK);
    }
}
