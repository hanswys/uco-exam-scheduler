package com.uco_exam_scheduler.exam_scheduler.repository;

import com.uco_exam_scheduler.exam_scheduler.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {}