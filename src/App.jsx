import { useState } from "react";

const doctors = [
  { id: 1, name: "Dr. Sujal Sharma", specialization: "Cardiologist", fee: 500 },
  { id: 2, name: "Dr. Kunal Singh", specialization: "Dermatologist", fee: 700 },
  { id: 3, name: "Dr. Ankul Yadav", specialization: "Orthopedic", fee: 600 }
];

export default function App() {
  const [page, setPage] = useState("list");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();

    if (!patientName || !selectedDoctor || !date || !time) {
      setMessage("Please fill all fields");
      return;
    }

    const appointment = {
      patientName,
      doctor: selectedDoctor,
      date,
      time
    };

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    setMessage("Appointment booked successfully");
    setPage("success");

    setPatientName("");
    setSelectedDoctor("");
    setDate("");
    setTime("");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    background: "#111827",
    color: "white",
    cursor: "pointer"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(245,247,251,0.88), rgba(245,247,251,0.88)), url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "30px"
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "white",
          padding: "28px",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "34px",
            lineHeight: "1.2",
            marginBottom: "28px"
          }}
        >
          Online Appointment Management Portal
        </h1>

        {page === "list" && (
          <div>
            <h2 style={{ marginBottom: "20px" }}>Doctor List</h2>

            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "18px",
                  marginBottom: "16px"
                }}
              >
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Consultation Fee:</strong> ₹{doctor.fee}</p>

                <button
                  style={{ ...buttonStyle, marginTop: "12px" }}
                  onClick={() => {
                    setSelectedDoctor(doctor.name);
                    setPage("book");
                  }}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}

        {page === "book" && (
          <div>
            <button
              style={{ ...buttonStyle, marginBottom: "16px" }}
              onClick={() => setPage("list")}
            >
              Back to Doctor List
            </button>

            <h2 style={{ marginBottom: "18px" }}>Book Appointment</h2>
            <p style={{ marginBottom: "18px", color: "#4b5563" }}>
              Doctor: {selectedDoctor}
            </p>

            <form onSubmit={handleBooking}>
              <div style={{ marginBottom: "14px" }}>
                <label>Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  style={inputStyle}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label>Date</label>
                <input
                  type="date"
                  value={date}
                  style={inputStyle}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parts = value.split("-");
                    if (!parts[0] || parts[0].length <= 4) {
                      setDate(value);
                    }
                  }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label>Time</label>
                <input
                  type="time"
                  value={time}
                  style={inputStyle}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Confirm Booking
              </button>
            </form>

            {message && (
              <p style={{ marginTop: "14px", color: "#dc2626" }}>{message}</p>
            )}
          </div>
        )}

        {page === "success" && (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "12px" }}>{message}</h2>
            <p style={{ marginBottom: "18px", color: "#4b5563" }}>
              Your appointment has been saved.
            </p>

            <button
              style={buttonStyle}
              onClick={() => setPage("list")}
            >
              Back to Doctor List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
