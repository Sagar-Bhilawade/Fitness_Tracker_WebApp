package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.dto.UserDTO;

import java.util.Map;

public interface IUserService {
    UserDTO signUp(SignUpDTO signUpDTO);

    Map<String, Object> getUserByEmailAndPassword(String email, String password);
}
