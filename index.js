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

const interbankTestCases = [
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

const balanceTestCases = [
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
    expected: 'Response Code: 2001100\nResponse Message: "Successful"',
  },
  {
    id: "7",
    expected: 'Response Code: 2001100\nResponse Message: "Successful"',
  },
  {
    id: "8",
    expected: 'Response Code: 4031118\nError Message: "Account Inactive"',
  },
  {
    id: "9",
    expected:
      'Response Code: 4011100\nResponse Message: " Invalid Access Token Scope"',
  },
  {
    id: "10",
    expected: 'Response Code: 4031105\nResponse Message: "Do Not Honor"',
  },
  {
    id: "11",
    expected: 'Error Code: 4011102\nError Message: "Invalid Customer Token"',
  },
];

// --- STATE MANAGEMENT ---
// Default category
let currentCategory = "interbank";

// --- DOM ELEMENTS ---
const container = document.getElementById("testCaseContainer");
const btnInterbank = document.getElementById("interbankBtn");
const btnBalance = document.getElementById("balanceBtn");

// // Listener untuk Channel ID Global
// const partnerId = document.getElementById("partnerId")?.value || "";
// if (partnerId) {
//   partnerId.addEventListener("input", function () {
//     // Cari semua textarea partner ID yang ada di halaman dan update nilainya
//     document.querySelectorAll('[id^="inputPartnerID_"]').forEach((el) => {
//       el.value = this.value;
//     });
//   });
// }

// // Listener untuk Channel ID Global
// const channelId = document.getElementById("channelId").value || "";
// if (channelId) {
//   channelId.addEventListener("input", function () {
//     // Cari semua textarea channel ID yang ada di halaman dan update nilainya
//     document.querySelectorAll('[id^="inputChannelID_"]').forEach((el) => {
//       el.value = this.value;
//     });
//   });
// }

// --- EVENT LISTENERS ---
if (btnInterbank) {
  btnInterbank.addEventListener("click", function (e) {
    e.preventDefault();
    currentCategory = "interbank";
    pageTitle.innerText = "Interbank Transfer Test";
    renderTestCases(); // Re-render
  });
}

if (btnBalance) {
  btnBalance.addEventListener("click", function (e) {
    e.preventDefault();
    currentCategory = "balance";
    pageTitle.innerText = "Balance Services Test";
    renderTestCases(); // Re-render
  });
}

// Listener Global Input (Partner & Channel ID)
// Script ini akan mengupdate semua input case secara otomatis saat Anda mengetik di input global
const globalInputs = ["partnerId", "channelId"];

globalInputs.forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", function () {
      // Tentukan target ID prefix berdasarkan input global mana yang diketik
      const targetPrefix =
        id === "partnerId" ? "inputPartnerID_" : "inputChannelID_";

      // Update semua textarea yang relevan di dalam list case
      document
        .querySelectorAll(`[id^="${targetPrefix}"]`)
        .forEach((textarea) => {
          textarea.value = this.value;
        });
    });
  }
});

