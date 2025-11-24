// Orders Approval System
class OrdersApprovalSystem {
  constructor() {
    this.orders = this.generateSampleOrders();
    this.filteredOrders = [...this.orders];
    this.init();
  }

  init() {
    this.renderStats();
    this.renderOrders();
    this.attachEventListeners();
  }

  generateSampleOrders() {
    const statuses = ['pending', 'approved', 'rejected', 'processing', 'completed'];
    const customers = [
      { name: 'Sunil Perera', email: 'sunil@gmail.com', avatar: '👨‍🌾' },
      { name: 'Nimalka Silva', email: 'nimalka@gmail.com', avatar: '👩‍🌾' },
      { name: 'Kamal Fernando', email: 'kamal@gmail.com', avatar: '👨‍💼' },
      { name: 'Sanduni Wijesinghe', email: 'sanduni@gmail.com', avatar: '👩‍💼' },
      { name: 'Pradeep Kumara', email: 'pradeep@gmail.com', avatar: '👨‍🌾' },
      { name: 'Dilani Rathnayake', email: 'dilani@gmail.com', avatar: '👩‍🌾' },
      { name: 'Rohan Dias', email: 'rohan@gmail.com', avatar: '👨‍💼' },
      { name: 'Chamari Perera', email: 'chamari@gmail.com', avatar: '👩‍💼' }
    ];
    
    const products = [
      { name: 'Rice Seeds (Premium)', price: 5000 },
      { name: 'Organic Fertilizer', price: 3500 },
      { name: 'Irrigation Pipe Set', price: 12000 },
      { name: 'Agricultural Spray', price: 2500 },
      { name: 'Garden Tools Kit', price: 8000 },
      { name: 'Vegetable Seeds Pack', price: 1500 },
      { name: 'Compost Maker', price: 6500 },
      { name: 'Water Pump', price: 25000 }
    ];

    const orders = [];
    for (let i = 1; i <= 25; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const numItems = Math.floor(Math.random() * 3) + 1;
      const items = [];
      let total = 0;

      for (let j = 0; j < numItems; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const itemTotal = product.price * quantity;
        items.push({
          name: product.name,
          quantity: quantity,
          price: product.price,
          total: itemTotal
        });
        total += itemTotal;
      }

      const daysAgo = Math.floor(Math.random() * 30);
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - daysAgo);

      orders.push({
        id: `ORD-${String(1000 + i).padStart(5, '0')}`,
        customer: customer,
        items: items,
        total: total,
        date: orderDate,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        shippingAddress: `${Math.floor(Math.random() * 500) + 1} Main Street, Colombo ${Math.floor(Math.random() * 15) + 1}`,
        phone: `077${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`
      });
    }

