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

    // Initialize charts
    initializeCharts();

    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
            this.classList.toggle('collapsed');
            this.classList.toggle('expanded');
        });
    }

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

    // Add click handlers for tooltips
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const tooltip = this.getAttribute('data-tooltip');
            if (!tooltip) return;

            showModal(
                this.closest('.card')?.querySelector('h2')?.textContent || 'Information',
                `<div class="tooltip-content"><p>${tooltip}</p></div>`
            );
        });
    });

    // Add click handlers for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a tooltip or button
            if (e.target.closest('.tooltip-icon') || e.target.closest('.action-button')) {
                return;
            }

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

                case 'Sensor Response Trends':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalSensorTrendsChart"></canvas>
                        </div>
                        <div class="sensor-stats">
                            <div class="stat">
                                <h3>Sensor Performance</h3>
                                <p>Accuracy: 98.5%</p>
                                <p>Response Time: 2.3s</p>
                                <p>Calibration Status: Optimal</p>
                            </div>
                            <div class="stat">
                                <h3>Data Quality</h3>
                                <p>Completeness: 99.8%</p>
                                <p>Consistency: 99.5%</p>
                                <p>Timeliness: 100%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Environmental Context':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalEnvContextChart"></canvas>
                        </div>
                        <div class="context-stats">
                            <div class="stat">
                                <h3>Weather Impact</h3>
                                <p>Temperature: 22°C</p>
                                <p>Humidity: 45%</p>
                                <p>Wind Speed: 5 km/h</p>
                            </div>
                            <div class="stat">
                                <h3>Environmental Factors</h3>
                                <p>Air Pressure: 1013 hPa</p>
                                <p>UV Index: 3</p>
                                <p>Precipitation: 0%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'AI Predictions':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalAiPredictionsChart"></canvas>
                        </div>
                        <div class="prediction-stats">
                            <div class="stat">
                                <h3>Model Performance</h3>
                                <p>Accuracy: 94.2%</p>
                                <p>Precision: 92.8%</p>
                                <p>Recall: 93.5%</p>
                            </div>
                            <div class="stat">
                                <h3>Prediction Confidence</h3>
                                <p>High: 85%</p>
                                <p>Medium: 12%</p>
                                <p>Low: 3%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Quick Actions':
                    content = `
                        <div class="actions-grid">
                            <button class="action-button">Export Data</button>
                            <button class="action-button">Contact Manager</button>
                        </div>
                    `;
                    break;

                case 'Generate Report':
                    content = `
                        <div class="report-management-modal">
                            <div class="report-config-section">
                                <h3>Report Configuration</h3>
                                <div class="report-form">
                                    <div class="form-group">
                                        <label>Report Type</label>
                                        <select class="report-select">
                                            <option value="air-quality">Air Quality Analysis</option>
                                            <option value="environmental">Environmental Impact</option>
                                            <option value="trends">Trend Analysis</option>
                                            <option value="compliance">Compliance Report</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Time Range</label>
                                        <div class="date-range">
                                            <input type="date" class="date-input">
                                            <span>to</span>
                                            <input type="date" class="date-input">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Zones</label>
                                        <div class="zone-selector">
                                            <label class="zone-checkbox">
                                                <input type="checkbox" checked> Zone A
                                            </label>
                                            <label class="zone-checkbox">
                                                <input type="checkbox" checked> Zone B
                                            </label>
                                            <label class="zone-checkbox">
                                                <input type="checkbox" checked> Zone C
                                            </label>
                                            <label class="zone-checkbox">
                                                <input type="checkbox"> Zone D
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Include Sections</label>
                                        <div class="section-selector">
                                            <label class="section-checkbox">
                                                <input type="checkbox" checked> Summary
                                            </label>
                                            <label class="section-checkbox">
                                                <input type="checkbox" checked> Charts
                                            </label>
                                            <label class="section-checkbox">
                                                <input type="checkbox" checked> Data Tables
                                            </label>
                                            <label class="section-checkbox">
                                                <input type="checkbox" checked> Recommendations
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="report-preview-section">
                                <h3>Report Preview</h3>
                                <div class="preview-container">
                                    <div class="preview-header">
                                        <h4>Air Quality Analysis Report</h4>
                                        <span class="preview-date">Generated: Today, 10:15 AM</span>
                                    </div>
                                    <div class="preview-content">
                                        <div class="preview-chart">
                                            <canvas id="reportPreviewChart"></canvas>
                                        </div>
                                        <div class="preview-summary">
                                            <p>This report provides a comprehensive analysis of air quality metrics across selected zones...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="report-actions-section">
                                <button class="action-button primary">
                                    <i class="fas fa-file-alt"></i>
                                    Generate Report
                                </button>
                                <button class="action-button">
                                    <i class="fas fa-clock"></i>
                                    Schedule Report
                                </button>
                                <button class="action-button">
                                    <i class="fas fa-download"></i>
                                    Export Template
                                </button>
                            </div>
                        </div>
                    `;
                    break;

                case 'Pollution Heatmap':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalPollutionHeatmap"></canvas>
                        </div>
                        <div class="heatmap-stats">
                            <div class="stat">
                                <h3>Pollution Levels</h3>
                                <p>High: 3 zones</p>
                                <p>Medium: 5 zones</p>
                                <p>Low: 12 zones</p>
                            </div>
                            <div class="stat">
                                <h3>Trend Analysis</h3>
                                <p>Improving: 8 zones</p>
                                <p>Stable: 10 zones</p>
                                <p>Worsening: 2 zones</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Recent Alerts':
                    content = `
                        <div class="alerts-details">
                            <div class="alert-section">
                                <h3>High Priority</h3>
                                <div class="alert-item">
                                    <span class="alert-time">10:15 AM</span>
                                    <span class="alert-message">CO levels exceeded threshold in Zone A</span>
                                    <span class="alert-priority high">High</span>
                                </div>
                            </div>
                            <div class="alert-section">
                                <h3>Medium Priority</h3>
                                <div class="alert-item">
                                    <span class="alert-time">09:45 AM</span>
                                    <span class="alert-message">Sensor calibration needed in Zone B</span>
                                    <span class="alert-priority medium">Medium</span>
                                </div>
                            </div>
                            <div class="alert-section">
                                <h3>Low Priority</h3>
                                <div class="alert-item">
                                    <span class="alert-time">09:30 AM</span>
                                    <span class="alert-message">Routine maintenance scheduled</span>
                                    <span class="alert-priority low">Low</span>
                                </div>
                            </div>
                        </div>
                    `;
                    break;

                case 'Alerts Management':
                    content = `
                        <div class="alerts-management-modal">
                            <div class="alert-config-section">
                                <h3>Alert Thresholds</h3>
                                <div class="threshold-grid">
                                    <div class="threshold-group">
                                        <h4>Air Quality</h4>
                                        <div class="threshold-item">
                                            <span class="threshold-label">CO Level</span>
                                            <input type="number" value="50" class="threshold-input" placeholder="ppm">
                                        </div>
                                        <div class="threshold-item">
                                            <span class="threshold-label">PM2.5</span>
                                            <input type="number" value="12" class="threshold-input" placeholder="μg/m³">
                                        </div>
                                        <div class="threshold-item">
                                            <span class="threshold-label">NO₂</span>
                                            <input type="number" value="40" class="threshold-input" placeholder="ppb">
                                        </div>
                                    </div>
                                    <div class="threshold-group">
                                        <h4>Environmental</h4>
                                        <div class="threshold-item">
                                            <span class="threshold-label">Temperature</span>
                                            <input type="number" value="30" class="threshold-input" placeholder="°C">
                                        </div>
                                        <div class="threshold-item">
                                            <span class="threshold-label">Humidity</span>
                                            <input type="number" value="80" class="threshold-input" placeholder="%">
                                        </div>
                                        <div class="threshold-item">
                                            <span class="threshold-label">Pressure</span>
                                            <input type="number" value="1013" class="threshold-input" placeholder="hPa">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert-notification-section">
                                <h3>Notification Settings</h3>
                                <div class="notification-grid">
                                    <div class="notification-group">
                                        <h4>Channels</h4>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-email-notify" checked>
                                            <label for="modal-email-notify">Email Notifications</label>
                                        </div>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-sms-notify">
                                            <label for="modal-sms-notify">SMS Notifications</label>
                                        </div>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-dashboard-notify" checked>
                                            <label for="modal-dashboard-notify">Dashboard Alerts</label>
                                        </div>
                                    </div>
                                    <div class="notification-group">
                                        <h4>Alert Levels</h4>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-high-alerts" checked>
                                            <label for="modal-high-alerts">High Priority</label>
                                        </div>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-medium-alerts" checked>
                                            <label for="modal-medium-alerts">Medium Priority</label>
                                        </div>
                                        <div class="notification-item">
                                            <input type="checkbox" id="modal-low-alerts">
                                            <label for="modal-low-alerts">Low Priority</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert-schedule-section">
                                <h3>Alert Schedule</h3>
                                <div class="schedule-grid">
                                    <div class="schedule-item">
                                        <span class="schedule-label">Active Hours</span>
                                        <div class="time-range">
                                            <input type="time" value="08:00" class="time-input">
                                            <span>to</span>
                                            <input type="time" value="18:00" class="time-input">
                                        </div>
                                    </div>
                                    <div class="schedule-item">
                                        <span class="schedule-label">Days Active</span>
                                        <div class="day-selector">
                                            <label class="day-checkbox">
                                                <input type="checkbox" checked> Mon
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox" checked> Tue
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox" checked> Wed
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox" checked> Thu
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox" checked> Fri
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox"> Sat
                                            </label>
                                            <label class="day-checkbox">
                                                <input type="checkbox"> Sun
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="alert-actions-section">
                                <button class="action-button primary">
                                    <i class="fas fa-save"></i>
                                    Save Configuration
                                </button>
                                <button class="action-button">
                                    <i class="fas fa-bell"></i>
                                    Test Alert
                                </button>
                                <button class="action-button">
                                    <i class="fas fa-history"></i>
                                    View Alert History
                                </button>
                            </div>
                        </div>
                    `;
                    break;
            }

            showModal(title, content);

            // Initialize charts in modal if needed
            if (content.includes('chart-container')) {
                setTimeout(() => {
                    initializeModalCharts(title);
                }, 100);
            }
        });
    });

    // Handle logout
    document.querySelector('.sidebar-footer .logout-link').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Handle quick action buttons
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            const action = this.textContent;
            console.log(`Action clicked: ${action}`);
            // Add specific functionality for each action here
        });
    });
});

