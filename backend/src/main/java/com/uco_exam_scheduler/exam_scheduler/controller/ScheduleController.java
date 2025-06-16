package com.uco_exam_scheduler.exam_scheduler.controller;

import com.uco_exam_scheduler.exam_scheduler.model.Schedule;
import com.uco_exam_scheduler.exam_scheduler.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend dev server
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @PostMapping
    public Schedule saveSchedule(@RequestBody Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
}