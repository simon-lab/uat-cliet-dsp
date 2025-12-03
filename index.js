// alert("Hai");

const validateBtn = document.getElementById("validate");
const toggleBtn = document.getElementById("sidebarToggle");
const body = document.body;

// Fungsi Toggle Sidebar
toggleBtn.addEventListener("click", function () {
  if (window.innerWidth > 768) {
    body.classList.toggle("sidebar-hidden");
  } else {
    body.classList.toggle("sidebar-mobile-show");
  }
});

// validateBtn.addEventListener("click", function () {
//   const headerValue = document.getElementById("inputHeader").value;
//   const bodyValue = document.getElementById("inputBody").value;
//   const responseValue = document.getElementById("inputResponse").value;

//   const resultBox = document.getElementById("outputResult");

//   console.log("--- Memulai Validasi ---");
//   console.log("Header:", headerValue);
//   console.log("Body:", bodyValue);
//   console.log("Response:", responseValue);

//   let validationMessage = "";

//   if (headerValue === "" || bodyValue === "" || responseValue === "") {
//     validationMessage = "Error: Semua field harus diisi!";
//     resultBox.style.color = "red";
//   } else if (
//     responseValue.includes("Access Token Invalid") ||
//     responseValue.includes("401xx01")
//   ) {
//     validationMessage = "PASSED: Error Code/Message sesuai.";
//     resultBox.style.color = "green";
//   } else {
//     validationMessage = "FAILED: Response tidak sesuai expected result.";
//     resultBox.style.color = "red";
//   }

//   resultBox.value = validationMessage;
// });

validateBtn.addEventListener("click", async function runAutoTest() {

  const bodyData = document.getElementById("inputBody").value;
    const statusBadge = document.getElementById('statusBadge');
statusBadge.style.display = 'none';
    statusBadge.className = 'badge rounded-pill';


  console.log("Body:", bodyData);
    
    const targetUrl = "http://localhost:8080/interbank/req/body/case7";

    const myHeaders = {
        "Content-Type": "application/json",
    };

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: bodyData
    };

    const outputBox = document.getElementById('outputResult');
    outputBox.value = "Sedang mengirim request...";

    try {
        const response = await fetch(targetUrl, requestOptions);

        const httpStatus = response.status; 
        const resultJson = await response.json(); 

        console.log("Status Code:", httpStatus);
        console.log("Response Data:", resultJson);

        statusBadge.style.display = 'inline-block'; // 
        statusBadge.textContent = `Status Koneksi: ${httpStatus}`; 

        if (httpStatus === 200) {
            statusBadge.classList.add('bg-success');
        } else {
            statusBadge.classList.add('bg-danger');
        }

        outputBox.value = `Status: ${resultJson.status}\n\n`+`Message: ${resultJson.message}`;
        autoResize('outputResult');

    } catch (error) {

      statusBadge.style.display = 'inline-block';
        statusBadge.textContent = `Status Koneksi: ${httpStatus}`;
        statusBadge.classList.add('bg-danger');
        console.error("Error:", error);
        outputBox.value = "Gagal melakukan request: " + error.message;
        autoResize('outputResult');
    }
})

function autoResize(elementId) {
    const textarea = document.getElementById(elementId);
    if (textarea) {

        textarea.style.height = 'auto'; 
        textarea.style.height = (textarea.scrollHeight + 10) + 'px'; 
    }
}

const allTextareas = document.querySelectorAll('textarea.form-control');

allTextareas.forEach(textarea => {
    // Tambahkan style css lewat JS (opsional, bisa juga via CSS file)
    textarea.style.overflowY = 'hidden';
    textarea.style.resize = 'none';

    // Pasang event listener ke semuanya
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
});


