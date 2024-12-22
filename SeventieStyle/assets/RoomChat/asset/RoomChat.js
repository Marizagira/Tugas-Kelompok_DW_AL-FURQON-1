const chatBody = document.getElementById("chat-body");
    const sendButton = document.getElementById("send-btn");
    const messageInput = document.getElementById("message-input");

    // Ambil data produk dari localStorage
    const productName = localStorage.getItem("productName");
    const productPrice = localStorage.getItem("productPrice");

    if (productName && productPrice) {
      const productMessage = document.createElement("div");
      productMessage.classList.add("chat-message", "received");
      productMessage.innerHTML = `
        Anda tertarik dengan produk <strong>${productName}</strong> seharga <strong>${productPrice}</strong>. Ada yang bisa kami bantu?
      `;
      chatBody.appendChild(productMessage);
      localStorage.removeItem("productName");
      localStorage.removeItem("productPrice");
    }

    function goToChat(productName, price) {
      // Simpan data produk ke localStorage
      localStorage.setItem('productName', productName);
      localStorage.setItem('productPrice', price);
  
      // Arahkan ke halaman chat
      window.location.href = "RCjimmy.html";
    }
    // Fungsi kirim pesan
    sendButton.addEventListener("click", () => {
      const text = messageInput.value.trim();
      if (text) {
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "sent");
        userMessage.textContent = text;
        chatBody.appendChild(userMessage);
        messageInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });