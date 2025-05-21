// Check if user is logged in and has admin role
document.addEventListener('DOMContentLoaded', function() {
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');

    if (!userRole || userRole !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    // Display username
    document.getElementById('username').textContent = username;

    // Sidebar Toggle Functionality
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = sidebarToggle.querySelector('i');

    // Function to check if device is mobile
    const isMobile = () => window.innerWidth <= 768;

    // Function to set mobile state
    const setMobileState = () => {
        sidebar.classList.add('collapsed');
        sidebar.classList.remove('expanded');
        mainContent.classList.add('expanded');
        sidebarToggle.classList.add('collapsed');
        sidebarToggle.classList.remove('expanded');
    };

    // Function to set desktop state
    const setDesktopState = (isCollapsed) => {
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded');
            mainContent.classList.add('expanded');
            sidebarToggle.classList.add('collapsed');
            sidebarToggle.classList.remove('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            sidebar.classList.add('expanded');
            mainContent.classList.remove('expanded');
            sidebarToggle.classList.remove('collapsed');
            sidebarToggle.classList.add('expanded');
        }
    };

    // Initialize sidebar state
    const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isMobile()) {
        setMobileState();
    } else {
        setDesktopState(isSidebarCollapsed);
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
        if (isMobile()) {
            // For mobile, we want to show the sidebar when it's collapsed
            if (sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed');
                sidebar.classList.add('expanded');
                mainContent.classList.remove('expanded');
                sidebarToggle.classList.remove('collapsed');
                sidebarToggle.classList.add('expanded');
            } else {
                sidebar.classList.add('collapsed');
                sidebar.classList.remove('expanded');
                mainContent.classList.add('expanded');
                sidebarToggle.classList.add('collapsed');
                sidebarToggle.classList.remove('expanded');
            }
        } else {
            // For desktop, toggle the state and save it
            const willBeCollapsed = !sidebar.classList.contains('collapsed');
            if (willBeCollapsed) {
                sidebar.classList.add('collapsed');
                sidebar.classList.remove('expanded');
                mainContent.classList.add('expanded');
                sidebarToggle.classList.add('collapsed');
                sidebarToggle.classList.remove('expanded');
            } else {
                sidebar.classList.remove('collapsed');
                sidebar.classList.add('expanded');
                mainContent.classList.remove('expanded');
                sidebarToggle.classList.remove('collapsed');
                sidebarToggle.classList.add('expanded');
            }
            localStorage.setItem('sidebarCollapsed', willBeCollapsed);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (isMobile()) {
            setMobileState();
        } else {
            setDesktopState(isSidebarCollapsed);
        }
    });

    // AI-like data generation functions
    function generateTrendingData(baseValue, trend, noise) {
        return baseValue + trend + (Math.random() * noise - noise/2);
    }

    function detectAnomaly(value, threshold) {
        return Math.random() < 0.05 ? value * (1 + Math.random() * threshold) : value;
    }

    function predictNextValue(historicalData, lookback = 3) {
        if (historicalData.length < lookback) return historicalData[historicalData.length - 1];
        const recent = historicalData.slice(-lookback);
        const trend = recent[recent.length - 1] - recent[0];
        return recent[recent.length - 1] + trend + (Math.random() * 0.2 - 0.1);
    }

    // Initialize data
    let systemHealth = {
        healthy: 80,
        warning: 15,
        critical: 5
    };

    let userActivity = {
        active: Array(7).fill(0).map(() => Math.random() * 30 + 20),
        new: Array(7).fill(0).map(() => Math.random() * 9 + 1)
    };

    let dataUsage = {
        storage: 65,
        bandwidth: 45,
        apiCalls: 75,
        database: 55
    };

    let securityEvents = {
        loginAttempts: Array(6).fill(0).map(() => Math.random() * 15 + 5),
        failedLogins: Array(6).fill(0).map(() => Math.random() * 5)
    };

    // Initialize charts
    const systemHealthChart = new Chart(document.getElementById('systemHealthChart'), {
        type: 'doughnut',
        data: {
            labels: ['Healthy', 'Warning', 'Critical'],
            datasets: [{
                data: [systemHealth.healthy, systemHealth.warning, systemHealth.critical],
                backgroundColor: [
                    '#2ecc71',
                    '#f1c40f',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'System Health'
                }
            }
        }
    });

    const userActivityChart = new Chart(document.getElementById('userActivityChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Active Users',
                    data: userActivity.active,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'New Users',
                    data: userActivity.new,
                    borderColor: '#2ecc71',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'User Activity'
                }
            }
        }
    });

    const dataUsageChart = new Chart(document.getElementById('dataUsageChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(dataUsage),
            datasets: [{
                label: 'Usage (%)',
                data: Object.values(dataUsage),
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'System Resource Usage'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    const securityEventsChart = new Chart(document.getElementById('securityEventsChart'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Login Attempts',
                    data: securityEvents.loginAttempts,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'Failed Logins',
                    data: securityEvents.failedLogins,
                    borderColor: '#e74c3c',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Security Events'
                }
            }
        }
    });

    // Real-time data updates
    setInterval(() => {
        // Update system health with realistic patterns
        systemHealth.healthy = Math.max(0, Math.min(100, 
            systemHealth.healthy + generateTrendingData(0, 0.2, 1)));
        systemHealth.warning = Math.max(0, Math.min(100 - systemHealth.healthy, 
            systemHealth.warning + generateTrendingData(0, 0.1, 0.5)));
        systemHealth.critical = 100 - systemHealth.healthy - systemHealth.warning;

        // Update user activity with weekly patterns
        userActivity.active = userActivity.active.map((value, i) =>
            detectAnomaly(generateTrendingData(value, 0.05, 0.3), 0.2));
        userActivity.new = userActivity.new.map((value, i) =>
            detectAnomaly(generateTrendingData(value, 0.1, 0.2), 0.3));

        // Update data usage with realistic fluctuations
        Object.keys(dataUsage).forEach(category => {
            dataUsage[category] = Math.max(0, Math.min(100,
                dataUsage[category] + generateTrendingData(0, 0.1, 0.5)));
        });

        // Update security events with realistic patterns
        securityEvents.loginAttempts = securityEvents.loginAttempts.map((value, i) =>
            detectAnomaly(generateTrendingData(value, 0.05, 0.3), 0.4));
        securityEvents.failedLogins = securityEvents.failedLogins.map((value, i) =>
            detectAnomaly(generateTrendingData(value, 0.02, 0.2), 0.5));

        // Update charts
        systemHealthChart.data.datasets[0].data = [
            systemHealth.healthy,
            systemHealth.warning,
            systemHealth.critical
        ];
        systemHealthChart.update();

        userActivityChart.data.datasets[0].data = userActivity.active;
        userActivityChart.data.datasets[1].data = userActivity.new;
        userActivityChart.update();

        dataUsageChart.data.datasets[0].data = Object.values(dataUsage);
        dataUsageChart.update();

        securityEventsChart.data.datasets[0].data = securityEvents.loginAttempts;
        securityEventsChart.data.datasets[1].data = securityEvents.failedLogins;
        securityEventsChart.update();

        // Check for anomalies and update alerts
        checkForAnomalies();
    }, 5000); // Update every 5 seconds

    function checkForAnomalies() {
        if (systemHealth.critical > 10) {
            addAlert(`Critical system health: ${systemHealth.critical.toFixed(1)}%`);
        }
        if (systemHealth.warning > 20) {
            addAlert(`High warning level: ${systemHealth.warning.toFixed(1)}%`);
        }

        const lastLoginAttempts = securityEvents.loginAttempts[securityEvents.loginAttempts.length - 1];
        const lastFailedLogins = securityEvents.failedLogins[securityEvents.failedLogins.length - 1];
        
        if (lastFailedLogins > 3) {
            addAlert(`High number of failed login attempts: ${lastFailedLogins}`);
        }
        if (lastLoginAttempts > 15) {
            addAlert(`Unusual login activity detected: ${lastLoginAttempts} attempts`);
        }

        Object.entries(dataUsage).forEach(([category, usage]) => {
            if (usage > 80) {
                addAlert(`High ${category} usage: ${usage.toFixed(1)}%`);
            }
        });
    }

    function addAlert(message) {
        const alertsList = document.querySelector('.alerts-list');
        if (!alertsList) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const alertItem = document.createElement('div');
        alertItem.className = 'alert-item';
        alertItem.innerHTML = `
            <span class="alert-time">${timeString}</span>
            <span class="alert-message">${message}</span>
        `;
        
        alertsList.insertBefore(alertItem, alertsList.firstChild);
        if (alertsList.children.length > 5) {
            alertsList.removeChild(alertsList.lastChild);
        }
    }

    // Handle logout
    document.querySelector('a[href="index.html"]').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Handle user management
    document.querySelectorAll('.user-item .action-button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const userId = this.closest('.user-item').dataset.userId;
            
            if (action === 'edit') {
                // Handle edit user
                console.log(`Edit user ${userId}`);
            } else if (action === 'delete') {
                // Handle delete user
                console.log(`Delete user ${userId}`);
            }
        });
    });
});