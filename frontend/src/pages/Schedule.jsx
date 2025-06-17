import React, { useState, useRef, useEffect } from "react";
import GradientText from "../components/GradientText.jsx";
import VariableProximity from "../components/VariableProximity.jsx";
import { saveAs } from "file-saver";
import { createEvents } from "ics";

const Schedule = () => {
  const [form, setForm] = useState({ subject: "", date: "", time: "" });
  const [success, setSuccess] = useState(null);
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ subject: "", date: "", time: "" });
  const containerRef = useRef(null);

  // Fetch scheduled exams from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch(() => setItems([]));
  }, [success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSchoolSite = () => {
    window.open(
      "https://www.uco.edu/admissions/dates/exams/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Add new schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSuccess("Schedule saved!");
        setForm({ subject: "", date: "", time: "" });
      } else {
        setSuccess("Failed to save schedule.");
      }
    } catch (err) {
      setSuccess("Failed to save schedule.");
    }
  };

  // Delete all schedules
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all scheduled exams?")) return;
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccess("All schedules deleted!");
        setItems([]);
      } else {
        setSuccess("Failed to delete schedules.");
      }
    } catch (err) {
      setSuccess("Failed to delete schedules.");
    }
  };

  // Delete single schedule
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/schedule/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  // Start editing
  const handleEdit = (item, idx) => {
    setEditIndex(idx);
    setEditForm({ subject: item.subject, date: item.date, time: item.time });
  };

  // Save edit
  const handleSaveEdit = async (item) => {
    try {
      const response = await fetch(`http://localhost:8080/api/schedule/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        setItems(items.map((it, idx) =>
          idx === editIndex ? { ...item, ...editForm } : it
        ));
        setEditIndex(null);
      }
    } catch (err) {
      alert("Failed to update.");
    }
  };

  // Bulk export to .ics
  const handleBulkExportToCalendar = () => {
    const events = items.map((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const [hour, minute] = item.time.split(":").map(Number);
      return {
        title: item.subject,
        start: [year, month, day, hour, minute],
        duration: { hours: 1 },
        description: "Scheduled via UCO Exam Scheduler",
      };
    });

    createEvents(events, (error, value) => {
      if (error) {
        alert("Failed to generate calendar file.");
        return;
      }
      const blob = new Blob([value], { type: "text/calendar;charset=utf-8" });
      saveAs(blob, "uco-exams.ics");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 32,
        margin: "40px auto",
        maxWidth: 1100,
        width: "100%",
      }}
    >
      {/* Schedule Exam Section */}
      <div
        style={{
          maxWidth: 500,
          flex: 1,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <GradientText
          colors={["#1628b1", "#eee617", "#1628b1", "#eee617", "#1628b1"]}
          animationSpeed={7}
          showBorder={false}
          className="custom-class"
        >
          Schedule an Exam
        </GradientText>
        <div
          ref={containerRef}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <VariableProximity
            label={
              "Schedule your exams with ease! Seamless exports to any Calendar."
            }
            className={"variable-proximity-demo"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <label>Subject:</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              style={{ width: "100%", marginTop: 4, marginBottom: 12 }}
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              style={{ width: "100%", marginTop: 4, marginBottom: 12 }}
            />
          </div>
          <div>
            <label>Time:</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              style={{ width: "100%", marginTop: 4, marginBottom: 12 }}
            />
          </div>
          <button
            type="submit"
            style={{
              marginTop: 12,
              padding: "0.6em 1.2em",
              fontSize: "1em",
              borderRadius: 8,
              background: "#1628b1",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Schedule
          </button>
        </form>
        {success && (
          <div
            style={{
              marginTop: 16,
              color: success.includes("saved") ? "green" : "red",
            }}
          >
            {success}
          </div>
        )}
        <button
          style={{
            marginTop: 24,
            padding: "0.6em 1.2em",
            fontSize: "1em",
            borderRadius: 8,
            background: "#1628b1",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={handleSchoolSite}
        >
          See Official Exam Timings
        </button>
      </div>
      {/* Custom Card List Section */}
      <div
        style={{
          flex: 1,
          minWidth: 300,
          maxWidth: 500,
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3 style={{ marginBottom: 16 }}>Your Scheduled Exams</h3>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                borderRadius: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderLeft: "4px solid #1628b1",
                position: "relative",
              }}
            >
              {editIndex === idx ? (
                <>
                  <input
                    value={editForm.subject}
                    onChange={e => setEditForm({ ...editForm, subject: e.target.value })}
                    style={{ marginBottom: 4 }}
                  />
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                    style={{ marginBottom: 4 }}
                  />
                  <input
                    type="time"
                    value={editForm.time}
                    onChange={e => setEditForm({ ...editForm, time: e.target.value })}
                    style={{ marginBottom: 4 }}
                  />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={{ background: "#1628b1", color: "#fff", borderRadius: 4, border: "none", padding: "4px 12px" }}
                      onClick={() => handleSaveEdit(item)}
                    >
                      Save
                    </button>
                    <button
                      style={{ background: "#bbb", color: "#fff", borderRadius: 4, border: "none", padding: "4px 12px" }}
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>{item.subject}</strong>
                  </div>
                  <div>
                    {item.date} at {item.time}
                  </div>
                  <div style={{ display: "flex", gap: 8, position: "absolute", right: 12, top: 12 }}>
                    <button
                      style={{ background: "#eee617", color: "#1628b1", borderRadius: 4, border: "none", padding: "2px 10px" }}
                      onClick={() => handleEdit(item, idx)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ background: "#b11616", color: "#fff", borderRadius: 4, border: "none", padding: "2px 10px" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            style={{
              padding: "0.6em 1.2em",
              fontSize: "1em",
              borderRadius: 8,
              background: "#1628b1",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleBulkExportToCalendar}
          >
            Export All to Calendar
          </button>
          <button
            style={{
              padding: "0.6em 1.2em",
              fontSize: "1em",
              borderRadius: 8,
              background: "#b11616",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;