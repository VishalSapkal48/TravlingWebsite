import React, { useState, useEffect } from 'react';
import { MapPin, User, Calendar, Clock, Bell, Plus, Eye, LogOut, Menu, X } from 'lucide-react';

const BappuToursWebsite = () => {
  // State Management
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'user'
  const [currentPage, setCurrentPage] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Demo Data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', joinDate: '2024-03-10' }
  ]);

  const [locations, setLocations] = useState([
    { id: 1, name: 'Goa Beach Paradise', price: 15000, duration: '3 Days 2 Nights', image: '🏖️', description: 'Beautiful beaches and water sports' },
    { id: 2, name: 'Kashmir Valley', price: 25000, duration: '5 Days 4 Nights', image: '🏔️', description: 'Snow-capped mountains and valleys' },
    { id: 3, name: 'Rajasthan Heritage', price: 20000, duration: '4 Days 3 Nights', image: '🏰', description: 'Royal palaces and desert safari' },
    { id: 4, name: 'Kerala Backwaters', price: 18000, duration: '3 Days 2 Nights', image: '🌴', description: 'Serene backwaters and houseboats' }
  ]);

  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      userId: 1, 
      userName: 'John Doe',
      locationId: 1, 
      locationName: 'Goa Beach Paradise',
      startPoint: 'Mumbai',
      endPoint: 'Goa',
      date: '2024-12-01',
      status: 'confirmed',
      type: 'multi-day',
      price: 15000
    },
    { 
      id: 2, 
      userId: 2, 
      userName: 'Jane Smith',
      locationId: 2, 
      locationName: 'Kashmir Valley',
      startPoint: 'Delhi',
      endPoint: 'Srinagar',
      date: '2024-12-15',
      status: 'pending',
      type: 'multi-day',
      price: 25000
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking from John Doe for Goa Beach Paradise', time: '2 hours ago', read: false },
    { id: 2, message: 'Jane Smith completed payment for Kashmir Valley', time: '1 day ago', read: false }
  ]);

  // Authentication Functions
  const handleLogin = (email, password, role) => {
    if (role === 'admin' && email === 'admin@bapputours.com' && password === 'admin123') {
      setCurrentUser({ name: 'Admin', email: 'admin@bapputours.com', role: 'admin' });
      setUserRole('admin');
      setCurrentPage('admin-dashboard');
      return true;
    } else if (role === 'user' && email && password) {
      setCurrentUser({ name: email.split('@')[0], email, role: 'user' });
      setUserRole('user');
      setCurrentPage('user-dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setCurrentPage('home');
  };

  // Booking Functions
  const handleBooking = (locationId, startPoint, endPoint, date, type) => {
    const location = locations.find(l => l.id === locationId);
    const newBooking = {
      id: Date.now(),
      userId: currentUser.id || Date.now(),
      userName: currentUser.name,
      locationId,
      locationName: location.name,
      startPoint,
      endPoint,
      date,
      status: 'confirmed',
      type,
      price: location.price
    };
    
    setBookings([...bookings, newBooking]);
    
    // Add notification for admin
    const newNotification = {
      id: Date.now(),
      message: `New booking from ${currentUser.name} for ${location.name}`,
      time: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
    
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  // Add Location Function
  const handleAddLocation = (locationData) => {
    const newLocation = {
      id: Date.now(),
      ...locationData
    };
    setLocations([...locations, newLocation]);
    alert('New location added successfully!');
  };

  // Components
  const Header = () => (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
              🚌 Bappu Tours & Traveling
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200">Home</button>
            <button onClick={() => setCurrentPage('destinations')} className="hover:text-blue-200">Destinations</button>
            <button onClick={() => setCurrentPage('about')} className="hover:text-blue-200">About</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-200">Contact</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {currentUser.name}</span>
                <button 
                  onClick={() => setCurrentPage(userRole === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400"
                >
                  Dashboard
                </button>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentPage('login')} 
                  className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-400"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentPage('register')} 
                  className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden bg-blue-700 px-4 py-2">
          <div className="space-y-2">
            <button onClick={() => { setCurrentPage('home'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Home</button>
            <button onClick={() => { setCurrentPage('destinations'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Destinations</button>
            <button onClick={() => { setCurrentPage('about'); setShowMobileMenu(false); }} className="block w-full text-left py-2">About</button>
            <button onClick={() => { setCurrentPage('contact'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Contact</button>
            {currentUser ? (
              <>
                <button onClick={() => { setCurrentPage(userRole === 'admin' ? 'admin-dashboard' : 'user-dashboard'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Dashboard</button>
                <button onClick={() => { handleLogout(); setShowMobileMenu(false); }} className="block w-full text-left py-2">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage('login'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Login</button>
                <button onClick={() => { setCurrentPage('register'); setShowMobileMenu(false); }} className="block w-full text-left py-2">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Explore India with Bappu Tours</h2>
          <p className="text-xl mb-8">Discover amazing destinations with our expertly crafted travel packages</p>
          <button 
            onClick={() => setCurrentPage('destinations')}
            className="bg-yellow-500 text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Explore Destinations
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <MapPin className="mx-auto mb-4 text-blue-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Real-time Tracking</h4>
              <p className="text-gray-600">Track your journey in real-time with our advanced GPS technology</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Clock className="mx-auto mb-4 text-green-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Flexible Booking</h4>
              <p className="text-gray-600">Book one-day or multi-day trips according to your preference</p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-lg">
              <Bell className="mx-auto mb-4 text-yellow-600" size={48} />
              <h4 className="text-xl font-semibold mb-2">Instant Notifications</h4>
              <p className="text-gray-600">Get instant confirmations and updates about your bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Preview */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Popular Destinations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.slice(0, 4).map(location => (
              <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="text-6xl text-center py-8 bg-gradient-to-r from-blue-100 to-blue-200">
                  {location.image}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{location.name}</h4>
                  <p className="text-gray-600 mb-3">{location.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">₹{location.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{location.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const success = handleLogin(email, password, role);
      if (!success) {
        setError('Invalid credentials. Use admin@bapputours.com / admin123 for admin or any email/password for user.');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Demo Credentials:</p>
            <p className="text-sm text-gray-500">Admin: admin@bapputours.com / admin123</p>
            <p className="text-sm text-gray-500">User: Any email/password combination</p>
          </div>
        </div>
      </div>
    );
  };

  const DestinationsPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [bookingData, setBookingData] = useState({
      startPoint: '',
      endPoint: '',
      date: '',
      type: 'one-day'
    });

    const handleBookingSubmit = (e) => {
      e.preventDefault();
      if (!currentUser) {
        alert('Please login to book a trip');
        setCurrentPage('login');
        return;
      }
      handleBooking(selectedLocation.id, bookingData.startPoint, bookingData.endPoint, bookingData.date, bookingData.type);
      setSelectedLocation(null);
      setBookingData({ startPoint: '', endPoint: '', date: '', type: 'one-day' });
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Destinations</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map(location => (
              <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="text-6xl text-center py-8 bg-gradient-to-r from-blue-100 to-blue-200">
                  {location.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-3">{location.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-blue-600 font-bold text-lg">₹{location.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">{location.duration}</span>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(location)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
              <h3 className="text-xl font-bold mb-4">Book {selectedLocation.name}</h3>
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Trip Type</label>
                  <select
                    value={bookingData.type}
                    onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="one-day">One Day Trip</option>
                    <option value="multi-day">Multi Day Trip</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Start Point</label>
                  <input
                    type="text"
                    value={bookingData.startPoint}
                    onChange={(e) => setBookingData({...bookingData, startPoint: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter pickup location"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">End Point</label>
                  <input
                    type="text"
                    value={bookingData.endPoint}
                    onChange={(e) => setBookingData({...bookingData, endPoint: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Enter drop-off location"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(null)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [newLocation, setNewLocation] = useState({
      name: '',
      price: '',
      duration: '',
      image: '🏞️',
      description: ''
    });

    const handleAddLocationSubmit = (e) => {
      e.preventDefault();
      handleAddLocation({
        ...newLocation,
        price: parseInt(newLocation.price)
      });
      setNewLocation({ name: '', price: '', duration: '', image: '🏞️', description: '' });
      setShowAddLocation(false);
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center">
                <User className="mr-2" />
                Admin Dashboard
              </h2>
              <div className="flex items-center mt-2">
                <Bell className="mr-2 text-red-500" />
                <span className="text-red-500 font-semibold">
                  {notifications.filter(n => !n.read).length} New Notifications
                </span>
              </div>
            </div>

            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'bookings' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bookings ({bookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'users' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Users ({users.length})
                </button>
                <button
                  onClick={() => setActiveTab('locations')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'locations' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Locations ({locations.length})
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'notifications' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Notifications ({notifications.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'bookings' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                  <div className="space-y-4">
                    {bookings.map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{booking.locationName}</h4>
                            <p className="text-gray-600">Customer: {booking.userName}</p>
                            <p className="text-gray-600">Route: {booking.startPoint} → {booking.endPoint}</p>
                            <p className="text-gray-600">Date: {booking.date} | Type: {booking.type}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                            <p className="text-lg font-bold mt-2">₹{booking.price.toLocaleString()}</p>
                            <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                              <MapPin size={16} className="inline mr-1" />
                              Track
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Registered Users</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'locations' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Travel Locations</h3>
                    <button
                      onClick={() => setShowAddLocation(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Location
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map(location => (
                      <div key={location.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="text-4xl text-center mb-3">{location.image}</div>
                        <h4 className="font-semibold mb-2">{location.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{location.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-600">₹{location.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">{location.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`${notification.read ? 'text-gray-600' : 'text-blue-900 font-medium'}`}>
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Location Modal */}
        {showAddLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
              <h3 className="text-xl font-bold mb-4">Add New Location</h3>
              <form onSubmit={handleAddLocationSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Location Name</label>
                  <input
                    type="text"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newLocation.price}
                    onChange={(e) => setNewLocation({...newLocation, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={newLocation.duration}
                    onChange={(e) => setNewLocation({...newLocation, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 3 Days 2 Nights"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Emoji Icon</label>
                  <input
                    type="text"
                    value={newLocation.image}
                    onChange={(e) => setNewLocation({...newLocation, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="🏞️"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newLocation.description}
                    onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Add Location
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLocation(false)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [trackingActive, setTrackingActive] = useState(false);
    const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');

    const userBookings = bookings.filter(booking => booking.userName === currentUser?.name);

    const startTracking = () => {
      setTrackingActive(true);
      // Simulate location updates
      const locations = ['Mumbai Central', 'Pune', 'Kolhapur', 'Goa Border', 'Panaji, Goa'];
      let index = 0;
      const interval = setInterval(() => {
        setCurrentLocation(locations[index]);
        index++;
        if (index >= locations.length) {
          clearInterval(interval);
          setTrackingActive(false);
        }
      }, 3000);
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold flex items-center">
                <User className="mr-2" />
                Welcome, {currentUser?.name}
              </h2>
              <p className="text-gray-600 mt-1">Manage your bookings and track your trips</p>
            </div>

            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'bookings' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Bookings ({userBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'tracking' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Live Tracking
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === 'profile' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profile
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Your Bookings</h3>
                    <button
                      onClick={() => setCurrentPage('destinations')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Book New Trip
                    </button>
                  </div>
                  
                  {userBookings.length > 0 ? (
                    <div className="space-y-4">
                      {userBookings.map(booking => (
                        <div key={booking.id} className="border rounded-lg p-6 bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xl font-semibold text-blue-600">{booking.locationName}</h4>
                              <div className="mt-2 space-y-1">
                                <p className="text-gray-600 flex items-center">
                                  <MapPin size={16} className="mr-2" />
                                  {booking.startPoint} → {booking.endPoint}
                                </p>
                                <p className="text-gray-600 flex items-center">
                                  <Calendar size={16} className="mr-2" />
                                  {booking.date}
                                </p>
                                <p className="text-gray-600 flex items-center">
                                  <Clock size={16} className="mr-2" />
                                  {booking.type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.toUpperCase()}
                              </span>
                              <p className="text-2xl font-bold mt-2 text-green-600">₹{booking.price.toLocaleString()}</p>
                              <button
                                onClick={() => setActiveTab('tracking')}
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                              >
                                <MapPin size={16} className="mr-2" />
                                Track Trip
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-500 mb-4">Start planning your next adventure!</p>
                      <button
                        onClick={() => setCurrentPage('destinations')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Browse Destinations
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'tracking' && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Real-time Location Tracking</h3>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="text-center">
                      <MapPin size={64} className="mx-auto text-blue-600 mb-4" />
                      <h4 className="text-xl font-semibold mb-2">Current Location</h4>
                      <p className="text-lg text-gray-700 mb-4">{currentLocation}</p>
                      
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={startTracking}
                          disabled={trackingActive}
                          className={`px-6 py-3 rounded-lg font-semibold ${
                            trackingActive 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                        >
                          {trackingActive ? 'Tracking Active...' : 'Start Live Tracking'}
                        </button>
                      </div>

                      {trackingActive && (
                        <div className="mt-6 p-4 bg-green-100 rounded-lg">
                          <div className="flex items-center justify-center">
                            <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-green-800 font-medium">Live tracking in progress...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <h5 className="font-semibold mb-3">Trip Timeline:</h5>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span>09:00 AM - Started from Mumbai</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                          <span>12:30 PM - Reached Pune (Break)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                          <span>Currently - En route to destination</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-lg font-semibold mb-6">Profile Information</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={currentUser?.name || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={currentUser?.email || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="+91 9876543210"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Address</label>
                        <input
                          type="text"
                          placeholder="Enter your address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Account Statistics</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-100 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{userBookings.length}</div>
                          <div className="text-sm text-gray-600">Total Trips</div>
                        </div>
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{userBookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">Total Spent</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-100 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">5★</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">About Bappu Tours & Traveling</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to <strong>Bappu Tours & Traveling</strong>, your premier destination for unforgettable travel experiences across India. 
              Founded with a passion for exploration and a commitment to excellence, we specialize in creating memorable journeys 
              that showcase the incredible diversity and beauty of our nation.
            </p>

            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To provide exceptional travel experiences that combine comfort, adventure, and cultural immersion while ensuring 
              complete customer satisfaction through innovative technology and personalized service.
            </p>

            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🛡️ Safety First</h4>
                <p className="text-gray-700">Your safety is our top priority with experienced drivers and well-maintained vehicles.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">💰 Best Prices</h4>
                <p className="text-gray-700">Competitive pricing without compromising on quality and service.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🕒 24/7 Support</h4>
                <p className="text-gray-700">Round-the-clock customer support for all your travel needs.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">📱 Smart Technology</h4>
                <p className="text-gray-700">Real-time tracking and instant notifications for a seamless experience.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>One-day local sightseeing tours</li>
              <li>Multi-day travel packages</li>
              <li>Corporate travel solutions</li>
              <li>Group tour arrangements</li>
              <li>Customized itinerary planning</li>
              <li>Real-time trip tracking</li>
            </ul>

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Start Your Journey?</h3>
              <p className="mb-4">Join thousands of satisfied customers who have chosen Bappu Tours for their travel adventures.</p>
              <button 
                onClick={() => setCurrentPage('destinations')}
                className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
              >
                Book Your Trip Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-blue-600 mt-1 mr-3" size={20} />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-gray-600">123 Travel Street, Tourism District<br />Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-3">📞</div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-600">+91 98765 43210<br />+91 98765 43211</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1 mr-3">✉️</div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">info@bapputours.com<br />bookings@bapputours.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-blue-600 mt-1 mr-3" size={20} />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    rows="5"
                    placeholder="Tell us about your travel plans..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Add new user
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      alert('Registration successful! Please login to continue.');
      setCurrentPage('login');
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="+91 9876543210"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegisterPage />}
      {currentPage === 'destinations' && <DestinationsPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'admin-dashboard' && userRole === 'admin' && <AdminDashboard />}
      {currentPage === 'user-dashboard' && userRole === 'user' && <UserDashboard />}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🚌 Bappu Tours</h3>
              <p className="text-gray-400 mb-4">
                Your trusted travel partner for exploring the beauty of India with comfort and style.
              </p>
              <div className="flex space-x-4">
                <span className="text-2xl">📘</span>
                <span className="text-2xl">📷</span>
                <span className="text-2xl">🐦</span>
                <span className="text-2xl">📺</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentPage('destinations')} className="hover:text-white">Destinations</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>One Day Tours</li>
                <li>Multi Day Packages</li>
                <li>Corporate Travel</li>
                <li>Group Bookings</li>
                <li>Custom Itineraries</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 123 Travel Street, Mumbai</p>
                <p>📞 +91 98765 43210</p>
                <p>✉️ info@bapputours.com</p>
                <p>🕒 9 AM - 8 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bappu Tours & Traveling. All rights reserved. | Designed with ❤️ for travelers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BappuToursWebsite;