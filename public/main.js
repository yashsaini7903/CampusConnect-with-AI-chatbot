
  function submitItem() {
    const title = document.getElementById('itemTitle').value;
    const desc = document.getElementById('itemDesc').value;
    if (!title || !desc) return alert("Please fill in both fields.");
  
    const itemCard = document.createElement("div");
    itemCard.className = "item-card";
    itemCard.innerHTML = `<h3>${title}</h3><p>Just now</p><p>${desc}</p>`;
  
    document.getElementById("itemsContainer").prepend(itemCard);
    document.getElementById("itemTitle").value = "";
    document.getElementById("itemDesc").value = "";
  }
  
  function searchItems() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const items = document.querySelectorAll('#itemsContainer .item-card');
    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(query) ? 'block' : 'none';
    });
  }
  
  function switchTab(tabId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');
  
  const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(buttons).find(btn => btn.textContent.replace(/ /g,'').toLowerCase().includes(tabId.toLowerCase()));
    if (activeBtn) activeBtn.classList.add('active');
  }
  
document.getElementById('search-button').addEventListener('click', function() {
    showSection('search');
});
  
  // Chatbot functionality for the Smart Search section
  
  async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
  
    appendMessage('user', message);
    input.value = '';
  
    try {
      const res = await fetch('https://campusconnect-qg7w.onrender.com2/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
  
      const data = await res.json();
      if (data.reply) {
        appendMessage('bot', data.reply);
      } else {
        appendMessage('bot', 'Error: No reply received.');
      }
    } catch (err) {
      console.error(err);
      appendMessage('bot', 'Server error. Please try again later.');
    }
  }
  
  function appendMessage(sender, text) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.innerHTML = `<span class="${sender}">${sender === 'user' ? 'You' : 'Gemini'}:</span> ${text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  // Frontend JavaScript code
console.log("Frontend script loaded!");

// You can add your frontend logic here, e.g.,:
// - Event listeners for user interactions
// - Fetch requests to your backend API
// - DOM manipulation to update the UI
