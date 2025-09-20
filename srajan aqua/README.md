# 📱 Srajan Mineral Water App

A comprehensive mobile-responsive web application for managing mineral water delivery operations with separate interfaces for Drivers, Customers, and Admin.

## 🚀 Features

### Driver Login & Dashboard
- **Secure Login**: 4-digit OTP authentication (default: 1234)
- **Customer Management**: View all registered customers with their mobile numbers
- **Delivery Tracking**: Record deliveries with container count and date
- **Real-time Updates**: See today's delivery status for each customer

### Customer Login & Dashboard
- **Mobile Authentication**: Login using registered mobile number
- **Delivery Information**: View today's deliveries and monthly totals
- **Billing Information**: See monthly bill amount (₹25 per container)
- **Read-only Access**: View-only interface for customers

### Admin Panel
- **OTP Management**: Change driver OTP anytime
- **Customer Overview**: View all customers with monthly statistics
- **Billing Reports**: See monthly deliveries and bill amounts for all customers
- **Notepad System**: Post announcements and updates

### Notepad/News Board
- **Digital Notice Board**: Admin can post messages visible to all users
- **Real-time Updates**: Messages appear instantly after posting
- **Examples**:
  - Price changes: "Price per container is now ₹27 from 1st October"
  - Holiday notices: "No delivery on Sunday"
  - Promotional schemes: "New scheme: 1 free container on 50 deliveries"

## 🛠️ Technical Implementation

### Files Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Mobile-responsive CSS
├── script.js           # Complete JavaScript functionality
└── README.md           # This documentation
```

### Technologies Used
- **HTML5**: Semantic structure with mobile-first design
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Complete functionality without external dependencies
- **LocalStorage**: Data persistence for customers, deliveries, and settings

### Data Storage
- **Driver OTP**: Stored securely in localStorage
- **Customer Database**: JSON array of customer information
- **Delivery Records**: Complete history of all deliveries
- **Notepad Messages**: Admin announcements and updates

## 📱 How to Use

### 1. Open the Application
Simply open `index.html` in any modern web browser.

### 2. Driver Usage
1. Click "Driver Login"
2. Enter OTP (default: 1234)
3. View customer list
4. Click on any customer to record delivery
5. Enter number of containers and date
6. Submit delivery (automatically calculates ₹25 per container)

### 3. Customer Usage
1. Click "Customer Login"
2. Enter registered mobile number
3. View dashboard with:
   - Today's delivery count
   - Monthly total containers
   - Monthly bill amount

### 4. Admin Usage
1. Click "Admin Panel"
2. **OTP Management**: Update driver OTP in real-time
3. **Customer Management**: View all customers with monthly statistics
4. **Notepad**: Post messages for all users to see

### 5. Notepad Access
- Available to all users via the main menu
- Shows all admin messages with timestamps
- Real-time updates when new messages are posted

## 🎨 Design Features

### Mobile-First Design
- Responsive layout works on all screen sizes
- Touch-friendly buttons and interface
- Optimized for mobile usage

### Modern UI/UX
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Intuitive navigation
- Professional color scheme

### User Experience
- Clear visual hierarchy
- Success/error message system
- Loading states and feedback
- Easy-to-use forms and modals

## 🔧 Default Data

### Sample Customers
- John Doe: 9876543210
- Jane Smith: 9876543211
- Mike Johnson: 9876543212

### Default Settings
- Driver OTP: 1234
- Price per container: ₹25
- All data persists in browser localStorage

## 📊 Billing System

### Automatic Calculations
- **Per Container**: ₹25 (configurable in code)
- **Daily Tracking**: Today's deliveries for each customer
- **Monthly Reports**: Complete monthly statistics
- **Real-time Updates**: Bill amounts update automatically

### Reports Available
- Individual customer monthly totals
- Today's delivery summary
- Historical delivery records
- Admin overview of all customers

## 🔐 Security Features

### Authentication
- Driver: 4-digit OTP system
- Customer: Mobile number verification
- Admin: Direct access (no authentication required)

### Data Protection
- All data stored locally in browser
- No external dependencies
- Secure localStorage implementation

## 🚀 Deployment

### Local Usage
1. Download all files to a folder
2. Open `index.html` in any browser
3. Start using immediately

### Web Server (Optional)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

## 📝 Customization

### Adding New Customers
Edit the `defaultCustomers` array in `script.js`:
```javascript
const defaultCustomers = [
    { id: 1, name: 'New Customer', mobile: '9876543213', address: 'Address' }
];
```

### Changing Price
Update the price calculation in relevant functions:
```javascript
amount: containers * 25 // Change 25 to new price
```

### Styling Changes
Modify `styles.css` for custom appearance:
- Colors, fonts, spacing
- Responsive breakpoints
- Animation effects

## 🐛 Troubleshooting

### Common Issues
1. **Data not persisting**: Ensure localStorage is enabled
2. **Mobile responsiveness**: Clear browser cache
3. **OTP not working**: Check console for errors

### Browser Support
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📈 Future Enhancements

### Potential Features
- Customer registration system
- SMS notifications
- Payment integration
- Advanced reporting
- Multi-language support
- Offline functionality
- Data export/import

## 🤝 Support

For issues or feature requests, please check the application functionality and modify the code as needed. The application is built with vanilla JavaScript for maximum compatibility and ease of customization.

---

**Built with ❤️ for Srajan Mineral Water**
