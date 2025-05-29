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

        // Update modal charts if they exist
        const modalSystemHealthChart = Chart.getChart('modalSystemHealthChart');
        if (modalSystemHealthChart) {
            modalSystemHealthChart.data.datasets[0].data = [
                systemHealth.healthy,
                systemHealth.warning,
                systemHealth.critical
            ];
            modalSystemHealthChart.update();
        }

        const modalUserActivityChart = Chart.getChart('modalUserActivityChart');
        if (modalUserActivityChart) {
            modalUserActivityChart.data.datasets[0].data = userActivity.active;
            modalUserActivityChart.data.datasets[1].data = userActivity.new;
            modalUserActivityChart.update();
        }

        const modalDataUsageChart = Chart.getChart('modalDataUsageChart');
        if (modalDataUsageChart) {
            modalDataUsageChart.data.datasets[0].data = Object.values(dataUsage);
            modalDataUsageChart.update();
        }

        const modalSecurityEventsChart = Chart.getChart('modalSecurityEventsChart');
        if (modalSecurityEventsChart) {
            modalSecurityEventsChart.data.datasets[0].data = securityEvents.loginAttempts;
            modalSecurityEventsChart.data.datasets[1].data = securityEvents.failedLogins;
            modalSecurityEventsChart.update();
        }
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

    // Overlay/Modal functionality
    const overlay = document.getElementById('overlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    // Function to show modal with content
    function showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to hide modal
    function hideModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Close modal when clicking close button or overlay
    closeModal.addEventListener('click', hideModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            hideModal();
        }
    });

    // Add click handlers to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Ignore clicks on tooltip icons
            if (event.target.closest('.tooltip-icon')) {
                return;
            }

            const title = card.querySelector('h2').textContent;
            let content = '';

            // Generate detailed content based on card type
            switch (title) {
                case 'System Health Overview':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalSystemHealthChart"></canvas>
                        </div>
                        <div class="health-metrics">
                            <div class="metric">
                                <h3>CPU Usage</h3>
                                <p>Current: 45%</p>
                                <p>Peak: 78%</p>
                            </div>
                            <div class="metric">
                                <h3>Memory Usage</h3>
                                <p>Current: 62%</p>
                                <p>Peak: 85%</p>
                            </div>
                            <div class="metric">
                                <h3>Storage Usage</h3>
                                <p>Current: 58%</p>
                                <p>Peak: 72%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'User Management':
                    content = `
                        <div class="users-list">
                            <div class="user-item" data-user-id="1">
                                <span class="user-name">John Doe</span>
                                <span class="user-role">Analyst</span>
                                <span class="user-email">john.doe@example.com</span>
                                <span class="user-last-login">Last login: 2 hours ago</span>
                                <div class="user-actions">
                                    <button class="action-button" data-action="edit">Edit</button>
                                    <button class="action-button" data-action="delete">Delete</button>
                                    <button class="action-button" data-action="reset">Reset Password</button>
                                </div>
                            </div>
                            <!-- Add more detailed user items -->
                        </div>
                        <button class="add-user-button primary">Add New User</button>
                    `;
                    break;

                case 'System Settings':
                    content = `
                        <div class="settings-grid">
                            <div class="setting-item">
                                <label for="modalDataRetention">Data Retention (days)</label>
                                <input type="number" id="modalDataRetention" value="90" min="1" max="365">
                                <p class="setting-description">Number of days to retain historical data</p>
                            </div>
                            <div class="setting-item">
                                <label for="modalBackupFrequency">Backup Frequency (hours)</label>
                                <input type="number" id="modalBackupFrequency" value="24" min="1" max="168">
                                <p class="setting-description">How often to perform system backups</p>
                            </div>
                            <div class="setting-item">
                                <label for="modalAlertThreshold">Alert Threshold (%)</label>
                                <input type="number" id="modalAlertThreshold" value="80" min="1" max="100">
                                <p class="setting-description">Threshold for triggering system alerts</p>
                            </div>
                            <div class="setting-item">
                                <label for="modalMaintenanceWindow">Maintenance Window</label>
                                <select id="modalMaintenanceWindow">
                                    <option value="weekday">Weekday (9 AM - 5 PM)</option>
                                    <option value="weekend">Weekend (Saturday)</option>
                                    <option value="night">Night (10 PM - 6 AM)</option>
                                </select>
                                <p class="setting-description">Preferred time for system maintenance</p>
                            </div>
                        </div>
                        <button class="save-settings-button primary">Save Settings</button>
                    `;
                    break;

                case 'User Activity':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalUserActivityChart"></canvas>
                        </div>
                        <div class="activity-stats">
                            <div class="stat">
                                <h3>Active Users</h3>
                                <p>Current: 12</p>
                                <p>Today: 45</p>
                            </div>
                            <div class="stat">
                                <h3>Total Sessions</h3>
                                <p>Today: 78</p>
                                <p>This Week: 342</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'System Resource Usage':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalDataUsageChart"></canvas>
                        </div>
                        <div class="resource-stats">
                            <div class="stat">
                                <h3>Storage</h3>
                                <p>Used: 1.2 TB</p>
                                <p>Total: 2 TB</p>
                            </div>
                            <div class="stat">
                                <h3>Bandwidth</h3>
                                <p>Current: 45 Mbps</p>
                                <p>Peak: 120 Mbps</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Security Events':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalSecurityEventsChart"></canvas>
                        </div>
                        <div class="security-stats">
                            <div class="stat">
                                <h3>Failed Logins</h3>
                                <p>Today: 12</p>
                                <p>This Week: 45</p>
                            </div>
                            <div class="stat">
                                <h3>Blocked IPs</h3>
                                <p>Current: 3</p>
                                <p>Total: 28</p>
                            </div>
                        </div>
                    `;
                    break;
            }

            showModal(title, content);

            // Initialize charts in the modal
            if (content.includes('chart-container')) {
                // Wait for the modal to be fully rendered
                setTimeout(() => {
                    switch (title) {
                        case 'System Health Overview':
                            new Chart(document.getElementById('modalSystemHealthChart'), {
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
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'System Health'
                                        }
                                    }
                                }
                            });
                            break;

                        case 'User Activity':
                            new Chart(document.getElementById('modalUserActivityChart'), {
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
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'User Activity'
                                        }
                                    }
                                }
                            });
                            break;

                        case 'System Resource Usage':
                            new Chart(document.getElementById('modalDataUsageChart'), {
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
                                    maintainAspectRatio: false,
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
                            break;

                        case 'Security Events':
                            new Chart(document.getElementById('modalSecurityEventsChart'), {
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
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Security Events'
                                        }
                                    }
                                }
                            });
                            break;
                    }
                }, 100); // Small delay to ensure modal is rendered
            }
        });
    });

    // Function to show tooltip modal
    window.showTooltipModal = function(element, event) {
        // Prevent the click from bubbling up to the card
        if (event) {
            event.stopPropagation();
        }

        const tooltip = element.getAttribute('data-tooltip');
        if (!tooltip) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const overlay = document.getElementById('overlay');

        // Get the parent card title if available
        const cardHeader = element.closest('.card-header');
        const cardTitle = cardHeader ? cardHeader.querySelector('h2').textContent : 'Information';

        modalTitle.textContent = cardTitle;
        modalContent.innerHTML = `
            <div class="tooltip-modal-content">
                <p>${tooltip}</p>
            </div>
        `;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
});