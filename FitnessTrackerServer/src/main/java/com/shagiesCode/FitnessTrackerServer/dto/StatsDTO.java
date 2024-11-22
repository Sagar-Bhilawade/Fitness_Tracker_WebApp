package com.shagiesCode.FitnessTrackerServer.dto;

import lombok.Data;

@Data
public class StatsDTO {

    private Long achievedGoals;

    private Long nonAchievedGoals;

    private int steps;

    private double distance;

    private int totalCaloriesBurned;

    private int totalWorkoutDuration;

    private int totalWorkoutCaloriesBurned;
}
