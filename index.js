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

        outputBox.value = `Status: ${httpStatus}\n\n` + JSON.stringify(resultJson, null, 2);

    } catch (error) {
        console.error("Error:", error);
        outputBox.value = "Gagal melakukan request: " + error.message;
    }
})


