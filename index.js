const toggleBtn = document.getElementById("sidebarToggle");
const body = document.body;

// Fungsi Sidebar Toggle
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    if (window.innerWidth > 768) {
      body.classList.toggle("sidebar-hidden");
    } else {
      body.classList.toggle("sidebar-mobile-show");
    }
  });
}

// Fungsi Auto Resize Textarea (Agar form memanjang otomatis)
// Kita gunakan 'delegation' agar textarea yang baru digenerate juga kena efeknya
document.addEventListener("input", function (e) {
  if (
    e.target.tagName === "TEXTAREA" &&
    e.target.classList.contains("form-control")
  ) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }
});

// DATA DRIVEN TESTING (Generator HTML)

const testCases = [
  {
    id: "1",
    expected: 'Error Code: 401xx01\nError Message: "Access Token Invalid"',
  },
  {
    id: "2",
    expected: 'Error Code: 401xx00\nError Message: "Unauthorized Signature"',
  },
  {
    id: "3",
    expected:
      'Error Code: 400xx02\nError Message: "Invalid Mandatory Fields {.....}"',
  },
  {
    id: "4",
    expected:
      'Error Code: 400xx01\nError Message: "Invalid Field Format {.....}"',
  },
  {
    id: "5",
    expected: 'Error Code: 409xx00\nError Message: "Conflict"',
  },
  {
    id: "6",
    expected: 'Response Code: 2001600\nResponse Message: "Successful"',
  },
  {
    id: "7",
    expected: 'Response Code: 2001600\nResponse Message: "Successful"',
  },
  {
    id: "8",
    expected: 'Error Code: 4031618\nError Message: "Inactive Account"',
  },
  {
    id: "9",
    expected: 'Response Code: 2001800\nResponse Message: "Successful"',
  },
  {
    id: "10",
    expected: 'Response Code: 2001800\nResponse Message: "Successful"',
  },
  {
    id: "11",
    expected: 'Error Code: 4031814\nError Message: "Insufficient Fund"',
  },
  {
    id: "12",
    expected:
      'Error Code: 4091801\nError Message: "Duplicate Customer Reference Number"',
  },
  {
    id: "13",
    expected: 'Error Code: 2003600\nError Message: "Successful"',
  },
];

const container = document.getElementById("testCaseContainer");

function renderTestCases() {
  if (!container) return;

  let allHtml = "";

  testCases.forEach((item) => {
    allHtml += `
    <div class="col-12 col-md-1 d-flex align-items-center justify-content-left fw-bold">
            Case 8.${item.id}
        </div>
    <div class="row border-bottom pb-4 mb-4" id="caseRow_${item.id}">

        <div class="col-12 col-md-2 mb-3">
            <label class="form-label fw-bold">Expected Result:</label>
            <div class="small">
                <textarea class="form-control bg-light" rows="4" disabled>${item.expected}</textarea>
            </div>
        </div>

        <div class="col-12 col-md-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label fw-bold mb-0">Header Request:</label>
                <div class="d-flex gap-2">
                    <span id="jsonOption_${item.id}" onclick="toggleMode('${item.id}', 'json')" class="btn badge rounded-pill bg-primary" style="cursor:pointer;">Json</span>
                    <span id="manualOption_${item.id}" onclick="toggleMode('${item.id}', 'manual')" class="btn badge rounded-pill bg-secondary" style="cursor:pointer;">Manual</span>
                </div>
            </div>
            
            <textarea id="inputHeader_${item.id}" class="form-control" rows="4" placeholder="Masukkan Header JSON"></textarea>

            <div id="manualInputGroup_${item.id}" class="manual-input-group mt-2" hidden>
                <div class="manual-input-group">
            <div class="row align-items-center mb-1">
              <label
                for="inputContentType"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                Content-type:
              </label>
              <div class="col-8">
                <textarea
                  id="inputContentType_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  disabled
                >application/json</textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputAuthorization"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                Authorization:
              </label>
              <div class="col-8">
                <textarea
                  id="inputAuthorization_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan Authorization"
                ></textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputTimestamp"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                X-TIMESTAMP:
              </label>
              <div class="col-8">
                <textarea
                  id="inputTimestamp_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan X-TIMESTAMP"
                ></textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputSignature"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                X-SIGNATURE:
              </label>
              <div class="col-8">
                <textarea
                  id="inputSignature_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan X-SIGNATURE"
                ></textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputPartnerID"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                X-PARTNER-ID:
              </label>
              <div class="col-8">
                <textarea
                  id="inputPartnerID_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan X-PARTNER-ID"
                  disabled
                ></textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputExternalID"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                X-EXTERNAL-ID:
              </label>
              <div class="col-8">
                <textarea
                  id="inputExternalID_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan X-EXTERNAL-ID"
                ></textarea>
              </div>
            </div>

            <div class="row align-items-center mb-1">
              <label
                for="inputChannelID"
                class="col-4 col-form-label fw-bold text-nowrap"
              >
                CHANNEL-ID:
              </label>
              <div class="col-8">
                <textarea
                  id="inputChannelID_${item.id}"
                  class="form-control manual-form"
                  rows="1"
                  placeholder="Masukkan CHANNEL-ID"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
            </div>
        </div>

        <div class="col-12 col-md-2 mb-3">
            <label class="form-label fw-bold">Body Request:</label>
            <textarea id="inputBody_${item.id}" class="form-control" rows="4" placeholder="Masukkan Body Request"></textarea>
        </div>

        <div class="col-12 col-md-2 mb-3">
            <label class="form-label fw-bold">Response:</label>
            <textarea id="inputResponse_${item.id}" class="form-control" rows="4" placeholder="Response API"></textarea>
        </div>

        <div class="col-12 col-md-1 align-items-center mb-3 mt-5">
            <button type="button" onclick="runValidation('${item.id}')" class="btn btn-primary w-100">Validate</button>
        </div>

        <div class="col-12 col-md-2 mb-3">
             <label class="form-label fw-bold small">Validation Log:</label>
             <div id="outputResult_${item.id}" 
                  class="form-control bg-light" 
                  style="height: 120px; overflow-y: auto; font-family: monospace; font-size: 0.8rem;">
             </div>
        </div>
    </div>
    `;
  });

  container.innerHTML = allHtml;
}

