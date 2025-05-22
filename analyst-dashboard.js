// Check if user is logged in and has analyst role
document.addEventListener('DOMContentLoaded', function() {
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');

    if (!userRole || userRole !== 'analyst') {
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
    let envData = {
        temperature: Array(6).fill(0).map(() => Math.random() * 15 + 15),
        humidity: Array(6).fill(0).map(() => Math.random() * 40 + 30),
        pressure: Array(6).fill(0).map(() => Math.random() * 40 + 980)
    };
    let predictions = {
        CO: [...sensorData.CO]
    };

    // Initialize charts
    const sensorTrendsChart = new Chart(document.getElementById('sensorTrendsChart'), {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'CO',
                    data: sensorData.CO,
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'NOx',
                    data: sensorData.NOx,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'NO2',
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
                    text: 'Sensor Response Trends'
                }
            }
        }
    });

    const envContextChart = new Chart(document.getElementById('envContextChart'), {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: envData.temperature,
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'Humidity (%)',
                    data: envData.humidity,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'Pressure (hPa)',
                    data: envData.pressure,
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
                    text: 'Environmental Context'
                }
            }
        }
    });

    // Initialize pollution heatmap
    const pollutionHeatmap = new Chart(document.getElementById('pollutionHeatmap'), {
        type: 'bar',
        data: {
            labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
            datasets: [{
                label: 'Pollution Level',
                data: [65, 59, 80, 81],
                backgroundColor: [
                    '#2ecc71',
                    '#f1c40f',
                    '#e74c3c',
                    '#3498db'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Pollution Heatmap'
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

    const aiPredictionsChart = new Chart(document.getElementById('aiPredictionsChart'), {
        type: 'line',
        data: {
            labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h'],
            datasets: [
                {
                    label: 'Actual CO',
                    data: predictions.CO,
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'Predicted CO',
                    data: predictions.CO.map((_, i) => predictNextValue(predictions.CO.slice(0, i + 1))),
                    borderColor: '#e74c3c',
                    borderDash: [5, 5],
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'AI Predictions vs Actual'
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

        // Update environmental data with realistic patterns
        envData.temperature = envData.temperature.map((value, i) => 
            generateTrendingData(value, 0.05, 0.3)
        );
        envData.humidity = envData.humidity.map((value, i) => 
            generateTrendingData(value, 0.1, 0.4)
        );
        envData.pressure = envData.pressure.map((value, i) => 
            generateTrendingData(value, 0.02, 0.2)
        );

        // Update predictions
        predictions.CO = [...sensorData.CO, predictNextValue(sensorData.CO)];

        // Update charts
        sensorTrendsChart.data.datasets[0].data = sensorData.CO;
        sensorTrendsChart.data.datasets[1].data = sensorData.NOx;
        sensorTrendsChart.data.datasets[2].data = sensorData.NO2;
        sensorTrendsChart.update();

        envContextChart.data.datasets[0].data = envData.temperature;
        envContextChart.data.datasets[1].data = envData.humidity;
        envContextChart.data.datasets[2].data = envData.pressure;
        envContextChart.update();

        // Update heatmap with new pollution levels
        pollutionHeatmap.data.datasets[0].data = pollutionHeatmap.data.datasets[0].data.map(value =>
            Math.max(0, Math.min(100, value + (Math.random() * 10 - 5)))
        );
        pollutionHeatmap.update();

        // Update AI predictions
        aiPredictionsChart.data.datasets[0].data = predictions.CO;
        aiPredictionsChart.data.datasets[1].data = predictions.CO.map((_, i) => 
            predictNextValue(predictions.CO.slice(0, i + 1))
        );
        aiPredictionsChart.update();

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
    document.querySelector('.sidebar-footer .logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Handle quick action buttons
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            console.log(`Action clicked: ${action}`);
            // Add specific functionality for each action here
        });
    });
}); 