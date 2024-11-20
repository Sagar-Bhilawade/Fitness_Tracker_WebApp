package com.shagiesCode.FitnessTrackerServer.entity;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private Date date;

    private int duration;

    private int caloriesBurned;

    public WorkoutDTO getWorkoutDTO() {
        WorkoutDTO workoutDTO = new WorkoutDTO();
        workoutDTO.setId(id);
        workoutDTO.setDate(date);
        workoutDTO.setType(type);
        workoutDTO.setDuration(duration);
        workoutDTO.setCaloriesBurned(caloriesBurned);
        return workoutDTO;
    }
}
