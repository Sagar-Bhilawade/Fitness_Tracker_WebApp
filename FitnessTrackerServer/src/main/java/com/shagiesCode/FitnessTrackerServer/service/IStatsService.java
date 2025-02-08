package com.shagiesCode.FitnessTrackerServer.service;

import com.shagiesCode.FitnessTrackerServer.dto.GraphDTO;
import com.shagiesCode.FitnessTrackerServer.dto.StatsDTO;

public interface IStatsService {
    StatsDTO getStats(Long userId);
    GraphDTO getGraphStats(Long userId);
}
