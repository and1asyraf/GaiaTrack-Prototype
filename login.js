document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
        redirectToDashboard(userRole);
        return;
    }

    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // In a real application, this would validate against a backend
        // For demo purposes, we'll use a simple validation
        if (username && password) {
            // Store user info in session storage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userRole', role);

            // Redirect to appropriate dashboard
            redirectToDashboard(role);
        } else {
            alert('Please enter both username and password');
        }
    });

    function redirectToDashboard(role) {
        switch (role) {
            case 'admin':
                window.location.href = 'admin-dashboard.html';
                break;
            case 'analyst':
                window.location.href = 'analyst-dashboard.html';
                break;
            case 'manager':
                window.location.href = 'manager-dashboard.html';
                break;
            case 'floor_staff':
                window.location.href = 'floor-staff-dashboard.html';
                break;
            default:
                alert('Invalid role');
                break;
        }
    }
}); 