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

    // Real-time data updates
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