let typeAPI = "";
function renderTestCases() {
  if (!container) return;

  // 1. Determine which data to use based on state
  let dataToRender = [];
  let prefix = "";
  let title = "";

  const partnerElem = document.getElementById("partnerId");
  const channelElem = document.getElementById("channelId");

  const partnerId = partnerElem ? partnerElem.value : "";
  const channelId = channelElem ? channelElem.value : "";

  if (currentCategory === "interbank") {
    dataToRender = interbankTestCases;
    prefix = "8.";
    title = "Interbank Transfer Test";
    typeAPI = "interbank";
  } else {
    dataToRender = balanceTestCases;
    prefix = "3.";
    title = "Balance Services Test";
    typeAPI = "balance";
  }

  console.log(`Ini TypeAPI nya:`, typeAPI);
  // 2. Generate HTML
  let allHtml = "";

  dataToRender.forEach((item) => {
    allHtml += `
    <div class="row"">
                <div class="col-12 col-md-1 d-flex align-items-center justify-content-left fw-bold">
                Case ${prefix}${item.id}
            </div>
            
            <div class="col-12 col-md-4 d-flex align-items-center justify-content-left fw-bold mb-3">
            <div class="me-3">
            <label class="form-label fw-bold text-nowrap">Url Endpoint:</label>
            </div>
                <textarea class="form-control" id="urlEndpoint_${item.id}" rows="1"></textarea>
            </div>
            </div>
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
                
                <textarea id="inputHeader_${item.id}" class="form-control" rows="4" placeholder="Header JSON"></textarea>

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
                >${partnerId}</textarea>
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
                >${channelId}</textarea>
              </div>
            </div>
          </div>
                </div>
            </div>

            <div class="col-12 col-md-2 mb-3">
                <label class="form-label fw-bold">Body Request:</label>
                <textarea id="inputBody_${item.id}" class="form-control" rows="4" placeholder="Body JSON"></textarea>
            </div>

            <div class="col-12 col-md-2 mb-3">
                <label class="form-label fw-bold small">Response:</label>
                <textarea id="inputResponse_${item.id}" class="form-control" rows="4" placeholder="Response API"></textarea>
            </div>

            <div class="col-12 col-md-1 align-items-center mb-3 mt-5">
                <button type="button" onclick="runValidation('${item.id}')" class="btn btn-primary w-100">Validate</button>
            </div>

            <div class="col-12 col-md-2 mb-3">
                 <label class="form-label fw-bold small">Log:</label>
                 <div id="outputResult_${item.id}" class="form-control bg-light" style="min-height: 120px; height: auto; overflow-y: auto; font-size: 0.8rem;"></div>
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
  const manualGroupBox = document.getElementById(`manualInputGroup_${id}`);

  const bodyInputBox = document.getElementById(`inputBody_${id}`);
  const responseInputBox = document.getElementById(`inputResponse_${id}`);

  const resultBox = document.getElementById(`outputResult_${id}`);

  const inputElements = [jsonHeaderBox, bodyInputBox, responseInputBox];

  // 2. RESET STYLE SEBELUM MULAI
  // Hapus validasi lama
  inputElements.forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  // Hapus juga validasi di dalam manual group (jika ada)
  manualGroupBox
    .querySelectorAll("textarea")
    .forEach((el) => el.classList.remove("is-valid", "is-invalid"));

  // UI Loading
  resultBox.innerHTML =
    '<span class="text-primary spinner-border spinner-border-sm"></span> Validating...';

  // 3. LOGIKA PENENTUAN HEADER (MANUAL vs JSON)
  let headerVal = "";

  // Cek apakah mode JSON sedang sembunyi? (Artinya mode Manual aktif)
  const isManualMode = jsonHeaderBox.style.display === "none";

  if (isManualMode) {
    // --- MODE MANUAL: GABUNGKAN FIELD JADI JSON ---
    // Ambil value dari masing-masing input manual berdasarkan ID uniknya
    const contentType = document.getElementById(`inputContentType_${id}`).value;
    const authorization = document.getElementById(
      `inputAuthorization_${id}`
    ).value;
    const timestamp = document.getElementById(`inputTimestamp_${id}`).value;
    const signature = document.getElementById(`inputSignature_${id}`).value;
    const partnerID = document.getElementById(`inputPartnerID_${id}`).value;
    const externalID = document.getElementById(`inputExternalID_${id}`).value;
    const channelID = document.getElementById(`inputChannelID_${id}`).value;

    // Buat Object JS
    const headerObj = {
      "Content-Type": contentType,
      Authorization: authorization,
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": signature,
      "X-PARTNER-ID": partnerID,
      "X-EXTERNAL-ID": externalID,
      "CHANNEL-ID": channelID,
    };

    // Ubah Object jadi String JSON (Pretty Print)
    headerVal = JSON.stringify(headerObj, null, 2);

    console.log(`[Case ${id}] Generated Header JSON from Manual:`, headerVal);
  } else {
    // --- MODE JSON: AMBIL LANGSUNG ---
    headerVal = jsonHeaderBox.value;
    console.log(`[Case ${id}] Generated Header JSON from json:`, headerVal);
  }

  // Ambil Body & Response
  const bodyVal = bodyInputBox.value;
  const responseVal = responseInputBox.value;

  console.log(`[Case ${id}] Body JSON:`, bodyVal);
  console.log(`[Case ${id}] Body JSON:`, responseVal);
  // 4. KONFIGURASI API
  const createOptions = (data) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data || "{}",
  });

  const urlHeader = `http://localhost:8080/${typeAPI}/req/header/case${id}`;
  const urlBody = `http://localhost:8080/${typeAPI}/req/body/case${id}`;
  const urlResp = `http://localhost:8080/${typeAPI}/resp/case${id}`;

  try {
    // 5. HIT 3 API PARALEL
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

    // 6. LOGIKA PEWARNAAN TEXT (LOG BOX)
    let logHtml = "";
    let isAllPassed = true;

    results.forEach((item, index) => {
      const type = ["Header", "Body", "Response"][index];

      // Tentukan elemen input mana yang harus diwarnai
      let currentInput;
      if (index === 0 && isManualMode) {
        currentInput = manualGroupBox;
      } else {
        currentInput = inputElements[index];
      }

      let message = "";
      let colorClass = "";
      let icon = "";

      if (item.httpCode === 200 && item.data.status === "OK") {
        // SUKSES
        message = item.data.message;
        colorClass = "text-success";
        icon = "✅";
        if (currentInput) currentInput.classList.add("is-valid"); // Tambah border hijau (jika elemen ada)

        // Khusus Manual Mode: Jika sukses, kita bisa hilangkan border merah di input kecil-kecil
        if (index === 0 && isManualMode) {
          manualGroupBox.classList.remove("border", "border-danger");
        }
      } else {
        // GAGAL
        isAllPassed = false;
        colorClass = "text-danger";
        icon = "❌";

        if (item.httpCode === 400) message = "Bad Request";
        else if (item.httpCode === 500) message = "Internal Server Error";
        else message = item.data.message || "Unknown Error";

        if (currentInput) currentInput.classList.add("is-invalid"); // Tambah border merah

        // Khusus Manual Mode: Beri highlight merah di container manual jika header gagal
        if (index === 0 && isManualMode) {
          manualGroupBox.classList.add(
            "border",
            "border-danger",
            "p-2",
            "rounded"
          );
        }
      }

      logHtml += `
            <div class="${colorClass} mb-1 border-bottom pb-1">
                <strong>[${type}]</strong> ${icon}<br>
                HTTP ${item.httpCode}: ${message}
            </div>
        `;
    });

    // 7. SUMMARY
    let summaryHtml = "";
    if (isAllPassed) {
      summaryHtml = `<div class="alert alert-success py-1 fw-bold text-center">RESULT: PASSED</div>`;
    } else {
      summaryHtml = `<div class="alert alert-danger py-1 fw-bold text-center">RESULT: FAILED</div>`;
    }

    resultBox.innerHTML = summaryHtml + logHtml;
  } catch (error) {
    console.error(`[Case ${id}] Error:`, error);
    resultBox.innerHTML = `<div class="text-danger fw-bold">Connection Error: ${error.message}</div>`;
  }
}
