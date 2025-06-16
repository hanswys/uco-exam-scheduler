import React, { useState, useRef, useEffect } from "react";
import GradientText from "../components/GradientText.jsx";
import VariableProximity from "../components/VariableProximity.jsx";
import AnimatedList from "../components/AnimatedList.jsx";

const Schedule = () => {
  const [form, setForm] = useState({
    subject: "",
    date: "",
    time: "",
  });
  const [success, setSuccess] = useState(null);
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

  // Fetch scheduled exams from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        // Map backend rows to AnimatedList items
        setItems(
          data.map((row) => ({
            label: `${row.subject} - ${row.date} ${row.time}`,
          }))
        );
      })
      .catch(() => setItems([]));
  }, [success]); // refetch when success changes (after save)

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

  // Send form data to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    try {
      const response = await fetch("http://localhost:8080/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: form.subject,
          date: form.date,
          time: form.time,
        }),
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
        <div ref={containerRef} style={{ textAlign: "center", marginBottom: 24 }}>
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
      {/* Animated List Section */}
      <div style={{
        flex: 1,
        minWidth: 300,
        maxWidth: 500,
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h3 style={{ marginBottom: 16 }}>Your Scheduled Exams</h3>
        <AnimatedList
          items={items.map(item => item.label)}
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
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
        >
          Export to Calendar
        </button>
      </div>
    </div>
  );
};

export default Schedule;