// Render saat halaman diload
renderTestCases();

// LOGIC INTERAKSI

// Fungsi Toggle Button Manual/JSON
function toggleMode(id, mode) {
  const boxJson = document.getElementById(`inputHeader_${id}`);
  const boxManual = document.getElementById(`manualInputGroup_${id}`);
  const btnJson = document.getElementById(`jsonOption_${id}`);
  const btnManual = document.getElementById(`manualOption_${id}`);

  if (mode === "manual") {
    boxJson.style.display = "none";
    boxManual.removeAttribute("hidden");

    // Ubah Warna
    btnManual.classList.replace("bg-secondary", "bg-primary");
    btnJson.classList.replace("bg-primary", "bg-secondary");
  } else {
    boxJson.style.display = "block";
    boxManual.setAttribute("hidden", true);

    // Ubah Warna
    btnJson.classList.replace("bg-secondary", "bg-primary");
    btnManual.classList.replace("bg-primary", "bg-secondary");
  }
}

async function runValidation(id) {
  // 1. AMBIL ELEMEN INPUT
  const jsonHeaderBox = document.getElementById(`inputHeader_${id}`);
  const bodyInputBox = document.getElementById(`inputBody_${id}`);
  const responseInputBox = document.getElementById(`inputResponse_${id}`);

  // Perhatikan: Ini sekarang adalah DIV, bukan Textarea lagi
  const resultBox = document.getElementById(`outputResult_${id}`);

  const inputElements = [jsonHeaderBox, bodyInputBox, responseInputBox];

  // 2. RESET STYLE SEBELUM MULAI
  inputElements.forEach((el) => el.classList.remove("is-valid", "is-invalid"));

  // UI Loading (Pakai innerHTML)
  resultBox.innerHTML =
    '<span class="text-primary spinner-border spinner-border-sm"></span> Validating...';

  // Ambil Value
  const headerVal = jsonHeaderBox.value;
  const bodyVal = bodyInputBox.value;
  const responseVal = responseInputBox.value;

  // 3. KONFIGURASI API
  const createOptions = (data) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data || "{}",
  });

  // URL API
  const urlHeader = `http://localhost:8080/interbank/req/header/case${id}`;
  const urlBody = `http://localhost:8080/interbank/req/body/case${id}`;
  const urlResp = `http://localhost:8080/interbank/resp/case${id}`;

  try {
    // 4. HIT 3 API PARALEL
    const responses = await Promise.all([
      fetch(urlHeader, createOptions(headerVal)),
      fetch(urlBody, createOptions(bodyVal)),
      fetch(urlResp, createOptions(responseVal)),
    ]);

    const results = await Promise.all(
      responses.map(async (res) => ({
        httpCode: res.status,
        data: await res.json(),
      }))
    );

    // 5. LOGIKA PEWARNAAN TEXT (LOG BOX)
    // Kita bangun string HTML, bukan string biasa
    let logHtml = "";

    // Variabel untuk cek kesimpulan akhir
    let isAllPassed = true;

    results.forEach((item, index) => {
      const type = ["Header", "Body", "Response"][index]; // Label
      const currentInput = inputElements[index]; // Input terkait

      let message = "";
      let colorClass = "";
      let icon = "";

      // Cek Status per Item
      if (item.httpCode === 200 && item.data.status === "OK") {
        // SUKSES
        message = item.data.message;
        colorClass = "text-success"; // Class Bootstrap untuk Hijau
        icon = "✅";

        // Hijaukan Border Input
        currentInput.classList.add("is-valid");
      } else {
        // GAGAL
        isAllPassed = false; // Tandai ada yang gagal
        colorClass = "text-danger"; // Class Bootstrap untuk Merah
        icon = "❌";

        if (item.httpCode === 400) message = "Bad Request";
        else if (item.httpCode === 500) message = "Internal Server Error";
        else message = item.data.message || "Unknown Error";

        // Merahkan Border Input
        currentInput.classList.add("is-invalid");
      }

      // Tambahkan baris log ke HTML
      // fw-bold agar label tebal, small agar rapi
      logHtml += `
            <div class="${colorClass} mb-1 border-bottom pb-1">
                <strong>[${type}]</strong> ${icon}<br>
                HTTP ${item.httpCode}: ${message}
            </div>
        `;
    });

    // 6. TAMBAHKAN KESIMPULAN (SUMMARY) DI ATAS LOG
    let summaryHtml = "";
    if (isAllPassed) {
      summaryHtml = `<div class="alert alert-success py-1 fw-bold text-center">RESULT: PASSED</div>`;
    } else {
      summaryHtml = `<div class="alert alert-danger py-1 fw-bold text-center">RESULT: FAILED</div>`;
    }

    // 7. RENDER KE LAYAR
    resultBox.innerHTML = summaryHtml + logHtml;
  } catch (error) {
    console.error(`[Case ${id}] Error:`, error);
    resultBox.innerHTML = `<div class="text-danger fw-bold">Connection Error: ${error.message}</div>`;
  }
}
