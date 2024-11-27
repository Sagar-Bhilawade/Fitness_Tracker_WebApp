package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.WorkoutDTO;
import com.shagiesCode.FitnessTrackerServer.service.IWorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class WorkoutController {
    private final IWorkoutService workoutService;

    @PostMapping("/workout")
    public ResponseEntity postWorkout(@RequestBody WorkoutDTO workoutDTO, @RequestParam Long userId) {
        try {
            return ResponseEntity.ok(workoutService.postWorkout(workoutDTO, userId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @GetMapping("/workouts")
    public ResponseEntity getWorkouts() {
        try {
//            return ResponseEntity.status(HttpStatus.OK).body(activityService.getActivities());
            return ResponseEntity.ok(workoutService.getWorkouts());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some thing went wrong");
        }
    }
        @GetMapping("/your_workouts")
        public ResponseEntity userWorkouts(@RequestParam Long userId) {
            try {
                return ResponseEntity.ok(workoutService.getUserWorkouts(userId));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some thing went wrong");
            }
    }


}
