package com.uco_exam_scheduler.exam_scheduler.controller;

import com.uco_exam_scheduler.exam_scheduler.model.Schedule;
import com.uco_exam_scheduler.exam_scheduler.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @DeleteMapping
    public void deleteAllSchedules() {
        scheduleRepository.deleteAll();
    }

    @PutMapping("/{id}")
    public Schedule updateSchedule(@PathVariable Long id, @RequestBody Schedule updated) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow();
        schedule.setSubject(updated.getSubject());
        schedule.setDate(updated.getDate());
        schedule.setTime(updated.getTime());
        return scheduleRepository.save(schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        scheduleRepository.deleteById(id);
    }
}