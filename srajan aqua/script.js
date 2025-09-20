// Data Storage Keys
const STORAGE_KEYS = {
    DRIVER_OTP: 'driver_otp',
    CUSTOMERS: 'customers',
    DELIVERIES: 'deliveries',
    NOTEPAD: 'notepad',
    CURRENT_USER: 'current_user'
};

// Default Driver OTP
const DEFAULT_DRIVER_OTP = '1234';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set default OTP if not exists
    if (!localStorage.getItem(STORAGE_KEYS.DRIVER_OTP)) {
        localStorage.setItem(STORAGE_KEYS.DRIVER_OTP, DEFAULT_DRIVER_OTP);
    }

    // Set default customers if not exists
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
        const defaultCustomers = [
            { id: 1, name: 'John Doe', mobile: '9876543210', address: '123 Main St' },
            { id: 2, name: 'Jane Smith', mobile: '9876543211', address: '456 Oak Ave' },
            { id: 3, name: 'Mike Johnson', mobile: '9876543212', address: '789 Pine Rd' }
        ];
        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(defaultCustomers));
    }

    // Set default deliveries if not exists
    if (!localStorage.getItem(STORAGE_KEYS.DELIVERIES)) {
        localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify([]));
    }

    // Set default notepad if not exists
    if (!localStorage.getItem(STORAGE_KEYS.NOTEPAD)) {
        localStorage.setItem(STORAGE_KEYS.NOTEPAD, JSON.stringify([]));
    }

    // Set current date for delivery modal
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('delivery-date').value = today;

    // Load notepad content
    loadNotepadContent();
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showLogin(type) {
    switch(type) {
        case 'driver':
            showPage('driver-login');
            break;
        case 'customer':
            showPage('customer-login');
            break;
        case 'admin':
            showPage('admin-panel');
            break;
    }
}

// Driver Authentication
function driverLogin() {
    const otpInput = document.getElementById('driver-otp').value;
    const storedOTP = localStorage.getItem(STORAGE_KEYS.DRIVER_OTP);

    if (otpInput === storedOTP) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
            type: 'driver',
            loginTime: new Date().toISOString()
        }));
        loadDriverDashboard();
        showPage('driver-dashboard');
    } else {
        showMessage('Invalid OTP. Please try again.', 'error');
    }
}

function driverLogout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showPage('login-selection');
    document.getElementById('driver-otp').value = '';
}

// Customer Authentication
function customerLogin() {
    const mobileInput = document.getElementById('customer-mobile').value;
    const customers = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS));

    const customer = customers.find(c => c.mobile === mobileInput);

    if (customer) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
            type: 'customer',
            customerId: customer.id,
            loginTime: new Date().toISOString()
        }));
        loadCustomerDashboard(customer);
        showPage('customer-dashboard');
    } else {
        showMessage('Customer not found. Please contact admin to register.', 'error');
    }
}

function customerLogout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showPage('login-selection');
    document.getElementById('customer-mobile').value = '';
}

// Admin Functions
function adminLogout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showPage('login-selection');
}

function updateDriverOTP() {
    const newOTP = document.getElementById('new-otp').value;

    if (newOTP.length === 4 && /^\d{4}$/.test(newOTP)) {
        localStorage.setItem(STORAGE_KEYS.DRIVER_OTP, newOTP);
        showMessage('Driver OTP updated successfully!', 'success');
        document.getElementById('new-otp').value = '';
    } else {
        showMessage('Please enter a valid 4-digit OTP.', 'error');
    }
}

function postNotepadUpdate() {
    const message = document.getElementById('notepad-message').value.trim();

    if (message) {
        const notepadMessages = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTEPAD));
        const newMessage = {
            id: Date.now(),
            content: message,
            timestamp: new Date().toISOString(),
            author: 'Admin'
        };

        notepadMessages.unshift(newMessage);
        localStorage.setItem(STORAGE_KEYS.NOTEPAD, JSON.stringify(notepadMessages));

        document.getElementById('notepad-message').value = '';
        loadNotepadContent();
        showMessage('Message posted successfully!', 'success');
    } else {
        showMessage('Please enter a message.', 'error');
    }
}

// Driver Dashboard
function loadDriverDashboard() {
    const customers = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS));
    const customerList = document.getElementById('customer-list');

    customerList.innerHTML = '';

    customers.forEach(customer => {
        const customerItem = document.createElement('div');
        customerItem.className = 'customer-item';
        customerItem.onclick = () => openDeliveryModal(customer);

        const today = new Date().toISOString().split('T')[0];
        const todayDeliveries = getTodayDeliveries(customer.id);
        const totalDelivered = todayDeliveries.reduce((sum, d) => sum + d.containers, 0);

        customerItem.innerHTML = `
            <div class="name">${customer.name}</div>
            <div class="mobile">${customer.mobile}</div>
            <div class="delivered">Today's delivery: ${totalDelivered} containers</div>
        `;

        customerList.appendChild(customerItem);
    });
}

