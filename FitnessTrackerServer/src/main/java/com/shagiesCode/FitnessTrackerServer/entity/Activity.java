package com.shagiesCode.FitnessTrackerServer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Date cannot be null")
    @Temporal(TemporalType.DATE)
    private Date date;

    @Min(value = 1, message = "Steps must be at least 1")
    private int steps;

    @Min(value = 0, message = "Distance cannot be negative")
    private double distance;

    @Min(value = 1, message = "Calories burned must be at least 1")
    private int caloriesBurned;

    @NotNull(message = "User cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


}
