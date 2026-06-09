const studentForm = document.getElementById("studentForm");

const studentList = document.getElementById("studentList");

const message = document.getElementById("message");

// Get data from Local Storage

let students =
JSON.parse(localStorage.getItem("students")) || [];

// Display Students

const displayStudents = () => {

    studentList.innerHTML = "";

    students.forEach((student, index) => {

        studentList.innerHTML += `
        
        <div class="student-card">

            <h3>${student.name}</h3>

            <p><strong>Email:</strong> ${student.email}</p>

            <p><strong>Mobile:</strong> ${student.mobile}</p>

            <button
                class="delete-btn"
                onclick="deleteStudent(${index})">
                Delete
            </button>

        </div>
        
        `;
    });
};

// Register Student

studentForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const mobile =
    document.getElementById("mobile").value.trim();

    // Name Validation

    if(name === ""){

        message.innerHTML =
        "Name should not be empty";

        message.className = "error";

        return;
    }

    // Email Validation

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        message.innerHTML =
        "Enter a valid email";

        message.className = "error";

        return;
    }

    // Password Validation

    if(password.length < 6){

        message.innerHTML =
        "Password must contain at least 6 characters";

        message.className = "error";

        return;
    }

    // Mobile Validation

    const mobilePattern =
    /^[0-9]{10}$/;

    if(!mobilePattern.test(mobile)){

        message.innerHTML =
        "Mobile number must contain 10 digits";

        message.className = "error";

        return;
    }

    // Create Student Object

    const student = {
        name,
        email,
        password,
        mobile
    };

    // Add Student

    students.push(student);

    // Save to Local Storage

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    // Success Message

    message.innerHTML =
    "Student Registered Successfully";

    message.className = "success";

    // Clear Form

    studentForm.reset();

    // Refresh Display

    displayStudents();

    console.log("Student Added:", student);
});

// Delete Student

const deleteStudent = (index) => {

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();

    message.innerHTML =
    "Student Deleted Successfully";

    message.className = "success";

    console.log("Student Deleted");
};

// Load Existing Students

displayStudents();