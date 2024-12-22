document.addEventListener("DOMContentLoaded", function () {
    // Elemen form
    const forms = {
        indexForm: document.getElementById("registerForm"),
        loginForm: document.getElementById("loginForm"),
        lupaForm: document.getElementById("lupaForm"),
    };

    const inputs = {
        fullName: document.getElementById("fullName"),
        email: document.getElementById("email"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword"),
        passwordConfirm: document.getElementById("passwordConfirm"),
        captchaInput: document.getElementById("captchaInput"),
    };

    const charCountElements = {
        password: document.getElementById("passwordCount"),
        confirmPassword: document.getElementById("confirmPasswordCount"),
    };

    const captchaQuestionElement = document.getElementById("captchaQuestion");
    let captchaAnswer;

    // Fungsi untuk membuat CAPTCHA
    function generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaAnswer = captcha;
        captchaQuestionElement.innerText = captcha;
    }

    // Panggil fungsi CAPTCHA saat halaman dimuat
    generateCaptcha();

    // Event Listener untuk karakter counter
    const inputFields = [
        inputs.password,
        inputs.confirmPassword,
    ];

    inputFields.forEach((input) => {
        if (input) {
            input.addEventListener("input", function () {
                const countElement = charCountElements[input.id];
                if (countElement) {
                    countElement.textContent = `${input.value.length}/${input.maxLength}`;
                }
            });
        }
    });

    // Event Listener untuk Registrasi
    if (forms.indexForm) {
        forms.indexForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName = inputs.fullName.value.trim();
            const email = inputs.email.value.trim();
            const password = inputs.password.value.trim();
            const confirmPassword = inputs.confirmPassword.value.trim();
            const captchaValue = inputs.captchaInput.value.trim();

            if (captchaValue !== captchaAnswer) {
                alert("CAPTCHA salah! Silakan coba lagi.");
                generateCaptcha();
                return;
            }

            if (password !== confirmPassword) {
                alert("Password dan konfirmasi password tidak cocok!");
                return;
            }

            // Simpan data ke localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            localStorage.setItem("userFullName", fullName);

            alert("Registrasi berhasil!");
            window.location.href = "login.html";
        });
    }

    // Event Listener untuk Login
    if (forms.loginForm) {
        forms.loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = inputs.email.value.trim();
            const password = inputs.password.value.trim();
            const captchaValue = inputs.captchaInput.value.trim();

            // Ambil data dari localStorage
            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (captchaValue !== captchaAnswer) {
                alert("CAPTCHA salah! Silakan coba lagi.");
                generateCaptcha();
                return;
            }

            if (email === storedEmail && password === storedPassword) {
                alert("Login berhasil! Selamat datang di SeventiesStyle!");
                window.location.href = "home.html"; // Redirect ke halaman tujuan
            } else {
                alert("Email atau password salah. Silakan coba lagi.");
            }
        });
    }

    // Event Listener untuk Lupa Password
    if (forms.lupaForm) {
        forms.lupaForm.addEventListener("submit", function (event) {
            event.preventDefault();
    
            const email = inputs.email.value.trim();
            const password = inputs.password.value.trim();
            const confirmPassword = inputs.passwordConfirm.value.trim();
            const captchaValue = inputs.captchaInput.value.trim();
    
            // Validasi email
            if (!email) {
                alert("Email tidak boleh kosong.");
                return;
            }
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Email tidak valid. Pastikan format email benar.");
                return;
            }
    
            // Validasi password
            const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{14,}$/;
            if (!password) {
                alert("Password tidak boleh kosong.");
                return;
            }
            if (!passwordRegex.test(password)) {
                alert("Password harus minimal 14 karakter, mengandung huruf, angka, dan simbol (!@#$%^&*).");
                return;
            }
    
            if (password !== confirmPassword) {
                alert("Password dan konfirmasi password tidak sama.");
                return;
            }
    
            // Validasi CAPTCHA
            if (captchaValue !== captchaAnswer) {
                alert("CAPTCHA salah! Harap coba lagi.");
                generateCaptcha();
                return;
            }
    
            // Ambil data dari localStorage
            const storedEmail = localStorage.getItem("userEmail");
    
            // Cek apakah email sudah terdaftar
            if (email !== storedEmail) {
                alert("Email tidak ditemukan. Pastikan email yang dimasukkan sudah terdaftar.");
                return;
            }
    
            // Update password di localStorage
            localStorage.setItem("userPassword", password);
    
            alert("Password berhasil diperbarui!");
            window.location.href = "login.html";
        });
    }    
});
