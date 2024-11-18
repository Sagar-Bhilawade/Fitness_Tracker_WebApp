package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.ActivityDTO;
import com.shagiesCode.FitnessTrackerServer.service.IActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ActivityController {
    private final IActivityService activityService;

    @PostMapping("/activity")
    public ResponseEntity postAcitivity(@RequestBody ActivityDTO dto) {
        ActivityDTO createActivity = activityService.postActivity(dto);
        if (createActivity != null)
            return ResponseEntity.status(HttpStatus.CREATED).body(createActivity);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some thing went wrong");
    }

    @GetMapping("/activities")
    public ResponseEntity getActivities() {
        try {
//            return ResponseEntity.status(HttpStatus.OK).body(activityService.getActivities());
            return ResponseEntity.ok(activityService.getActivities());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Some thing went wrong");
        }
    }
}
