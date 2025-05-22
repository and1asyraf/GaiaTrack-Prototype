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
        card.addEventListener('click', () => {
            const title = card.querySelector('h2').textContent;
            let content = '';

            // Generate detailed content based on card type
            switch (title) {
                case 'Air Quality Analysis':
                    content = `
                        <div class="analysis-grid">
                            <div class="analysis-section">
                                <h3>AQI Trends</h3>
                                <div class="chart-container">
                                    <canvas id="modalAqiTrendsChart"></canvas>
                                </div>
                            </div>
                            <div class="analysis-section">
                                <h3>Pollutant Analysis</h3>
                                <div class="chart-container">
                                    <canvas id="modalPollutantAnalysisChart"></canvas>
                                </div>
                            </div>
                            <div class="analysis-section">
                                <h3>Environmental Conditions</h3>
                                <div class="chart-container">
                                    <canvas id="modalEnvironmentalConditionsChart"></canvas>
                                </div>
                            </div>
                            <div class="analysis-section">
                                <h3>Time-based Analysis</h3>
                                <div class="chart-container">
                                    <canvas id="modalTimeAnalysisChart"></canvas>
                                </div>
                            </div>
                        </div>
                    `;
                    break;

                case 'Current Readings':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalCurrentReadingsChart"></canvas>
                        </div>
                        <div class="readings-stats">
                            <div class="stat">
                                <h3>Latest Readings</h3>
                                <p>CO: 2.5 ppm</p>
                                <p>NOx: 0.8 ppm</p>
                                <p>Temperature: 22°C</p>
                                <p>Humidity: 45%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Zone Status':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalZoneStatusChart"></canvas>
                        </div>
                        <div class="zone-stats">
                            <div class="stat">
                                <h3>Zone A</h3>
                                <p>Status: Normal</p>
                                <p>Last Check: 10 mins ago</p>
                            </div>
                            <div class="stat">
                                <h3>Zone B</h3>
                                <p>Status: Warning</p>
                                <p>Last Check: 5 mins ago</p>
                            </div>
                            <div class="stat">
                                <h3>Zone C</h3>
                                <p>Status: Normal</p>
                                <p>Last Check: 15 mins ago</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Maintenance Schedule':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalMaintenanceScheduleChart"></canvas>
                        </div>
                        <div class="maintenance-list">
                            <div class="maintenance-item">
                                <span class="maintenance-time">Today, 2:00 PM</span>
                                <span class="maintenance-description">Routine sensor calibration - Zone A</span>
                            </div>
                            <div class="maintenance-item">
                                <span class="maintenance-time">Tomorrow, 10:00 AM</span>
                                <span class="maintenance-description">Filter replacement - Zone B</span>
                            </div>
                            <div class="maintenance-item">
                                <span class="maintenance-time">Tomorrow, 3:00 PM</span>
                                <span class="maintenance-description">System check - Zone C</span>
                            </div>
                        </div>
                    `;
                    break;

                case 'Current Tasks':
                    content = `
                        <div class="tasks-list">
                            <div class="task-item">
                                <span class="task-time">10:00 AM</span>
                                <span class="task-description">Check CO sensor calibration in Zone A</span>
                                <button class="complete-button">Complete</button>
                            </div>
                            <div class="task-item">
                                <span class="task-time">11:30 AM</span>
                                <span class="task-description">Replace NOx sensor filter in Zone B</span>
                                <button class="complete-button">Complete</button>
                            </div>
                            <div class="task-item">
                                <span class="task-time">02:00 PM</span>
                                <span class="task-description">Perform routine maintenance on Zone C equipment</span>
                                <button class="complete-button">Complete</button>
                            </div>
                        </div>
                    `;
                    break;

                case 'Quick Actions':
                    content = `
                        <div class="actions-grid">
                            <button class="action-button">Report Issue</button>
                            <button class="action-button">Request Supplies</button>
                            <button class="action-button">View Instructions</button>
                            <button class="action-button">Contact Supervisor</button>
                            <button class="action-button">Request Maintenance</button>
                            <button class="action-button">View Schedule</button>
                        </div>
                    `;
                    break;

                case 'Recent Alerts':
                    content = `
                        <div class="alerts-list">
                            <div class="alert-item">
                                <span class="alert-time">09:45 AM</span>
                                <span class="alert-message">CO sensor in Zone A needs calibration</span>
                                <span class="alert-priority high">High Priority</span>
                            </div>
                            <div class="alert-item">
                                <span class="alert-time">09:30 AM</span>
                                <span class="alert-message">NOx filter replacement due in Zone B</span>
                                <span class="alert-priority medium">Medium Priority</span>
                            </div>
                            <div class="alert-item">
                                <span class="alert-time">09:15 AM</span>
                                <span class="alert-message">Routine maintenance scheduled for Zone C</span>
                                <span class="alert-priority low">Low Priority</span>
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
                        case 'Air Quality Analysis':
                            // Initialize all four charts for Air Quality Analysis
                            new Chart(document.getElementById('modalAqiTrendsChart'), {
                                type: 'line',
                                data: {
                                    labels: aqiTrendsChart.data.labels,
                                    datasets: [{
                                        label: 'AQI',
                                        data: [...aqiTrendsChart.data.datasets[0].data],
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

                            new Chart(document.getElementById('modalPollutantAnalysisChart'), {
                                type: 'bar',
                                data: {
                                    labels: pollutantAnalysisChart.data.labels,
                                    datasets: [{
                                        label: 'Current Levels',
                                        data: [...pollutantAnalysisChart.data.datasets[0].data],
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

                            new Chart(document.getElementById('modalEnvironmentalConditionsChart'), {
                                type: 'line',
                                data: {
                                    labels: environmentalConditionsChart.data.labels,
                                    datasets: [
                                        {
                                            label: 'Temperature (°C)',
                                            data: [...environmentalConditionsChart.data.datasets[0].data],
                                            borderColor: '#e67e22',
                                            tension: 0.4,
                                            fill: false
                                        },
                                        {
                                            label: 'Humidity (%)',
                                            data: [...environmentalConditionsChart.data.datasets[1].data],
                                            borderColor: '#3498db',
                                            tension: 0.4,
                                            fill: false
                                        }
                                    ]
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

                            new Chart(document.getElementById('modalTimeAnalysisChart'), {
                                type: 'bar',
                                data: {
                                    labels: timeAnalysisChart.data.labels,
                                    datasets: [{
                                        label: 'Average AQI',
                                        data: [...timeAnalysisChart.data.datasets[0].data],
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
                            break;

                        case 'Current Readings':
                            new Chart(document.getElementById('modalCurrentReadingsChart'), {
                                type: 'line',
                                data: {
                                    labels: currentReadingsChart.data.labels,
                                    datasets: currentReadingsChart.data.datasets.map(dataset => ({
                                        label: dataset.label,
                                        data: [...dataset.data],
                                        borderColor: dataset.borderColor,
                                        tension: 0.4
                                    }))
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Current Readings'
                                        }
                                    }
                                }
                            });
                            break;

                        case 'Zone Status':
                            new Chart(document.getElementById('modalZoneStatusChart'), {
                                type: 'bar',
                                data: {
                                    labels: zoneStatusChart.data.labels,
                                    datasets: [{
                                        label: 'Status Score',
                                        data: [...zoneStatusChart.data.datasets[0].data],
                                        backgroundColor: '#3498db'
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
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
                            break;

                        case 'Maintenance Schedule':
                            new Chart(document.getElementById('modalMaintenanceScheduleChart'), {
                                type: 'line',
                                data: {
                                    labels: maintenanceScheduleChart.data.labels,
                                    datasets: maintenanceScheduleChart.data.datasets.map(dataset => ({
                                        label: dataset.label,
                                        data: [...dataset.data],
                                        borderColor: dataset.borderColor,
                                        tension: 0.4
                                    }))
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Maintenance Schedule'
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

    // Update the real-time data updates to also update modal charts if they exist
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

        // Update modal charts if they exist
        const modalCharts = {
            'modalAqiTrendsChart': aqiTrendsChart,
            'modalPollutantAnalysisChart': pollutantAnalysisChart,
            'modalEnvironmentalConditionsChart': environmentalConditionsChart,
            'modalTimeAnalysisChart': timeAnalysisChart,
            'modalCurrentReadingsChart': currentReadingsChart,
            'modalZoneStatusChart': zoneStatusChart,
            'modalMaintenanceScheduleChart': maintenanceScheduleChart
        };

        Object.entries(modalCharts).forEach(([modalId, sourceChart]) => {
            const modalChart = Chart.getChart(modalId);
            if (modalChart) {
                modalChart.data = sourceChart.data;
                modalChart.update();
            }
        });
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