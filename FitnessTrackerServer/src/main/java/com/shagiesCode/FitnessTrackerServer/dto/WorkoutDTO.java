package com.shagiesCode.FitnessTrackerServer.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class WorkoutDTO {

    private Long id;

    @NotBlank(message = "Workout type cannot be blank")
    @Size(max = 50, message = "Workout type must not exceed 50 characters")
    private String type;

    @NotNull(message = "Date cannot be null")
    private Date date;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 1440, message = "Duration must not exceed 1440 minutes (1 day)")
    private int duration;

    @Min(value = 1, message = "Calories burned must be at least 1")
    private int caloriesBurned;

    @JsonIgnore
    private User user;
}

