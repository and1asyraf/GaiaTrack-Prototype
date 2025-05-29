document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const userRole = sessionStorage.getItem('userRole');
    if (userRole) {
        redirectToDashboard(userRole);
        return;
    }

    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            // In a real application, this would validate against a backend
            // For demo purposes, we'll use a simple validation
            if (username && password && role) {
                // Store user info in session storage
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userRole', role);

                // Redirect to appropriate dashboard
                redirectToDashboard(role);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    function redirectToDashboard(role) {
        let dashboardUrl = '';
        
        switch(role.toLowerCase()) {
            case 'admin':
                dashboardUrl = 'admin-dashboard.html';
                break;
            case 'manager':
                dashboardUrl = 'manager-dashboard.html';
                break;
            case 'analyst':
                dashboardUrl = 'analyst-dashboard.html';
                break;
            default:
                alert('Invalid role selected. Please try again.');
                return;
        }

        if (dashboardUrl) {
            window.location.href = dashboardUrl;
        }
    }
}); 