    return orders.sort((a, b) => b.date - a.date);
  }

  renderStats() {
    const stats = {
      pending: this.orders.filter(o => o.status === 'pending').length,
      approved: this.orders.filter(o => o.status === 'approved').length,
      rejected: this.orders.filter(o => o.status === 'rejected').length,
      processing: this.orders.filter(o => o.status === 'processing').length
    };

    const statsContainer = document.getElementById('orderStats');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="stat-box pending">
        <div class="stat-icon">⏳</div>
        <div class="stat-label">Pending Approval</div>
        <div class="stat-value">${stats.pending}</div>
      </div>
      <div class="stat-box approved">
        <div class="stat-icon">✅</div>
        <div class="stat-label">Approved</div>
        <div class="stat-value">${stats.approved}</div>
      </div>
      <div class="stat-box processing">
        <div class="stat-icon">🔄</div>
        <div class="stat-label">Processing</div>
        <div class="stat-value">${stats.processing}</div>
      </div>
      <div class="stat-box rejected">
        <div class="stat-icon">❌</div>
        <div class="stat-label">Rejected</div>
        <div class="stat-value">${stats.rejected}</div>
      </div>
    `;
  }

  renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (this.filteredOrders.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem; opacity: 0.7;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
            <div style="font-size: 1.2rem;">No orders found</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.filteredOrders.map(order => `
      <tr>
        <td class="order-id">${order.id}</td>
        <td>
          <div class="customer-info">
            <div class="customer-avatar">${order.customer.avatar}</div>
            <div class="customer-details">
              <div class="customer-name">${order.customer.name}</div>
              <div class="customer-email">${order.customer.email}</div>
            </div>
          </div>
        </td>
        <td class="order-items">${order.items.length} item(s)</td>
        <td class="order-amount">Rs ${order.total.toLocaleString()}</td>
        <td class="order-date">${this.formatDate(order.date)}</td>
        <td>
          <span class="status-badge ${order.status}">
            <span class="status-dot"></span>
            ${order.status}
          </span>
        </td>
        <td>
          <div class="order-actions">
            <button class="action-btn view" onclick="orderSystem.viewOrder('${order.id}')">
              👁️ View
            </button>
            ${order.status === 'pending' ? `
              <button class="action-btn approve" onclick="orderSystem.approveOrder('${order.id}')">
                ✅ Approve
              </button>
              <button class="action-btn reject" onclick="orderSystem.rejectOrder('${order.id}')">
                ❌ Reject
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  viewOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('orderModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
      <div class="order-detail-section">
        <div class="section-title">📋 Order Information</div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Order ID</span>
            <span class="detail-value">${order.id}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="detail-value">
              <span class="status-badge ${order.status}">
                <span class="status-dot"></span>
                ${order.status}
              </span>
            </span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Order Date</span>
            <span class="detail-value">${order.date.toLocaleDateString()}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Total Amount</span>
            <span class="detail-value" style="color: rgba(255, 215, 0, 0.95);">Rs ${order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="order-detail-section">
        <div class="section-title">👤 Customer Information</div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Name</span>
            <span class="detail-value">${order.customer.name}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email</span>
            <span class="detail-value">${order.customer.email}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${order.phone}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Shipping Address</span>
            <span class="detail-value">${order.shippingAddress}</span>
          </div>
        </div>
      </div>

      <div class="order-detail-section">
        <div class="section-title">📦 Order Items</div>
        <ul class="items-list">
          ${order.items.map(item => `
            <li class="item-row">
              <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">Quantity: ${item.quantity} × Rs ${item.price.toLocaleString()}</div>
              </div>
              <div class="item-price">Rs ${item.total.toLocaleString()}</div>
            </li>
          `).join('')}
        </ul>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid rgba(255, 215, 0, 0.3); text-align: right;">
          <div style="font-size: 1.3rem; font-weight: 700; color: rgba(255, 215, 0, 0.95);">
            Total: Rs ${order.total.toLocaleString()}
          </div>
        </div>
      </div>
    `;

    const modalFooter = document.getElementById('modalFooter');
    if (order.status === 'pending') {
      modalFooter.innerHTML = `
        <button class="modal-btn approve" onclick="orderSystem.approveOrderFromModal('${order.id}')">
          ✅ Approve Order
        </button>
        <button class="modal-btn reject" onclick="orderSystem.rejectOrderFromModal('${order.id}')">
          ❌ Reject Order
        </button>
        <button class="modal-btn cancel" onclick="orderSystem.closeModal()">
          Cancel
        </button>
      `;
    } else {
      modalFooter.innerHTML = `
        <button class="modal-btn cancel" onclick="orderSystem.closeModal()">
          Close
        </button>
      `;
    }

    modal.classList.add('active');
  }

  approveOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'approved';
      this.renderStats();
      this.renderOrders();
      this.showNotification('✅ Order approved successfully!', 'success');
    }
  }

  rejectOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'rejected';
      this.renderStats();
      this.renderOrders();
      this.showNotification('❌ Order rejected', 'error');
    }
  }

  approveOrderFromModal(orderId) {
    this.approveOrder(orderId);
    this.closeModal();
  }

  rejectOrderFromModal(orderId) {
    this.rejectOrder(orderId);
    this.closeModal();
  }

  closeModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
  }

  filterOrders() {
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchOrder').value.toLowerCase();

    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesSearch = !searchTerm || 
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.name.toLowerCase().includes(searchTerm) ||
        order.customer.email.toLowerCase().includes(searchTerm);
      
      return matchesStatus && matchesSearch;
    });

    this.renderOrders();
  }

  attachEventListeners() {
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchOrder');
    const modal = document.getElementById('orderModal');

    if (statusFilter) {
      statusFilter.addEventListener('change', () => this.filterOrders());
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => this.filterOrders());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === 'success' ? 'rgba(40, 167, 69, 0.9)' : 'rgba(220, 53, 69, 0.9)'};
      color: white;
      border-radius: 12px;
      font-weight: 600;
      z-index: 3000;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize the system
let orderSystem;
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('ordersTableBody')) {
    orderSystem = new OrdersApprovalSystem();
  }
});