// Customer Dashboard
function loadCustomerDashboard(customer) {
    document.getElementById('customer-name').textContent = `${customer.name}'s Dashboard`;

    const today = new Date().toISOString().split('T')[0];
    const todayDeliveries = getTodayDeliveries(customer.id);
    const todayTotal = todayDeliveries.reduce((sum, d) => sum + d.containers, 0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyDeliveries = getMonthlyDeliveries(customer.id, currentMonth, currentYear);
    const monthlyTotal = monthlyDeliveries.reduce((sum, d) => sum + d.containers, 0);
    const monthlyBill = monthlyTotal * 25; // ₹25 per container

    document.getElementById('today-delivery').textContent = `${todayTotal} containers`;
    document.getElementById('monthly-containers').textContent = `${monthlyTotal} containers`;
    document.getElementById('monthly-bill').textContent = `₹${monthlyBill}`;
}

// Delivery Management
function openDeliveryModal(customer) {
    document.getElementById('delivery-modal').classList.add('active');
    document.getElementById('delivery-containers').focus();

    // Store customer for delivery submission
    window.selectedCustomer = customer;
}

function closeDeliveryModal() {
    document.getElementById('delivery-modal').classList.remove('active');
    document.getElementById('delivery-containers').value = '1';
    delete window.selectedCustomer;
}

function submitDelivery() {
    const containers = parseInt(document.getElementById('delivery-containers').value);
    const date = document.getElementById('delivery-date').value;
    const customer = window.selectedCustomer;

    if (!customer) {
        showMessage('No customer selected.', 'error');
        return;
    }

    if (containers < 1) {
        showMessage('Please enter a valid number of containers.', 'error');
        return;
    }

    const deliveries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERIES));
    const newDelivery = {
        id: Date.now(),
        customerId: customer.id,
        customerName: customer.name,
        containers: containers,
        date: date,
        timestamp: new Date().toISOString(),
        amount: containers * 25 // ₹25 per container
    };

    deliveries.push(newDelivery);
    localStorage.setItem(STORAGE_KEYS.DELIVERIES, JSON.stringify(deliveries));

    showMessage(`Delivery recorded: ${containers} containers for ${customer.name}`, 'success');
    closeDeliveryModal();
    loadDriverDashboard(); // Refresh dashboard
}

// Notepad Functions
function loadNotepadContent() {
    const notepadContent = document.getElementById('notepad-content');
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTEPAD));

    if (messages.length === 0) {
        notepadContent.innerHTML = '<p style="text-align: center; color: #666; margin-top: 50px;">No messages yet.</p>';
        return;
    }

    notepadContent.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = 'notepad-message';

        const date = new Date(message.timestamp);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        messageElement.innerHTML = `
            <div class="timestamp">${formattedDate}</div>
            <div class="content">${message.content}</div>
        `;

        notepadContent.appendChild(messageElement);
    });
}

// Admin Customer Management
function loadAdminCustomers() {
    const adminCustomers = document.getElementById('admin-customers');
    const customers = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS));
    const deliveries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERIES));

    let html = `
        <table class="customer-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Monthly Deliveries</th>
                    <th>Monthly Bill</th>
                </tr>
            </thead>
            <tbody>
    `;

    customers.forEach(customer => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyDeliveries = getMonthlyDeliveries(customer.id, currentMonth, currentYear);
        const monthlyTotal = monthlyDeliveries.reduce((sum, d) => sum + d.containers, 0);
        const monthlyBill = monthlyTotal * 25;

        html += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.mobile}</td>
                <td>${monthlyTotal}</td>
                <td>₹${monthlyBill}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    adminCustomers.innerHTML = html;
}

// Utility Functions
function getTodayDeliveries(customerId) {
    const deliveries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERIES));
    const today = new Date().toISOString().split('T')[0];

    return deliveries.filter(d =>
        d.customerId === customerId && d.date === today
    );
}

function getMonthlyDeliveries(customerId, month, year) {
    const deliveries = JSON.parse(localStorage.getItem(STORAGE_KEYS.DELIVERIES));

    return deliveries.filter(d => {
        const deliveryDate = new Date(d.date);
        return d.customerId === customerId &&
               deliveryDate.getMonth() === month &&
               deliveryDate.getFullYear() === year;
    });
}

function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    const activePage = document.querySelector('.page.active .container');
    if (activePage) {
        activePage.insertBefore(message, activePage.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
}

// Initialize admin panel when shown
document.addEventListener('DOMContentLoaded', function() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (adminPanel.classList.contains('active')) {
                        loadAdminCustomers();
                    }
                }
            });
        });

        observer.observe(adminPanel, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
});
