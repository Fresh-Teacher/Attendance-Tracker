import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

function AttendanceList({ students, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h2 className="text-primary">Student List</h2>
      <ul className="list-group">
        {students.map((student, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => onEdit(index)}
            >
              {student}
            </span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AttendanceTracker() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const notify = (message, type = "success") => {
    toast[type](message);
  };

  const handleAddStudent = () => {
    if (newStudent.trim() && !students.includes(newStudent)) {
      setStudents([...students, newStudent]);
      notify("Student added successfully!");
      setNewStudent("");
    }
  };

  const handleEditStudent = (index) => {
    setSelectedIndex(index);
    setModalMessage(`Are you sure you want to edit "${students[index]}"?`);
    setCurrentAction("edit");
    setShowModal(true);
  };

  const handleDeleteStudent = (index) => {
    setSelectedIndex(index);
    setModalMessage(`Are you sure you want to delete "${students[index]}"?`);
    setCurrentAction("delete");
    setShowModal(true);
  };

  const confirmAction = () => {
    if (currentAction === "edit") {
      const newName = prompt("Enter the new name:");
      if (newName && newName.trim()) {
        const updatedStudents = [...students];
        updatedStudents[selectedIndex] = newName;
        setStudents(updatedStudents);
        notify("Student name updated successfully!");
      }
    } else if (currentAction === "delete") {
      setStudents(students.filter((_, index) => index !== selectedIndex));
      notify("Student deleted successfully!", "error");
    }
    setShowModal(false);
    setCurrentAction(null);
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-center text-info">Attendance Tracker</h1>

          {/* Input field to add custom students */}
          <div className="mb-3 row">
            <div className="col-md-8">
              <input
                type="text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                placeholder="Enter student name"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <button
                onClick={handleAddStudent}
                className="btn btn-primary w-100 mb-2"
              >
                Add Student
              </button>
            </div>
          </div>

          {/* Attendance List */}
          <AttendanceList
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
          />

          <p className="mt-4">
            <strong>Number of students present:</strong> {students.length}
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
