// ============================================
// DATA & INITIALIZATION
// ============================================

let workersData = [
    { id: 'EMP001', name: 'Ahmad Bin Sulaiman', position: 'Mechanic', phone: '0123456789', email: 'ahmad@company.com', startDate: '2025-01-15', department: 'Workshop A' },
    { id: 'EMP002', name: 'Siti Aminah Binti Mohammad', position: 'Machine Operator', phone: '0198765432', email: 'siti@company.com', startDate: '2024-12-01', department: 'Workshop B' },
    { id: 'EMP003', name: 'Hassan Bin Ali', position: 'Electrical Technician', phone: '0167890123', email: 'hassan@company.com', startDate: '2024-11-20', department: 'Warehouse' },
];

let incidentsData = [
    { id: '#001', type: 'Fall from Ladder', worker: 'Ahmad Sulaiman', date: '2026-02-10', location: 'Workshop A', injured: 1, severity: 'Moderate' },
    { id: '#002', type: 'Machinery Accident', worker: 'Siti Aminah', date: '2026-02-08', location: 'Workshop B', injured: 1, severity: 'Severe' },
];

// ============================================
// NAVIGATION & INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    updateDashboard();
    setupFormHandlers();
    setupCharts();
    updateAdminStats();
});

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(targetId);
            }
        });
    });
}

function updateActiveNav(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`a[href="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ============================================
// DASHBOARD FUNCTIONS
// ============================================

function updateDashboard() {
    document.getElementById('totalIncidents').textContent = incidentsData.length;
    
    let totalInjured = incidentsData.reduce((sum, item) => sum + item.injured, 0);
    document.getElementById('totalWorkers').textContent = totalInjured;
    
    let thisMonth = incidentsData.filter(k => k.date.includes('2026-02')).length;
    document.getElementById('monthlyIncidents').textContent = thisMonth;
    
    updateSafetyStatus();
}

function updateSafetyStatus() {
    const statusElement = document.getElementById('safetyStatus');
    if (incidentsData.length === 0) {
        statusElement.textContent = 'EXCELLENT';
        statusElement.style.color = '#27ae60';
    } else if (incidentsData.length < 3) {
        statusElement.textContent = 'GOOD';
        statusElement.style.color = '#f39c12';
    } else {
        statusElement.textContent = 'NEEDS ATTENTION';
        statusElement.style.color = '#e74c3c';
    }
}

function showIncidentDetails() {
    let message = `📊 Total Incidents: ${incidentsData.length}\n\n📋 List:\n`;
    incidentsData.forEach((k, index) => {
        message += `${index + 1}. ${k.type} (${k.date})\n`;
    });
    alert(message);
}

function showWorkerDetails() {
    let totalInjured = incidentsData.reduce((sum, item) => sum + item.injured, 0);
    alert(`👥 Total Workers Injured:\n\n${totalInjured} people`);
}

function filterByMonth() {
    const month = prompt('Enter month (format: 2026-02):');
    if (month) {
        const filtered = incidentsData.filter(k => k.date.startsWith(month));
        let message = `📅 Incidents in ${month}:\n\nTotal: ${filtered.length} cases\n\n`;
        if (filtered.length > 0) {
            filtered.forEach((k, index) => {
                message += `${index + 1}. ${k.type}\n`;
            });
        } else {
            message += 'No incidents recorded.';
        }
        alert(message);
    }
}

function showStatusDetail() {
    let status = '';
    if (incidentsData.length === 0) {
        status = '✅ Status: EXCELLENT\n\nNo incidents recorded.\nMaintain excellent safety practices!';
    } else if (incidentsData.length < 3) {
        status = '⚠️ Status: GOOD\n\nSome incidents recorded.\nSafety awareness needs improvement.';
    } else {
        status = '🔴 Status: NEEDS ATTENTION\n\nMany incidents recorded.\nImmediate safety audit required!';
    }
    alert(status);
}

// ============================================
// STATISTICS FUNCTIONS
// ============================================

function setupCharts() {
    drawChart();
    window.addEventListener('resize', drawChart);
}

function drawChart() {
    const canvas = document.getElementById('statisticsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const data = [5, 4, 6, 3, 2];
    const labels = ['Falls', 'Machinery', 'Cuts', 'Burns', 'Other'];
    const colors = ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6'];
    
    const maxValue = Math.max(...data);
    const barWidth = canvas.width / data.length;
    const padding = 10;
    
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    data.forEach((value, index) => {
        const x = index * barWidth + padding;
        const barHeight = (value / maxValue) * (canvas.height - 60);
        const y = canvas.height - 40 - barHeight;
        
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth - 2 * padding, barHeight);
        
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + (barWidth - 2 * padding) / 2, y - 10);
        
        ctx.font = '12px Arial';
        ctx.fillText(labels[index], x + (barWidth - 2 * padding) / 2, canvas.height - 10);
    });
}

function downloadStatistics() {
    const csvContent = "Incident Type,Count,Percentage\nFalls from Height,5,25%\nMachinery Accidents,4,20%\nCuts/Sharp Injuries,6,30%\nBurns,3,15%\nOther Injuries,2,10%";
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', 'incident-statistics.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Statistics downloaded successfully!');
}

function printStatistics() {
    window.print();
}

// ============================================
// INCIDENT REPORT FUNCTIONS
// ============================================

function addIncidentReport() {
    openIncidentModal();
}

function viewIncident(id) {
    const incident = incidentsData.find(l => l.id === id);
    if (incident) {
        alert(`📋 REPORT #${String(id).padStart(3, '0')}\n\nType: ${incident.type}\nDate: ${incident.date}\nLocation: ${incident.location}\n\nWorker: ${incident.worker}`);
    }
}

