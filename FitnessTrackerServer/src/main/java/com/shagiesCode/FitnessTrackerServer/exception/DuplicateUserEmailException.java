package com.shagiesCode.FitnessTrackerServer.exception;

public class DuplicateUserEmailException extends RuntimeException{
    public DuplicateUserEmailException(String message) {
        super(message);
    }
}
