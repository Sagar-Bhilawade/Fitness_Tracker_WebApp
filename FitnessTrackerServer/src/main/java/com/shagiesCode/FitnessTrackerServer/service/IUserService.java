package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.SignUpDTO;
import com.shagiesCode.FitnessTrackerServer.dto.UserDTO;

public interface IUserService {
    UserDTO signUp(SignUpDTO signUpDTO);

    String getUserByEmailAndPassword(String email, String password);
}
