package com.shagiesCode.FitnessTrackerServer.controller;

import com.shagiesCode.FitnessTrackerServer.dto.GraphDTO;
import com.shagiesCode.FitnessTrackerServer.service.IStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StatsController {

    private final IStatsService statsService;

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(@RequestParam Long userId) {
        return ResponseEntity.ok(statsService.getStats(userId));
    }

    @GetMapping("/graphs")
    public ResponseEntity<?> getGraphStats(@RequestParam Long userId) {
        GraphDTO graphDTO = statsService.getGraphStats(userId);
        if (graphDTO != null) {
            return ResponseEntity.ok(graphDTO);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}
