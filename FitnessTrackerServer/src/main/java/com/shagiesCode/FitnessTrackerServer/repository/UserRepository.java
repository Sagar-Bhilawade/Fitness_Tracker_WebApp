package com.shagiesCode.FitnessTrackerServer.repository;

import com.shagiesCode.FitnessTrackerServer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
