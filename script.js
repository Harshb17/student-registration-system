// Load data from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Restrict input while typing
document.getElementById("name").addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z ]/g, '');
});

document.getElementById("studentId").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById("contact").addEventListener("input", function () {
    // Remove non-numbers
    this.value = this.value.replace(/[^0-9]/g, '');

    // Restrict to max 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// Form submit
document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let id = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    // Prevent empty row
    if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return;
    }

    // Validation
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name should contain only letters.");
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert("Student ID must contain only numbers.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Enter valid email.");
        return;
    }

    if (!/^\d{10}$/.test(contact)) {
    alert("Contact number must be exactly 10 digits.");
    return;
}

    let student = { name, id, email, contact };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }

    localStorage.setItem("students", JSON.stringify(students));
    this.reset();
    displayStudents();
});

// Display students
function displayStudents() {
    let tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    students.forEach((s, index) => {
        let row = `
            <tr>
                <td>${s.name}</td>
                <td>${s.id}</td>
                <td>${s.email}</td>
                <td>${s.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Dynamic scrollbar using JS
    let container = document.querySelector(".table-container");

    if (students.length > 3) {
        container.style.maxHeight = "300px";
        container.style.overflowY = "auto";
    } else {
        container.style.maxHeight = "none";
        container.style.overflowY = "hidden";
    }
}

// Edit student
function editStudent(index) {
    let s = students[index];

    document.getElementById("name").value = s.name;
    document.getElementById("studentId").value = s.id;
    document.getElementById("email").value = s.email;
    document.getElementById("contact").value = s.contact;

    editIndex = index;
}

// Delete student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

// Initial load
displayStudents();