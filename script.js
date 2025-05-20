// Dashboard Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetDashboard = e.target.getAttribute('data-dashboard');
        
        // Hide all dashboards
        document.querySelectorAll('.dashboard').forEach(dashboard => {
            dashboard.classList.remove('active');
        });
        
        // Show selected dashboard
        document.getElementById(`${targetDashboard}-dashboard`).classList.add('active');
    });
});

// Generate random data for charts
function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Chart configurations
const chartConfigs = {
    sensorTrends: {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'CO',
                    data: generateRandomData(6, 1, 5),
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'NOx',
                    data: generateRandomData(6, 10, 30),
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'NO2',
                    data: generateRandomData(6, 5, 20),
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
    },
    envContext: {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: generateRandomData(6, 15, 30),
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'Humidity (%)',
                    data: generateRandomData(6, 30, 70),
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'Pressure (hPa)',
                    data: generateRandomData(6, 980, 1020),
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
    },
    pollutionHeatmap: {
        type: 'heatmap',
        data: {
            labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
            datasets: [{
                data: [
                    [65, 59, 80, 81],
                    [56, 55, 40, 50],
                    [80, 40, 65, 59],
                    [40, 80, 81, 56]
                ],
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
                    text: 'Pollution Heatmap'
                }
            }
        }
    },
    aiPredictions: {
        type: 'line',
        data: {
            labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h'],
            datasets: [
                {
                    label: 'Actual CO',
                    data: generateRandomData(7, 1, 5),
                    borderColor: '#e74c3c',
                    tension: 0.4
                },
                {
                    label: 'Predicted CO',
                    data: generateRandomData(7, 1, 5),
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
    },
    forecast: {
        type: 'line',
        data: {
            labels: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Forecasted Air Quality',
                data: generateRandomData(5, 30, 100),
                borderColor: '#3498db',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(52, 152, 219, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '5-Day Air Quality Forecast'
                }
            }
        }
    }
};

// Initialize charts when dashboard becomes active
function initializeCharts() {
    // Sensor Trends Chart
    new Chart(document.getElementById('sensorTrendsChart'), chartConfigs.sensorTrends);
    
    // Environmental Context Chart
    new Chart(document.getElementById('envContextChart'), chartConfigs.envContext);
    
    // Pollution Heatmap
    new Chart(document.getElementById('pollutionHeatmap'), chartConfigs.pollutionHeatmap);
    
    // AI Predictions Chart
    new Chart(document.getElementById('aiPredictionsChart'), chartConfigs.aiPredictions);
    
    // Forecast Chart
    new Chart(document.getElementById('forecastChart'), chartConfigs.forecast);
}

// Populate data table with sample data
function populateDataTable() {
    const tableBody = document.getElementById('dataTableBody');
    const dates = ['2024-03-01', '2024-03-02', '2024-03-03', '2024-03-04', '2024-03-05'];
    
    dates.forEach(date => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${generateRandomData(1, 30, 100)[0]}</td>
            <td>${generateRandomData(1, 15, 30)[0]}°C</td>
            <td>${generateRandomData(1, 30, 70)[0]}%</td>
        `;
        tableBody.appendChild(row);
    });
}

// Export functionality
document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // In a real implementation, this would trigger a download
        alert('Export functionality would be implemented here');
    });
});

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    populateDataTable();
}); 