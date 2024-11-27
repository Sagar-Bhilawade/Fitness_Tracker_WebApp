package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.GoalDTO;
import com.shagiesCode.FitnessTrackerServer.service.IGoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class GoalController {
    private final IGoalService goalService;

    @PostMapping("/goal")
    public ResponseEntity<?> postGoal(@RequestBody GoalDTO goalDTO, @RequestParam Long userId) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(goalService.postGoal(goalDTO, userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/goals")
    public ResponseEntity<?> getGoals() {

        try {
            return ResponseEntity.ok(goalService.getGoals());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went wrong !!");
        }
    }

    @GetMapping("/your_goals")
    public ResponseEntity<?> userGoals(@RequestParam Long userId) {

        try {
            return ResponseEntity.ok(goalService.getUserGoals(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went wrong !!");
        }
    }
    @GetMapping("/goal/status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id){
        try{
           return ResponseEntity.ok(goalService.updateStatus(id));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
