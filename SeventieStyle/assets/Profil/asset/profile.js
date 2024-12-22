document.getElementById("profileForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const shopName = document.getElementById("shopName").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const birthDate = document.getElementById("birthDate").value;

    // Simpan data ke localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("shopName", shopName);
    localStorage.setItem("gender", gender);
    localStorage.setItem("birthDate", birthDate);

    alert("Profile updated successfully!");
});

