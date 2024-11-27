package com.shagiesCode.FitnessTrackerServer.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shagiesCode.FitnessTrackerServer.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;

import java.util.Date;

@Data
public class GoalDTO {

    private Long id;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotNull(message = "Start date cannot be null")
    @PastOrPresent(message = "Start date must be in the past or present")
    private Date startDate;

    @NotNull(message = "End date cannot be null")
    @FutureOrPresent(message = "End date must be in the future or present")
    private Date endDate;

    private Boolean achieved;
    @JsonIgnore
    private User user;
}
