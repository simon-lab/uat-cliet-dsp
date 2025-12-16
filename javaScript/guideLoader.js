// --- FUNGSI LOAD HTML EKSTERNAL ---
async function loadGuideContent() {
  const guideContainer = document.getElementById("guideArea");

  // Cek apakah konten sudah pernah diload? Kalau sudah ada isinya, jangan load lagi (biar hemat)
  if (guideContainer.innerHTML.trim() !== "") {
    return;
  }

  try {
    // Ambil file guide.html
    const response = await fetch("guide.html");

    if (response.ok) {
      // Ubah jadi text
      const htmlContent = await response.text();
      // Masukkan ke dalam div
      guideContainer.innerHTML = htmlContent;
      console.log("Guide loaded successfully");
    } else {
      guideContainer.innerHTML =
        "<p class='text-danger'>Gagal memuat panduan.</p>";
    }
  } catch (error) {
    console.error("Error loading guide:", error);
  }
}
