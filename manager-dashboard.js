// Check if user is logged in and has manager role
document.addEventListener('DOMContentLoaded', function() {
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');

    if (!userRole || userRole !== 'manager') {
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

    function calculateEfficiency(utilization, cost) {
        return Math.max(0, Math.min(100, (utilization / cost) * 100));
    }

    function predictNextValue(historicalData, lookback = 3) {
        if (historicalData.length < lookback) return historicalData[historicalData.length - 1];
        const recent = historicalData.slice(-lookback);
        const trend = recent[recent.length - 1] - recent[0];
        return recent[recent.length - 1] + trend + (Math.random() * 0.2 - 0.1);
    }

    // Initialize data
    let complianceData = {
        compliant: 75,
        warning: 15,
        nonCompliant: 10
    };

    let zonePerformance = {
        'Zone A': 85,
        'Zone B': 78,
        'Zone C': 92,
        'Zone D': 88
    };

    let resourceUtilization = {
        staff: Array(7).fill(0).map(() => Math.random() * 20 + 30),
        equipment: Array(7).fill(0).map(() => Math.random() * 20 + 40)
    };

    let costData = {
        equipment: 3500,
        maintenance: 2800,
        staff: 4200,
        utilities: 1800
    };

    // Initialize charts
    const complianceChart = new Chart(document.getElementById('complianceChart'), {
        type: 'doughnut',
        data: {
            labels: ['Compliant', 'Warning', 'Non-Compliant'],
            datasets: [{
                data: [complianceData.compliant, complianceData.warning, complianceData.nonCompliant],
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
                    text: 'Compliance Status'
                }
            }
        }
    });

    const zonePerformanceChart = new Chart(document.getElementById('zonePerformanceChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(zonePerformance),
            datasets: [{
                label: 'Performance Score',
                data: Object.values(zonePerformance),
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Zone Performance'
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

    const resourceUtilizationChart = new Chart(document.getElementById('resourceUtilizationChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Staff Hours',
                    data: resourceUtilization.staff,
                    borderColor: '#3498db',
                    tension: 0.4
                },
                {
                    label: 'Equipment Hours',
                    data: resourceUtilization.equipment,
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
                    text: 'Resource Utilization'
                }
            }
        }
    });

    const costAnalysisChart = new Chart(document.getElementById('costAnalysisChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(costData),
            datasets: [{
                label: 'Monthly Costs',
                data: Object.values(costData),
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Cost Analysis'
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
                case 'Compliance Status':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalComplianceChart"></canvas>
                        </div>
                        <div class="compliance-stats">
                            <div class="stat">
                                <h3>Overall Compliance</h3>
                                <p>Current Rate: 92%</p>
                                <p>Target: 95%</p>
                                <p>Trend: Improving</p>
                            </div>
                            <div class="stat">
                                <h3>Recent Violations</h3>
                                <p>Last 30 Days: 2</p>
                                <p>Resolved: 2</p>
                                <p>Pending: 0</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Zone Performance':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalZonePerformanceChart"></canvas>
                        </div>
                        <div class="zone-stats">
                            <div class="stat">
                                <h3>Zone A</h3>
                                <p>Performance: 88%</p>
                                <p>Status: Good</p>
                            </div>
                            <div class="stat">
                                <h3>Zone B</h3>
                                <p>Performance: 92%</p>
                                <p>Status: Excellent</p>
                            </div>
                            <div class="stat">
                                <h3>Zone C</h3>
                                <p>Performance: 85%</p>
                                <p>Status: Good</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Resource Utilization':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalResourceUtilizationChart"></canvas>
                        </div>
                        <div class="resource-stats">
                            <div class="stat">
                                <h3>Staff Utilization</h3>
                                <p>Current: 85%</p>
                                <p>Target: 90%</p>
                            </div>
                            <div class="stat">
                                <h3>Equipment Usage</h3>
                                <p>Current: 78%</p>
                                <p>Target: 80%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Cost Analysis':
                    content = `
                        <div class="chart-container">
                            <canvas id="modalCostAnalysisChart"></canvas>
                        </div>
                        <div class="cost-stats">
                            <div class="stat">
                                <h3>Monthly Costs</h3>
                                <p>Total: $45,000</p>
                                <p>Savings: $12,500</p>
                            </div>
                            <div class="stat">
                                <h3>Cost Breakdown</h3>
                                <p>Operations: 60%</p>
                                <p>Maintenance: 25%</p>
                                <p>Utilities: 15%</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Key Performance Indicators':
                    content = `
                        <div class="kpi-details">
                            <div class="kpi-section">
                                <h3>Compliance Rate</h3>
                                <p>Current: 92%</p>
                                <p>Target: 95%</p>
                                <p>Trend: +2% this month</p>
                            </div>
                            <div class="kpi-section">
                                <h3>Resource Efficiency</h3>
                                <p>Current: 85%</p>
                                <p>Target: 90%</p>
                                <p>Trend: +3% this month</p>
                            </div>
                            <div class="kpi-section">
                                <h3>Cost Savings</h3>
                                <p>Current: $12,500</p>
                                <p>Target: $15,000</p>
                                <p>Trend: +$2,500 this month</p>
                            </div>
                            <div class="kpi-section">
                                <h3>Staff Productivity</h3>
                                <p>Current: 88%</p>
                                <p>Target: 90%</p>
                                <p>Trend: +1% this month</p>
                            </div>
                        </div>
                    `;
                    break;

                case 'Recent Reports':
                    content = `
                        <div class="reports-details">
                            <div class="report-section">
                                <h3>Monthly Compliance Report</h3>
                                <p>Date: 2024-03-15</p>
                                <p>Status: Completed</p>
                                <p>Summary: All zones meeting compliance targets</p>
                                <button class="download-button">Download Full Report</button>
                            </div>
                            <div class="report-section">
                                <h3>Resource Utilization Analysis</h3>
                                <p>Date: 2024-03-14</p>
                                <p>Status: Completed</p>
                                <p>Summary: Resource efficiency improved by 3%</p>
                                <button class="download-button">Download Full Report</button>
                            </div>
                            <div class="report-section">
                                <h3>Cost Optimization Report</h3>
                                <p>Date: 2024-03-13</p>
                                <p>Status: Completed</p>
                                <p>Summary: Cost savings target achieved</p>
                                <button class="download-button">Download Full Report</button>
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
                        case 'Compliance Status':
                            new Chart(document.getElementById('modalComplianceChart'), {
                                type: 'doughnut',
                                data: {
                                    labels: ['Compliant', 'Warning', 'Non-Compliant'],
                                    datasets: [{
                                        data: [
                                            complianceData.compliant,
                                            complianceData.warning,
                                            complianceData.nonCompliant
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
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Compliance Status'
                                        }
                                    }
                                }
                            });
                            break;

                        case 'Zone Performance':
                            new Chart(document.getElementById('modalZonePerformanceChart'), {
                                type: 'bar',
                                data: {
                                    labels: zonePerformanceChart.data.labels,
                                    datasets: [{
                                        label: 'Performance Score',
                                        data: [...zonePerformanceChart.data.datasets[0].data],
                                        backgroundColor: '#3498db'
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Zone Performance'
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

                        case 'Resource Utilization':
                            new Chart(document.getElementById('modalResourceUtilizationChart'), {
                                type: 'line',
                                data: {
                                    labels: resourceUtilizationChart.data.labels,
                                    datasets: resourceUtilizationChart.data.datasets.map(dataset => ({
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
                                            text: 'Resource Utilization'
                                        }
                                    }
                                }
                            });
                            break;

                        case 'Cost Analysis':
                            new Chart(document.getElementById('modalCostAnalysisChart'), {
                                type: 'bar',
                                data: {
                                    labels: costAnalysisChart.data.labels,
                                    datasets: [{
                                        label: 'Costs',
                                        data: [...costAnalysisChart.data.datasets[0].data],
                                        backgroundColor: '#3498db'
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Cost Analysis'
                                        }
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true
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
        // Update compliance data with realistic trends
        complianceData.compliant = Math.max(0, Math.min(100, 
            complianceData.compliant + generateTrendingData(0, 0.2, 1)));
        complianceData.warning = Math.max(0, Math.min(100 - complianceData.compliant, 
            complianceData.warning + generateTrendingData(0, 0.1, 0.5)));
        complianceData.nonCompliant = 100 - complianceData.compliant - complianceData.warning;

        // Update zone performance with gradual changes
        Object.keys(zonePerformance).forEach(zone => {
            zonePerformance[zone] = Math.max(0, Math.min(100,
                zonePerformance[zone] + generateTrendingData(0, 0.1, 0.8)));
        });

        // Update resource utilization with weekly patterns
        resourceUtilization.staff = resourceUtilization.staff.map((value, i) =>
            generateTrendingData(value, 0.05, 0.3));
        resourceUtilization.equipment = resourceUtilization.equipment.map((value, i) =>
            generateTrendingData(value, 0.08, 0.4));

        // Update costs with realistic fluctuations
        Object.keys(costData).forEach(category => {
            costData[category] = Math.max(0,
                costData[category] + generateTrendingData(0, 10, 50));
        });

        // Update charts
        complianceChart.data.datasets[0].data = [
            complianceData.compliant,
            complianceData.warning,
            complianceData.nonCompliant
        ];
        complianceChart.update();

        zonePerformanceChart.data.datasets[0].data = Object.values(zonePerformance);
        zonePerformanceChart.update();

        resourceUtilizationChart.data.datasets[0].data = resourceUtilization.staff;
        resourceUtilizationChart.data.datasets[1].data = resourceUtilization.equipment;
        resourceUtilizationChart.update();

        costAnalysisChart.data.datasets[0].data = Object.values(costData);
        costAnalysisChart.update();

        // Update modal charts if they exist
        const modalCharts = {
            'modalComplianceChart': complianceChart,
            'modalZonePerformanceChart': zonePerformanceChart,
            'modalResourceUtilizationChart': resourceUtilizationChart,
            'modalCostAnalysisChart': costAnalysisChart
        };

        Object.entries(modalCharts).forEach(([modalId, sourceChart]) => {
            const modalChart = Chart.getChart(modalId);
            if (modalChart) {
                modalChart.data = sourceChart.data;
                modalChart.update();
            }
        });

        // Update KPIs
        updateKPIs();
    }, 5000); // Update every 5 seconds

    function updateKPIs() {
        const complianceRate = complianceData.compliant;
        const resourceEfficiency = calculateEfficiency(
            resourceUtilization.staff.reduce((a, b) => a + b, 0) / 7,
            costData.staff
        );
        const costSavings = Math.max(0, 15000 - Object.values(costData).reduce((a, b) => a + b, 0));
        const staffProductivity = calculateEfficiency(
            resourceUtilization.staff.reduce((a, b) => a + b, 0) / 7,
            resourceUtilization.equipment.reduce((a, b) => a + b, 0) / 7
        );

        document.querySelector('.kpi-item:nth-child(1) .kpi-value').textContent = `${complianceRate.toFixed(1)}%`;
        document.querySelector('.kpi-item:nth-child(2) .kpi-value').textContent = `${resourceEfficiency.toFixed(1)}%`;
        document.querySelector('.kpi-item:nth-child(3) .kpi-value').textContent = `$${costSavings.toFixed(0)}`;
        document.querySelector('.kpi-item:nth-child(4) .kpi-value').textContent = `${staffProductivity.toFixed(1)}%`;
    }

    // Handle logout
    document.querySelector('a[href="index.html"]').addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
}); 