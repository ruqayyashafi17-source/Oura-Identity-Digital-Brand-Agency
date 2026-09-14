function sendWhatsApp() {
    const name = document.getElementById('clientName').value.trim();
    const query = document.getElementById('clientQuery').value.trim();
    const status = document.getElementById('statusMessage');

    if (!name || !query) {
        status.style.color = "#f87171";
        status.innerText = "Please fill in your name and project details!";
        return;
    }

    status.style.color = "#34d399";
    status.innerText = "Opening WhatsApp...";

    // Apna WhatsApp number yahan likhein (country code ke sath, bina +, misal ke tor par: 923000000000)
    const phoneNumber = "923000000000"; 
    const text = `Hi Oura Identity, my name is \({name}.\){query}`;
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/\({phoneNumber}?text=\){encodedText}`, '_blank');
}

async function sendEmailAI() {
    const name = document.getElementById('clientName').value.trim();
    const contact = document.getElementById('clientContact').value.trim();
    const query = document.getElementById('clientQuery').value.trim();
    const status = document.getElementById('statusMessage');

    if (!name || !contact || !query) {
        status.style.color = "#f87171";
        status.innerText = "Please fill in all fields to receive the AI reply!";
        return;
    }

    status.style.color = "#c4b5fd";
    status.innerText = "Processing through AI agent...";

    // Yahan apna n8n webhook URL paste karein
    const webhookUrl = "YOUR_N8N_WEBHOOK_URL_HERE";

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact, query })
        });

        if (response.ok) {
            status.style.color = "#34d399";
            status.innerText = "Inquiry sent! Check your email for the AI auto-reply.";
        } else {
            status.style.color = "#f87171";
            status.innerText = "Failed to connect. Check your n8n webhook URL.";
        }
    } catch (error) {
        status.style.color = "#f87171";
        status.innerText = "Network error. Please check your connection.";
    }
}