// Chart Initialization
function initializeCharts() {
    // AQI Trends Chart
    const aqiTrendsCtx = document.getElementById('aqiTrendsChart');
    if (aqiTrendsCtx) {
        new Chart(aqiTrendsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'AQI',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#3498db',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Pollutant Analysis Chart
    const pollutantAnalysisCtx = document.getElementById('pollutantAnalysisChart');
    if (pollutantAnalysisCtx) {
        new Chart(pollutantAnalysisCtx, {
            type: 'bar',
            data: {
                labels: ['PM2.5', 'PM10', 'NO2', 'SO2', 'O3', 'CO'],
                datasets: [{
                    label: 'Concentration',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: '#2ecc71'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Environmental Conditions Chart
    const environmentalConditionsCtx = document.getElementById('environmentalConditionsChart');
    if (environmentalConditionsCtx) {
        new Chart(environmentalConditionsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Temperature',
                    data: [20, 22, 25, 23, 21, 24],
                    borderColor: '#e74c3c',
                    tension: 0.4
                }, {
                    label: 'Humidity',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#3498db',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Time Analysis Chart
    const timeAnalysisCtx = document.getElementById('timeAnalysisChart');
    if (timeAnalysisCtx) {
        new Chart(timeAnalysisCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'AQI',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#9b59b6',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Sensor Trends Chart
    const sensorTrendsCtx = document.getElementById('sensorTrendsChart');
    if (sensorTrendsCtx) {
        new Chart(sensorTrendsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sensor 1',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#3498db',
                    tension: 0.4
                }, {
                    label: 'Sensor 2',
                    data: [28, 48, 40, 19, 86, 27],
                    borderColor: '#2ecc71',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Environmental Context Chart
    const envContextCtx = document.getElementById('envContextChart');
    if (envContextCtx) {
        new Chart(envContextCtx, {
            type: 'radar',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed', 'Pressure', 'Rainfall', 'UV Index'],
                datasets: [{
                    label: 'Current',
                    data: [65, 59, 90, 81, 56, 55],
                    fill: true,
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3498db'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // AI Predictions Chart
    const aiPredictionsCtx = document.getElementById('aiPredictionsChart');
    if (aiPredictionsCtx) {
        new Chart(aiPredictionsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Predicted',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: '#e74c3c',
                    tension: 0.4
                }, {
                    label: 'Actual',
                    data: [28, 48, 40, 19, 86, 27],
                    borderColor: '#2ecc71',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Pollution Heatmap
    const pollutionHeatmapCtx = document.getElementById('pollutionHeatmap');
    if (pollutionHeatmapCtx) {
        new Chart(pollutionHeatmapCtx, {
            type: 'bar',
            data: {
                labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
                datasets: [{
                    label: 'Pollution Level',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        '#2ecc71',
                        '#f1c40f',
                        '#e67e22',
                        '#e74c3c',
                        '#c0392b'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Initialize modal charts
function initializeModalCharts(title) {
    switch (title) {
        case 'Air Quality Analysis':
            // Initialize AQI Trends Chart
            new Chart(document.getElementById('modalAqiTrendsChart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'AQI',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#3498db',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Initialize Pollutant Analysis Chart
            new Chart(document.getElementById('modalPollutantAnalysisChart'), {
                type: 'bar',
                data: {
                    labels: ['PM2.5', 'PM10', 'NO2', 'SO2', 'O3', 'CO'],
                    datasets: [{
                        label: 'Concentration',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: '#2ecc71'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Initialize Environmental Conditions Chart
            new Chart(document.getElementById('modalEnvironmentalConditionsChart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Temperature',
                        data: [20, 22, 25, 23, 21, 24],
                        borderColor: '#e74c3c',
                        tension: 0.4
                    }, {
                        label: 'Humidity',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#3498db',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            // Initialize Time Analysis Chart
            new Chart(document.getElementById('modalTimeAnalysisChart'), {
                type: 'line',
                data: {
                    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                    datasets: [{
                        label: 'AQI',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#9b59b6',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            break;

        case 'Sensor Response Trends':
            new Chart(document.getElementById('modalSensorTrendsChart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Sensor 1',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#3498db',
                        tension: 0.4
                    }, {
                        label: 'Sensor 2',
                        data: [28, 48, 40, 19, 86, 27],
                        borderColor: '#2ecc71',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            break;

        case 'Environmental Context':
            new Chart(document.getElementById('modalEnvContextChart'), {
                type: 'radar',
                data: {
                    labels: ['Temperature', 'Humidity', 'Wind Speed', 'Pressure', 'Rainfall', 'UV Index'],
                    datasets: [{
                        label: 'Current',
                        data: [65, 59, 90, 81, 56, 55],
                        fill: true,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: '#3498db',
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#3498db'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            break;

        case 'AI Predictions':
            new Chart(document.getElementById('modalAiPredictionsChart'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Predicted',
                        data: [65, 59, 80, 81, 56, 55],
                        borderColor: '#e74c3c',
                        tension: 0.4
                    }, {
                        label: 'Actual',
                        data: [28, 48, 40, 19, 86, 27],
                        borderColor: '#2ecc71',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            break;

        case 'Pollution Heatmap':
            new Chart(document.getElementById('modalPollutionHeatmap'), {
                type: 'bar',
                data: {
                    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
                    datasets: [{
                        label: 'Pollution Level',
                        data: [12, 19, 3, 5, 2],
                        backgroundColor: [
                            '#2ecc71',
                            '#f1c40f',
                            '#e67e22',
                            '#e74c3c',
                            '#c0392b'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            break;
    }
} 