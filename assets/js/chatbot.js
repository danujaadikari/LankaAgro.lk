// LankaAgro.lk Chatbot
class Chatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.addBotMessage("Hello! 👋 Welcome to LankaAgro.lk. How can I help you today?", true);
  }

  createChatbotHTML() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chatbot-toggle" id="chatbotToggle" aria-label="Toggle chatbot">
          <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            <circle cx="8" cy="10" r="1.5"/>
            <circle cx="12" cy="10" r="1.5"/>
            <circle cx="16" cy="10" r="1.5"/>
          </svg>
          <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-avatar">🌾</div>
            <div class="chatbot-header-text">
              <h3>LankaAgro Assistant</h3>
              <p>Online now</p>
            </div>
          </div>

          <div class="chatbot-messages" id="chatbotMessages"></div>

          <div class="chatbot-input-area">
            <input 
              type="text" 
              class="chatbot-input" 
              id="chatbotInput" 
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button class="chatbot-send-btn" id="chatbotSend" aria-label="Send message">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbotToggle');
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');

    toggle.addEventListener('click', () => this.toggleChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const toggle = document.getElementById('chatbotToggle');
    const window = document.getElementById('chatbotWindow');
    
    toggle.classList.toggle('active');
    window.classList.toggle('active');

    if (this.isOpen) {
      document.getElementById('chatbotInput').focus();
    }
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (!message) return;

    this.addUserMessage(message);
    input.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    // Simulate bot response after delay
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.getBotResponse(message);
      this.addBotMessage(response);
    }, 1000 + Math.random() * 1000);
  }

  addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageHTML = `
      <div class="message user">
        <div class="message-avatar">U</div>
        <div class="message-content">${this.escapeHtml(text)}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
  }

  addBotMessage(text, showQuickReplies = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageHTML = `
      <div class="message bot">
        <div class="message-avatar">🌾</div>
        <div class="message-content">${this.escapeHtml(text)}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

    if (showQuickReplies) {
      this.addQuickReplies();
    }

    this.scrollToBottom();
  }

  addQuickReplies() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const quickRepliesHTML = `
      <div class="quick-replies">
        <button class="quick-reply-btn" onclick="chatbot.handleQuickReply('Products')">Products</button>
        <button class="quick-reply-btn" onclick="chatbot.handleQuickReply('Pricing')">Pricing</button>
        <button class="quick-reply-btn" onclick="chatbot.handleQuickReply('Contact')">Contact Us</button>
        <button class="quick-reply-btn" onclick="chatbot.handleQuickReply('Help')">Help</button>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', quickRepliesHTML);
    this.scrollToBottom();
  }

  handleQuickReply(reply) {
    // Remove quick replies
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) quickReplies.remove();

    // Send as user message
    this.addUserMessage(reply);
    
    // Show typing indicator
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.getBotResponse(reply);
      this.addBotMessage(response);
    }, 1000);
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingHTML = `
      <div class="message bot typing-message">
        <div class="message-avatar">🌾</div>
        <div class="message-content typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typing = document.querySelector('.typing-message');
    if (typing) typing.remove();
  }

  getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! How can I assist you with LankaAgro.lk today? 😊";
    }

    // Products
    if (lowerMessage.includes('product') || lowerMessage.includes('item') || lowerMessage.includes('sell')) {
      return "We offer a wide range of agricultural products including seeds, fertilizers, tools, and organic farming supplies. Would you like to know more about a specific category?";
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return "Our prices are competitive and vary by product. You can browse our catalog for specific pricing or contact our sales team for bulk orders and special discounts.";
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return "You can reach us at:\n📧 Email: info@lankaagro.lk\n📞 Phone: +94 11 234 5678\n🕒 Business Hours: Mon-Sat, 8:00 AM - 6:00 PM";
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist')) {
      return "I'm here to help! You can ask me about:\n• Our products and services\n• Pricing information\n• Contact details\n• Account and ordering\n• Shipping and delivery";
    }

    // Shipping
    if (lowerMessage.includes('ship') || lowerMessage.includes('deliver') || lowerMessage.includes('delivery')) {
      return "We offer island-wide delivery across Sri Lanka. Standard delivery takes 3-5 business days. Express delivery is also available for urgent orders. Shipping costs vary based on location and order size.";
    }

    // Account
    if (lowerMessage.includes('account') || lowerMessage.includes('sign up') || lowerMessage.includes('register')) {
      return "You can create an account on our website to track orders, save favorites, and get exclusive deals. Click the 'Sign Up' button to get started!";
    }

    // Order
    if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need an account to complete the purchase. We accept multiple payment methods including cards and bank transfers.";
    }

    // Payment
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept various payment methods:\n• Credit/Debit Cards\n• Bank Transfers\n• Mobile Payment (Dialog, Mobitel)\n• Cash on Delivery (for eligible orders)";
    }

    // Organic
    if (lowerMessage.includes('organic') || lowerMessage.includes('natural')) {
      return "Yes! We have a dedicated range of certified organic products including seeds, fertilizers, and pest control solutions. These products are eco-friendly and perfect for sustainable farming.";
    }

    // Thanks
    if (lowerMessage.match(/thank|thanks|thx/)) {
      return "You're welcome! Feel free to ask if you need anything else. Happy farming! 🌱";
    }

    // Bye
    if (lowerMessage.match(/bye|goodbye|see you/)) {
      return "Goodbye! Have a great day and happy farming! Feel free to come back anytime. 👋";
    }

    // Default response
    return "I'm not sure I understand that question. Could you please rephrase or ask about our products, pricing, contact information, or services?";
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is ready
let chatbot;
document.addEventListener('DOMContentLoaded', function() {
  chatbot = new Chatbot();
});
