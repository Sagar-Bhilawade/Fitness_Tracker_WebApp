package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.SignInRequest;
import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.service.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        try {
            Map<String, Object> response = userService.getUserByEmailAndPassword(
                    signInRequest.getEmail(), signInRequest.getPassword());

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }

}
