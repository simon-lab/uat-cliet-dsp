async function runValidation(id) {
  // 1. AMBIL ELEMEN INPUT
  const urlBox = document.getElementById(`urlEndpoint_${id}`);
  const jsonHeaderBox = document.getElementById(`inputHeader_${id}`);
  const manualGroupBox = document.getElementById(`manualInputGroup_${id}`);
  const bodyInputBox = document.getElementById(`inputBody_${id}`);
  const responseInputBox = document.getElementById(`inputResponse_${id}`);
  const resultBox = document.getElementById(`outputResult_${id}`);

  const inputElements = [urlBox, jsonHeaderBox, bodyInputBox, responseInputBox];

  // 2. RESET STYLE
  inputElements.forEach((el) => el.classList.remove("is-valid", "is-invalid"));
  manualGroupBox
    .querySelectorAll("textarea")
    .forEach((el) => el.classList.remove("is-valid", "is-invalid"));

  // UI Loading
  resultBox.innerHTML =
    '<span class="text-primary spinner-border spinner-border-sm"></span> Validating...';

  // 3. LOGIKA HEADER (MANUAL vs JSON)
  let headerVal = "";
  const isManualMode = jsonHeaderBox.style.display === "none";

  if (isManualMode) {
    const contentType = document.getElementById(`inputContentType_${id}`).value;
    const authorization = document.getElementById(
      `inputAuthorization_${id}`
    ).value;
    const timestamp = document.getElementById(`inputTimestamp_${id}`).value;
    const signature = document.getElementById(`inputSignature_${id}`).value;
    const partnerID = document.getElementById(`inputPartnerID_${id}`).value;
    const externalID = document.getElementById(`inputExternalID_${id}`).value;
    const channelID = document.getElementById(`inputChannelID_${id}`).value;

    const headerObj = {
      "Content-Type": contentType,
      Authorization: authorization,
      "X-TIMESTAMP": timestamp,
      "X-SIGNATURE": signature,
      "X-PARTNER-ID": partnerID,
      "X-EXTERNAL-ID": externalID,
      "CHANNEL-ID": channelID,
    };
    headerVal = JSON.stringify(headerObj, null, 2);
  } else {
    headerVal = jsonHeaderBox.value;
  }

  // Ambil URL & Body & Response
  const urlBoxVal = document.getElementById(`urlEndpoint_${id}`).value;
  const endPointObj = { UrlEndpoint: urlBoxVal };
  const urlVal = JSON.stringify(endPointObj, null, 2);
  const bodyVal = bodyInputBox.value;
  const responseVal = responseInputBox.value;

  // 4. KONFIGURASI API
  const createOptions = (data) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data || "{}",
  });

  const urlEndpoint = `http://localhost:8080/${typeAPI}/req/url/case${id}`;
  const urlHeader = `http://localhost:8080/${typeAPI}/req/header/case${id}`;
  const urlBody = `http://localhost:8080/${typeAPI}/req/body/case${id}`;
  const urlResp = `http://localhost:8080/${typeAPI}/resp/case${id}`;

  try {
    // 5. HIT 4 API PARALEL
    const responses = await Promise.all([
      fetch(urlEndpoint, createOptions(urlVal)),
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

    // 6. LOGIKA PEWARNAAN & FORMATTING
    let logHtml = "";
    let isAllPassed = true;

    results.forEach((item, index) => {
      const type = ["Url", "Header", "Body", "Response"][index];

      // Tentukan elemen input mana yang harus diwarnai
      let currentInput;
      if (index === 1 && isManualMode) {
        // Index 1 adalah Header
        currentInput = manualGroupBox;
      } else {
        currentInput = inputElements[index];
      }

      let message = "";
      let colorClass = "";
      let icon = "";

      // --- CEK STATUS ---
      if (item.httpCode === 200 && item.data.status === "OK") {
        // SUKSES
        message = item.data.message;
        colorClass = "text-success";
        icon = "✅";
        if (currentInput) currentInput.classList.add("is-valid");

        if (index === 1 && isManualMode) {
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

        if (currentInput) currentInput.classList.add("is-invalid");

        if (index === 1 && isManualMode) {
          manualGroupBox.classList.add(
            "border",
            "border-danger",
            "p-2",
            "rounded"
          );
        }
      }

      // --- LOGIKA FORMAT MESSAGE LIST (BARU) ---
      // Jika pesan adalah string dan mengandung koma, kita jadikan list
      if (message && typeof message === "string" && message.includes(", ")) {
        // 1. Pecah string berdasarkan ", "
        const msgList = message.split(", ");

        // 2. Bungkus setiap item dengan <li>
        const listItems = msgList.map((msg) => `<li>${msg}</li>`).join("");

        // 3. Bungkus dengan <ol> (Ordered List)
        // class ps-3: padding left bootstrap biar angka masuk ke dalam
        // class mb-0: hilangkan margin bawah biar rapi
        message = `<ol class="ps-3 mb-0" style="list-style-type: decimal;">${listItems}</ol>`;
      }

      // Generate HTML Log
      logHtml += `
            <div class="${colorClass} mb-1 border-bottom pb-1">
                <strong>[${type}]</strong> ${icon}<br>
                HTTP ${item.httpCode}: 
                <div class="mt-1">${message}</div>
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
