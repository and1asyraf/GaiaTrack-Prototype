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

    // Check if sidebar state is saved in localStorage
    const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
        sidebarToggle.classList.add('collapsed');
    }

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        sidebar.classList.toggle('expanded');
        mainContent.classList.toggle('expanded');
        sidebarToggle.classList.toggle('collapsed');
        sidebarToggle.classList.toggle('expanded');
        
        // Save sidebar state to localStorage
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
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

    // Real-time data updates
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