function editIncident(id) {
    const incident = incidentsData.find(l => l.id === id);
    if (incident) {
        const newType = prompt('Incident Type:', incident.type);
        if (newType) {
            incident.type = newType;
            alert('✅ Incident report updated!');
            location.reload();
        }
    }
}

function deleteIncident(id) {
    if (confirm(`Are you sure you want to delete this incident report?\n\nReport #${id}`)) {
        incidentsData = incidentsData.filter(l => l.id !== id);
        alert('✅ Incident report deleted!');
        updateDashboard();
        location.reload();
    }
}

// ============================================
// FORMS FUNCTIONS
// ============================================

function fillFormOnline(type) {
    const titles = {
        'incident': 'Incident Report Form',
        'health': 'Health Check Form',
        'equipment': 'Equipment Inspection Form',
        'hazard': 'Hazard Report Form',
        'training': 'Safety Training Form',
        'investigation': 'Accident Investigation Form'
    };
    
    document.getElementById('formModalTitle').textContent = titles[type] || 'Fill Form';
    openFormModal();
}

function downloadForm(filename) {
    alert(`📥 Form "${filename}" is being downloaded...`);
}

function openFormModal() {
    document.getElementById('formModal').classList.add('active');
}

function closeFormModal() {
    document.getElementById('formModal').classList.remove('active');
}

// ============================================
// TRAINING FUNCTIONS
// ============================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

function playVideo(videoId) {
    alert(`🎬 Playing video "${videoId}"...\n\nIn a real system, this would play a YouTube or embedded video.`);
}

function printCertificate(type) {
    alert(`📄 Printing certificate for "${type}"...`);
    window.print();
}

function registerTraining(sessionId) {
    openTrainingModal();
}

function viewCertificate(certId) {
    const certs = [
        { id: 'c001', name: 'Ahmad Sulaiman', training: 'Introduction to Safety', date: '2026-02-01' },
        { id: 'c002', name: 'Siti Aminah', training: 'Personal Protective Equipment', date: '2026-02-03' },
        { id: 'c003', name: 'Hassan Ali', training: 'Emergency Procedures', date: '2026-02-05' }
    ];
    
    const cert = certs.find(c => c.id === certId);
    if (cert) {
        alert(`📄 CERTIFICATE\n\nName: ${cert.name}\nTraining: ${cert.training}\nDate: ${cert.date}\n\n✅ Completed`);
    }
}

function printCert(certId) {
    window.print();
}

function openTrainingModal() {
    document.getElementById('trainingModal').classList.add('active');
}

function closeTrainingModal() {
    document.getElementById('trainingModal').classList.remove('active');
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.admin-tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    if (tabName === 'workers') {
        renderWorkersTable();
    } else if (tabName === 'incidents-mgmt') {
        renderIncidentsTable();
    }
}

