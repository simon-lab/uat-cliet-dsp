document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // 1. Mencegah halaman refresh otomatis saat klik Masuk

    // 2. Ambil nilai dari input HTML
    const usernameVal = document.getElementById("username").value;
    const passwordVal = document.getElementById("password").value;
    const errorAlert = document.getElementById("errorAlert");
    const submitBtn = document.querySelector("button[type='submit']");

    // Reset alert
    errorAlert.classList.add("d-none");
    errorAlert.innerText = "";

    // Ubah tombol jadi Loading...
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Loading...";
    submitBtn.disabled = true;

    // 3. Siapkan Data JSON untuk dikirim ke Backend Java
    const loginData = {
      username: usernameVal,
      password: passwordVal,
    };

    try {
      // 4. Kirim Request ke Backend (Spring Boot)
      // Pastikan URL ini sesuai dengan Controller Java Anda
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        // === SKENARIO SUKSES ===
        console.log("Login Berhasil:", result);

        // Opsional: Simpan token/username ke penyimpanan browser (Session)
        sessionStorage.setItem("userToken", result.token || "dummy-token");
        sessionStorage.setItem("username", usernameVal);

        // Redirect ke halaman landing
        window.location.href = "landing.html";
      } else {
        // === SKENARIO GAGAL (Password Salah / User tidak ditemukan) ===
        showError(result.message || "Username atau Password salah!");
      }
    } catch (error) {
      // === SKENARIO ERROR KONEKSI ===
      console.error("Error:", error);
      showError("Gagal terhubung ke server");
    } finally {
      // Kembalikan tombol seperti semula
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }

    // Fungsi Helper untuk menampilkan pesan merah
    function showError(msg) {
      errorAlert.innerText = msg;
      errorAlert.classList.remove("d-none");
    }
  });
