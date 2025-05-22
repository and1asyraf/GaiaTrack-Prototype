// Check if user is logged in and has floor staff role
document.addEventListener('DOMContentLoaded', function() {
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');

    if (!userRole || userRole !== 'floor_staff') {
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

    // Initialize data arrays
    const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    let sensorData = {
        CO: Array(6).fill(0).map(() => Math.random() * 5),
        NOx: Array(6).fill(0).map(() => Math.random() * 20 + 10),
        NO2: Array(6).fill(0).map(() => Math.random() * 15 + 5)
    };

    let zoneStatus = {
        'Zone A': 85,
        'Zone B': 78,
        'Zone C': 92,
        'Zone D': 88
    };

    let maintenanceData = {
        scheduled: Array(7).fill(0).map(() => Math.random() * 6 + 2),
        completed: Array(7).fill(0).map(() => Math.random() * 4 + 1)
    };

    // Initialize charts
    const currentReadingsChart = new Chart(document.getElementById('currentReadingsChart'), {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'CO (ppm)',
                    data: sensorData.CO,
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'NOx (ppb)',
                    data: sensorData.NOx,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'NO2 (ppb)',
                    data: sensorData.NO2,
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
                    text: 'Current Readings'
                }
            }
        }
    });

    const zoneStatusChart = new Chart(document.getElementById('zoneStatusChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(zoneStatus),
            datasets: [{
                label: 'Status Score',
                data: Object.values(zoneStatus),
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Zone Status'
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

    const maintenanceScheduleChart = new Chart(document.getElementById('maintenanceScheduleChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Scheduled Tasks',
                    data: maintenanceData.scheduled,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'Completed Tasks',
                    data: maintenanceData.completed,
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
                    text: 'Maintenance Schedule'
                }
            }
        }
    });

    // Initialize Air Quality Analysis Charts
    const aqiTrendsChart = new Chart(document.getElementById('aqiTrendsChart'), {
        type: 'line',
        data: {
            labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'],
            datasets: [{
                label: 'AQI',
                data: [65, 70, 68, 72, 75, 73, 75],
                borderColor: '#3498db',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'AQI Trends'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    const pollutantAnalysisChart = new Chart(document.getElementById('pollutantAnalysisChart'), {
        type: 'bar',
        data: {
            labels: ['CO', 'NO2', 'Benzene'],
            datasets: [{
                label: 'Current Levels',
                data: [2.5, 15, 0.8],
                backgroundColor: [
                    '#e74c3c',
                    '#3498db',
                    '#2ecc71'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Pollutant Levels'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const environmentalConditionsChart = new Chart(document.getElementById('environmentalConditionsChart'), {
        type: 'line',
        data: {
            labels: ['6h ago', '5h ago', '4h ago', '3h ago', '2h ago', '1h ago', 'Now'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [21, 21.5, 22, 22.5, 22, 21.8, 22],
                borderColor: '#e67e22',
                tension: 0.4,
                fill: false
            }, {
                label: 'Humidity (%)',
                data: [45, 44, 46, 45, 44, 45, 45],
                borderColor: '#3498db',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Environmental Conditions'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    const timeAnalysisChart = new Chart(document.getElementById('timeAnalysisChart'), {
        type: 'bar',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Average AQI',
                data: [65, 68, 72, 75, 73, 70],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Time-based Analysis'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Update the real-time data updates function to include new charts
    setInterval(() => {
        // Update sensor data with trends and anomalies
        sensorData.CO = sensorData.CO.map((value, i) => 
            detectAnomaly(generateTrendingData(value, 0.1, 0.5), 0.3)
        );
        sensorData.NOx = sensorData.NOx.map((value, i) => 
            detectAnomaly(generateTrendingData(value, 0.2, 1), 0.4)
        );
        sensorData.NO2 = sensorData.NO2.map((value, i) => 
            detectAnomaly(generateTrendingData(value, 0.15, 0.8), 0.35)
        );

        // Update zone status with gradual changes
        Object.keys(zoneStatus).forEach(zone => {
            zoneStatus[zone] = Math.max(0, Math.min(100,
                zoneStatus[zone] + generateTrendingData(0, 0.1, 0.8)));
        });

        // Update maintenance data
        maintenanceData.scheduled = maintenanceData.scheduled.map((value, i) =>
            Math.max(0, value + generateTrendingData(0, 0.05, 0.3)));
        maintenanceData.completed = maintenanceData.completed.map((value, i) =>
            Math.min(maintenanceData.scheduled[i], value + generateTrendingData(0, 0.1, 0.2)));

        // Update charts
        currentReadingsChart.data.datasets[0].data = sensorData.CO;
        currentReadingsChart.data.datasets[1].data = sensorData.NOx;
        currentReadingsChart.data.datasets[2].data = sensorData.NO2;
        currentReadingsChart.update();

        zoneStatusChart.data.datasets[0].data = Object.values(zoneStatus);
        zoneStatusChart.update();

        maintenanceScheduleChart.data.datasets[0].data = maintenanceData.scheduled;
        maintenanceScheduleChart.data.datasets[1].data = maintenanceData.completed;
        maintenanceScheduleChart.update();

        // Update AQI trends
        const newAQI = Math.floor(Math.random() * 200);
        aqiTrendsChart.data.datasets[0].data.shift();
        aqiTrendsChart.data.datasets[0].data.push(newAQI);
        aqiTrendsChart.update();

        // Update pollutant analysis
        pollutantAnalysisChart.data.datasets[0].data = [
            (Math.random() * 5).toFixed(1),
            (Math.random() * 30).toFixed(1),
            (Math.random() * 2).toFixed(1)
        ];
        pollutantAnalysisChart.update();

        // Update environmental conditions
        environmentalConditionsChart.data.datasets[0].data.shift();
        environmentalConditionsChart.data.datasets[0].data.push(20 + Math.random() * 5);
        environmentalConditionsChart.data.datasets[1].data.shift();
        environmentalConditionsChart.data.datasets[1].data.push(40 + Math.random() * 20);
        environmentalConditionsChart.update();

        // Update time analysis
        timeAnalysisChart.data.datasets[0].data = timeAnalysisChart.data.datasets[0].data.map(value =>
            Math.max(0, Math.min(100, value + (Math.random() * 10 - 5)))
        );
        timeAnalysisChart.update();

        // Check for anomalies and update alerts
        checkForAnomalies();
    }, 5000); // Update every 5 seconds

    function checkForAnomalies() {
        const lastCO = sensorData.CO[sensorData.CO.length - 1];
        const lastNOx = sensorData.NOx[sensorData.NOx.length - 1];
        const lastNO2 = sensorData.NO2[sensorData.NO2.length - 1];

        if (lastCO > 4) {
            addAlert(`Elevated CO levels detected (${lastCO.toFixed(1)} ppm)`);
        }
        if (lastNOx > 25) {
            addAlert(`High NOx concentration (${lastNOx.toFixed(1)} ppb)`);
        }
        if (lastNO2 > 15) {
            addAlert(`NO2 levels above threshold (${lastNO2.toFixed(1)} ppb)`);
        }

        // Check zone status
        Object.entries(zoneStatus).forEach(([zone, status]) => {
            if (status < 70) {
                addAlert(`Low performance in ${zone} (${status.toFixed(1)}%)`);
            }
        });
    }

    function addAlert(message) {
        const alertsList = document.querySelector('.alerts-list');
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

    // Handle task completion
    document.querySelectorAll('.task-item .complete-button').forEach(button => {
        button.addEventListener('click', function() {
            const taskItem = this.closest('.task-item');
            taskItem.classList.add('completed');
            this.textContent = 'Completed';
            this.disabled = true;
        });
    });
}); 