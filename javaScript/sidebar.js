const toggleBtn = document.getElementById("sidebarToggle");

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

function setActiveSidebar(activeBtn) {
  // Hapus class active dari semua menu
  document.querySelectorAll(".list-group-item").forEach((btn) => {
    btn.classList.remove("bg-primary", "text-white");
    btn.classList.add("text-light"); // Kembali ke warna asal
  });

  // Tambah class active ke tombol yang diklik
  activeBtn.classList.remove("bg-transparent", "text-light");
  activeBtn.classList.add("bg-primary", "text-white");
}

const btnInterbank = document.getElementById("interbankBtn");
const btnBalance = document.getElementById("balanceBtn");
const btnGuide = document.getElementById("guideBtn");

// --- EVENT LISTENERS ---
// 1. Logic untuk tombol Guide
if (btnGuide) {
  btnGuide.addEventListener("click", function (e) {
    e.preventDefault();

    // Logic Switch Tampilan
    testingArea.classList.add("d-none");
    guideArea.classList.remove("d-none");

    // PANGGIL FUNGSI LOAD DISINI
    // Jadi guide baru didownload saat user klik tombolnya (Lazy Load)
    loadGuideContent();

    setActiveSidebar(this);
  });
}

if (btnInterbank) {
  btnInterbank.addEventListener("click", function (e) {
    e.preventDefault();
    currentCategory = "interbank";
    pageTitle.innerText = "Interbank Transfer Test";
    testingArea.classList.remove("d-none");
    guideArea.classList.add("d-none");
    renderTestCases(); // Re-render
    setActiveSidebar(this);
  });
}

if (btnBalance) {
  btnBalance.addEventListener("click", function (e) {
    e.preventDefault();
    currentCategory = "balance";
    pageTitle.innerText = "Balance Services Test";
    testingArea.classList.remove("d-none");
    guideArea.classList.add("d-none");
    renderTestCases(); // Re-render
    setActiveSidebar(this);
  });
}
