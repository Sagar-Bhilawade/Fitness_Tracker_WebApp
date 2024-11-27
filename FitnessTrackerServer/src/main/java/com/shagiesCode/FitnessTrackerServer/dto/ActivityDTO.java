package com.shagiesCode.FitnessTrackerServer.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
public class ActivityDTO {

    private Long id;

    @NotNull(message = "Date cannot be null")
    private Date date;

    @Min(value = 1, message = "Steps must be at least 1")
    private int steps;

    @Min(value = 0, message = "Distance cannot be negative")
    private double distance;

    @Min(value = 1, message = "Calories burned must be at least 1")
    private int caloriesBurned;

    @JsonIgnore
    private User user;
}
