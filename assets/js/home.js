// Tab switching functionality
function switchTab(tabName) {
  // Remove active class from all tabs and content
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to selected tab and content
  const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
  const selectedContent = document.getElementById(tabName);
  
  if (selectedBtn && selectedContent) {
    selectedBtn.classList.add('active');
    selectedContent.classList.add('active');
    
    // Load content dynamically based on tab
    loadTabContent(tabName);
  }
}

// Event listeners for tab buttons
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
  
  // Load initial dashboard content
  loadTabContent('dashboard');
});

// Load content for each tab
function loadTabContent(tabName) {
  switch(tabName) {
    case 'marketplace':
      loadMarketplace();
      break;
    case 'products':
      loadProducts();
      break;
    case 'orders':
      loadOrders();
      break;
    case 'messages':
      loadMessages();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

// Marketplace content
function loadMarketplace() {
  const content = document.getElementById('marketplace-content');
  content.innerHTML = `
    <div style="margin-bottom: 2rem;">
      <input type="text" id="searchProducts" placeholder="Search products..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; font-size: 1rem;">
    </div>
    
    <div class="dashboard-grid">
      ${generateProductCards()}
    </div>
  `;
}

function generateProductCards() {
  const products = [
    { name: 'Organic Rice', price: 'Rs 150/kg', seller: 'Sunil Farms', location: 'Anuradhapura', icon: '🌾' },
    { name: 'Fresh Tomatoes', price: 'Rs 80/kg', seller: 'Green Valley', location: 'Nuwara Eliya', icon: '🍅' },
    { name: 'Coconuts', price: 'Rs 60/unit', seller: 'Coastal Farms', location: 'Galle', icon: '🥥' },
    { name: 'Carrots', price: 'Rs 100/kg', seller: 'Hill Country', location: 'Badulla', icon: '🥕' },
    { name: 'Bananas', price: 'Rs 120/kg', seller: 'Tropical Traders', location: 'Kegalle', icon: '🍌' },
    { name: 'Green Beans', price: 'Rs 90/kg', seller: 'Fresh Harvest', location: 'Matale', icon: '🫘' }
  ];
  
  return products.map(product => `
    <div class="dashboard-card">
      <span class="icon">${product.icon}</span>
      <h3>${product.name}</h3>
      <p style="font-size: 1.2rem; font-weight: 600; margin: 0.5rem 0;">${product.price}</p>
      <p style="opacity: 0.8; font-size: 0.9rem;">Seller: ${product.seller}</p>
      <p style="opacity: 0.8; font-size: 0.9rem;">📍 ${product.location}</p>
      <button style="margin-top: 1rem; background: white; color: #0b6b2f; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; width: 100%;" onclick="alert('Added to cart!')">Add to Cart</button>
    </div>
  `).join('');
}

// My Products content
function loadProducts() {
  const content = document.getElementById('products-content');
  content.innerHTML = `
    <button style="background: white; color: #0b6b2f; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-bottom: 2rem; font-size: 1rem;" onclick="alert('Add new product feature coming soon!')">+ Add New Product</button>
    
    <div class="dashboard-grid">
      ${generateMyProducts()}
    </div>
  `;
}

function generateMyProducts() {
  const myProducts = [
    { name: 'My Organic Rice', stock: '500 kg', price: 'Rs 150/kg', status: 'Active', icon: '🌾' },
    { name: 'Fresh Vegetables', stock: '200 kg', price: 'Rs 95/kg', status: 'Active', icon: '🥬' },
    { name: 'Corn', stock: 'Out of Stock', price: 'Rs 70/kg', status: 'Inactive', icon: '🌽' }
  ];
  
  return myProducts.map(product => `
    <div class="dashboard-card">
      <span class="icon">${product.icon}</span>
      <h3>${product.name}</h3>
      <p style="font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0;">${product.price}</p>
      <p style="opacity: 0.8;">Stock: ${product.stock}</p>
      <p style="opacity: 0.8;">Status: <span style="color: ${product.status === 'Active' ? '#90EE90' : '#FFB6C1'}">${product.status}</span></p>
      <button style="margin-top: 1rem; background: rgba(255,255,255,0.2); color: white; border: 1px solid white; padding: 8px 16px; border-radius: 6px; cursor: pointer; width: 100%;" onclick="alert('Edit product')">Edit</button>
    </div>
  `).join('');
}

// Orders content
function loadOrders() {
  const content = document.getElementById('orders-content');
  content.innerHTML = `
    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 2rem; border: 1px solid rgba(255,255,255,0.2);">
      ${generateOrdersList()}
    </div>
  `;
}

function generateOrdersList() {
  const orders = [
    { id: '#ORD-1247', product: 'Organic Rice', quantity: '50 kg', total: 'Rs 7,500', status: 'Delivered', date: '2025-11-15' },
    { id: '#ORD-1246', product: 'Fresh Tomatoes', quantity: '30 kg', total: 'Rs 2,400', status: 'In Transit', date: '2025-11-17' },
    { id: '#ORD-1245', product: 'Coconuts', quantity: '100 units', total: 'Rs 6,000', status: 'Processing', date: '2025-11-18' }
  ];
  
  return `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid rgba(255,255,255,0.2);">
          <th style="text-align: left; padding: 1rem;">Order ID</th>
          <th style="text-align: left; padding: 1rem;">Product</th>
          <th style="text-align: left; padding: 1rem;">Quantity</th>
          <th style="text-align: left; padding: 1rem;">Total</th>
          <th style="text-align: left; padding: 1rem;">Status</th>
          <th style="text-align: left; padding: 1rem;">Date</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
            <td style="padding: 1rem; font-weight: 600;">${order.id}</td>
            <td style="padding: 1rem;">${order.product}</td>
            <td style="padding: 1rem;">${order.quantity}</td>
            <td style="padding: 1rem; font-weight: 600;">${order.total}</td>
            <td style="padding: 1rem;"><span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 12px; font-size: 0.85rem;">${order.status}</span></td>
            <td style="padding: 1rem; opacity: 0.8;">${order.date}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Messages content
function loadMessages() {
  const content = document.getElementById('messages-content');
  content.innerHTML = `
    <div class="dashboard-grid" style="grid-template-columns: 1fr 2fr;">
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); height: 500px; overflow-y: auto;">
        <h3 style="margin-bottom: 1rem;">Conversations</h3>
        ${generateConversationList()}
      </div>
      <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2); height: 500px; display: flex; flex-direction: column;">
        <h3 style="margin-bottom: 1rem;">Sunil Perera</h3>
        <div style="flex: 1; overflow-y: auto; margin-bottom: 1rem;">
          <div style="background: rgba(255,255,255,0.15); padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
            <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.5rem;">Sunil Perera - 10:30 AM</p>
            <p>Hello! I'm interested in purchasing rice from you.</p>
          </div>
          <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; margin-left: 20%;">
            <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.5rem;">You - 10:35 AM</p>
            <p>Great! I have premium quality rice available. How much do you need?</p>
          </div>
        </div>
        <input type="text" placeholder="Type a message..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
      </div>
    </div>
  `;
}

function generateConversationList() {
  const conversations = [
    { name: 'Sunil Perera', lastMessage: 'Hello! I\'m interested in...', time: '10:30 AM', unread: 2 },
    { name: 'Nimalka Silva', lastMessage: 'When can you deliver?', time: 'Yesterday', unread: 0 },
    { name: 'Kamal Fernando', lastMessage: 'Thank you!', time: '2 days ago', unread: 0 }
  ];
  
  return conversations.map(conv => `
    <div style="padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <strong>${conv.name}</strong>
        ${conv.unread > 0 ? `<span style="background: #FF6B6B; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">${conv.unread}</span>` : ''}
      </div>
      <p style="opacity: 0.8; font-size: 0.9rem; margin-bottom: 0.25rem;">${conv.lastMessage}</p>
      <p style="opacity: 0.6; font-size: 0.8rem;">${conv.time}</p>
    </div>
  `).join('');
}

// Settings content
function loadSettings() {
  const content = document.getElementById('settings-content');
  content.innerHTML = `
    <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 2rem; border: 1px solid rgba(255,255,255,0.2); max-width: 600px;">
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Account Information</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">Email</label>
          <input type="email" value="admin@gmail.com" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">Name</label>
          <input type="text" value="Admin User" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
        </div>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem;">Phone</label>
          <input type="tel" value="+94 77 123 4567" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white;">
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Notifications</h3>
        <label style="display: flex; align-items: center; margin-bottom: 0.75rem; cursor: pointer;">
          <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
          <span>Email notifications for new orders</span>
        </label>
        <label style="display: flex; align-items: center; margin-bottom: 0.75rem; cursor: pointer;">
          <input type="checkbox" checked style="margin-right: 0.75rem; width: 18px; height: 18px;">
          <span>SMS alerts for messages</span>
        </label>
        <label style="display: flex; align-items: center; cursor: pointer;">
          <input type="checkbox" style="margin-right: 0.75rem; width: 18px; height: 18px;">
          <span>Marketing communications</span>
        </label>
      </div>
      
      <button style="background: white; color: #0b6b2f; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; font-size: 1rem;" onclick="alert('Settings saved!')">Save Changes</button>
    </div>
  `;
}