// ===== MANAGE WORKERS =====

function openAddWorkerModal() {
    document.getElementById('workerModalTitle').textContent = 'Add New Worker';
    document.getElementById('workerForm').reset();
    document.getElementById('workerModal').classList.add('active');
}

function closeWorkerModal() {
    document.getElementById('workerModal').classList.remove('active');
}

function editWorker(id) {
    const worker = workersData.find(p => p.id === id);
    if (worker) {
        document.getElementById('workerModalTitle').textContent = 'Edit Worker Information';
        document.getElementById('employeeId').value = worker.id;
        document.getElementById('workerName').value = worker.name;
        document.getElementById('position').value = worker.position;
        document.getElementById('phone').value = worker.phone;
        document.getElementById('workerEmail').value = worker.email;
        document.getElementById('startDate').value = worker.startDate;
        document.getElementById('department').value = worker.department;
        document.getElementById('workerModal').classList.add('active');
    }
}

function deleteWorker(id) {
    if (confirm(`Are you sure you want to delete this worker?\n\nEmployee ID: ${id}`)) {
        workersData = workersData.filter(p => p.id !== id);
        alert('✅ Worker data deleted!');
        renderWorkersTable();
        updateAdminStats();
    }
}

function renderWorkersTable() {
    const tbody = document.getElementById('workersTableBody');
    tbody.innerHTML = '';
    
    workersData.forEach(worker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.id}</td>
            <td>${worker.name}</td>
            <td>${worker.position}</td>
            <td>${worker.phone}</td>
            <td>${worker.email}</td>
            <td>${worker.startDate}</td>
            <td>
                <button class="btn btn-small btn-info" onclick="editWorker('${worker.id}')">✏️ Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteWorker('${worker.id}')">🗑️ Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function exportWorkersCSV() {
    let csvContent = 'Employee ID,Full Name,Position,Phone,Email,Start Date,Department\n';
    workersData.forEach(worker => {
        csvContent += `${worker.id},"${worker.name}",${worker.position},${worker.phone},${worker.email},${worker.startDate},${worker.department}\n`;
    });
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `workers-list-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Worker data downloaded as CSV!');
}

// ===== MANAGE INCIDENTS =====

function openAddIncidentModal() {
    document.getElementById('incidentForm').reset();
    document.getElementById('incidentModal').classList.add('active');
}

function closeIncidentModal() {
    document.getElementById('incidentModal').classList.remove('active');
}

function editIncidentAdmin(id) {
    const incident = incidentsData.find(i => i.id === id);
    if (incident) {
        document.getElementById('incidentWorkerName').value = incident.worker;
        document.getElementById('incidentType').value = incident.type.split(' ')[0];
        document.getElementById('incidentDate').value = incident.date;
        document.getElementById('incidentLocation').value = incident.location;
        document.getElementById('injuredCount').value = incident.injured;
        document.getElementById('severityLevel').value = incident.severity;
        document.getElementById('incidentModal').classList.add('active');
    }
}

function deleteIncidentAdmin(id) {
    if (confirm(`Are you sure you want to delete this incident report?\n\nReport No: ${id}`)) {
        incidentsData = incidentsData.filter(i => i.id !== id);
        alert('✅ Incident report deleted!');
        renderIncidentsTable();
        updateAdminStats();
    }
}

function renderIncidentsTable() {
    const tbody = document.getElementById('incidentsTableBody');
    tbody.innerHTML = '';
    
    incidentsData.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${incident.id}</td>
            <td>${incident.type}</td>
            <td>${incident.worker}</td>
            <td>${incident.date}</td>
            <td>${incident.location}</td>
            <td>${incident.injured}</td>
            <td>
                <button class="btn btn-small btn-info" onclick="editIncidentAdmin('${incident.id}')">✏️ Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteIncidentAdmin('${incident.id}')">🗑️ Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function exportIncidentsCSV() {
    let csvContent = 'Report No.,Incident Type,Worker,Date,Location,Injured Count,Severity\n';
    incidentsData.forEach(incident => {
        csvContent += `${incident.id},"${incident.type}",${incident.worker},${incident.date},${incident.location},${incident.injured},${incident.severity}\n`;
    });
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download',
