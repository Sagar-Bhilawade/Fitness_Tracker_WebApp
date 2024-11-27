package com.shagiesCode.FitnessTrackerServer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Workout type cannot be blank")
    @Size(max = 50, message = "Workout type must not exceed 50 characters")
    private String type;

    @NotNull(message = "Date cannot be null")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Max(value = 1440, message = "Duration must not exceed 1440 minutes (1 day)")
    private int duration;

    @Min(value = 1, message = "Calories burned must be at least 1")
    private int caloriesBurned;

    @NotNull(message = "User cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
