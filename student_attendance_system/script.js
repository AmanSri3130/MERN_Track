// Initial Mock State matching UI blueprint
let students = [
    { id: 1, name: "Anurag Kumar", present: true },
    { id: 2, name: "Simran Sharma", present: false }
];

let nextId = 3;

// Global Dom Element Node Links
const tableBody = document.getElementById('attendanceTableBody');
const studentInput = document.getElementById('studentNameInput');
const addBtn = document.getElementById('addStudentBtn');
const saveBtn = document.getElementById('saveAttendanceBtn');

const totalCount = document.getElementById('totalStudents');
const presentCount = document.getElementById('totalPresent');
const absentCount = document.getElementById('totalAbsent');

// Render Engine: Translates current state array directly into UI visual matrix rows
function renderTable() {
    tableBody.innerHTML = '';
    
    students.forEach((student) => {
        const tr = document.createElement('tr');

        // 1. Unique Identification Row Element
        const tdId = document.createElement('td');
        tdId.textContent = student.id;
        tr.appendChild(tdId);

        // 2. Student Full Name Field Node
        const tdName = document.createElement('td');
        tdName.textContent = student.name;
        tr.appendChild(tdName);

        // 3. Computed Status Layout Metric Indicator
        const tdStatus = document.createElement('td');
        if (student.present) {
            tdStatus.textContent = "Present";
            tdStatus.className = "status-present";
        } else {
            tdStatus.textContent = "Absent";
            tdStatus.className = "status-absent";
        }
        tr.appendChild(tdStatus);

        // 4. State Modification Input Control (Attendance Switch Toggle)
        const tdToggle = document.createElement('td');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = "btn-toggle";
        toggleBtn.textContent = student.present ? "Mark Absent" : "Mark Present";
        toggleBtn.onclick = () => toggleAttendance(student.id);
        tdToggle.appendChild(toggleBtn);
        tr.appendChild(tdToggle);

        // 5. Destructive Action Layer (Delete Row Element Execution)
        const tdDelete = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "btn-delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteStudent(student.id);
        tdDelete.appendChild(deleteBtn);
        tr.appendChild(tdDelete);

        tableBody.appendChild(tr);
    });

    calculateMetrics();
}

// Analytics Node State Counter Reducer 
function calculateMetrics() {
    const total = students.length;
    const present = students.filter(s => s.present).length;
    const absent = total - present;

    totalCount.textContent = total;
    presentCount.textContent = present;
    absentCount.textContent = absent;
}

// Function Feature: Core Element Pipeline Addition
function addStudent() {
    const name = studentInput.value.trim();
    if (!name) {
        alert("Please provide a valid entry profile student name.");
        return;
    }

    students.push({
        id: nextId++,
        name: name,
        present: true // System assignment baseline sets new items as Present
    });

    studentInput.value = ''; // Clean field out clean
    renderTable();
}

// Function Feature: Binary Flag Attendance Flip Event handler
function toggleAttendance(id) {
    students = students.map(student => {
        if (student.id === id) {
            return { ...student, present: !student.present };
        }
        return student;
    });
    renderTable();
}

// Function Feature: Splice / Array Extraction Removal Block routine
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    renderTable();
}

// Setup Declarative Functional Observers/Listeners
addBtn.addEventListener('click', addStudent);

// Interactive keyboard Enter intercept
studentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Mock Application Configuration State Persistence Notification
saveBtn.addEventListener('click', () => {
    alert(`Success: Attendance ledger containing ${students.length} record metrics successfully packaged.`);
    console.log("Current Data JSON Output Stack:", JSON.stringify(students, null, 2));
});

// App Initiation Phase
renderTable();