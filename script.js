 `incidents-list-${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Incident data downloaded as CSV!');
}

// ===== ADMIN REPORTS =====

function generateAdminReport() {
    updateAdminStats();
    alert('✅ Admin report generated!\n\nPlease refer to the "Admin Reports" tab for detailed information.');
}

function printAdminReport() {
    window.print();
}

function updateAdminStats() {
    // Update workers stats
    document.getElementById('totalWorkerCount').textContent = workersData.length;
    document.getElementById('totalIncidentsCount').textContent = incidentsData.length;
    
    // New workers this month
    const thisMonth = new Date().toISOString().split('T')[0].substring(0, 7);
    const newWorkers = workersData.filter(p => p.startDate.startsWith(thisMonth)).length;
    document.getElementById('newWorkersMonth').textContent = newWorkers;
    
    // Total injured
    const totalInjured = incidentsData.reduce((sum, inc) => sum + inc.injured, 0);
    
    // Report stats
    document.getElementById('reportTotalWorkers').textContent = workersData.length;
    document.getElementById('reportTotalIncidents').textContent = incidentsData.length;
    document.getElementById('reportTotalInjured').textContent = totalInjured;
    
    const percentage = workersData.length > 0 ? ((totalInjured / workersData.length) * 100).toFixed(2) : '0.00';
    document.getElementById('reportRate').textContent = percentage + '%';
    
    // Severity rate
    const severeCount = incidentsData.filter(i => i.severity === 'Severe').length;
    let rateText = 'Normal';
    if (severeCount > 2) rateText = 'High ⚠️';
    else if (severeCount > 0) rateText = 'Moderate';
    document.getElementById('severityRate').textContent = rateText;
}

// ============================================
// FORM HANDLERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Worker form handler
    const workerForm = document.getElementById('workerForm');
    if (workerForm) {
        workerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const employeeId = document.getElementById('employeeId').value;
            const name = document.getElementById('workerName').value;
            const position = document.getElementById('position').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('workerEmail').value;
            const startDate = document.getElementById('startDate').value;
            const department = document.getElementById('department').value;
            
            const existingIndex = workersData.findIndex(p => p.id === employeeId);
            
            if (existingIndex >= 0) {
                workersData[existingIndex] = { id: employeeId, name, position, phone, email, startDate, department };
                alert('✅ Worker information updated!');
            } else {
                workersData.push({ id: employeeId, name, position, phone, email, startDate, department });
                alert('✅ New worker added!');
            }
            
            closeWorkerModal();
            renderWorkersTable();
            updateAdminStats();
        });
    }
    
    // Incident form handler
    const incidentForm = document.getElementById('incidentForm');
    if (incidentForm) {
        incidentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const worker = document.getElementById('incidentWorkerName').value;
            const type = document.getElementById('incidentType').value;
            const date = document.getElementById('incidentDate').value;
            const location = document.getElementById('incidentLocation').value;
            const injured = parseInt(document.getElementById('injuredCount').value);
            const severity = document.getElementById('severityLevel').value;
            
            const newId = '#' + String(incidentsData.length + 1).padStart(3, '0');
            
            incidentsData.push({
                id: newId,
                type: type,
                worker: worker,
                date: date,
                location: location,
                injured: injured,
                severity: severity
            });
            
            alert('✅ New incident reported!');
            closeIncidentModal();
            renderIncidentsTable();
            updateAdminStats();
            updateDashboard();
        });
    }
    
    // Training form handler
    const trainingForm = document.getElementById('trainingForm');
    if (trainingForm) {
        trainingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Training registration successful!\n\nYou will receive a confirmation email shortly.');
            closeTrainingModal();
            this.reset();
        });
    }
    
    // Dynamic form handler
    const dynamicForm = document.getElementById('dynamicForm');
    if (dynamicForm) {
        dynamicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Form saved successfully!');
            closeFormModal();
            this.reset();
        });
    }
    
    // Feedback form handler
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Thank you! Your feedback has been received.');
            this.reset();
        });
    }
    
    // Search workers
    const searchWorkers = document.getElementById('searchWorkers');
    if (searchWorkers) {
        searchWorkers.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('#workersTableBody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Search incidents admin
    const searchIncidentsAdmin = document.getElementById('searchIncidentsAdmin');
    if (searchIncidentsAdmin) {
        searchIncidentsAdmin.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('#incidentsTableBody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Filter incident type
    const filterIncidentType = document.getElementById('filterIncidentType');
    if (filterIncidentType) {
        filterIncidentType.addEventListener('change', function() {
            const filterType = this.value;
            document.querySelectorAll('#incidentsTableBody tr').forEach(row => {
                const typeCell = row.cells[1].textContent;
                if (!filterType || typeCell.includes(filterType)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Search incidents
    const searchIncidents = document.getElementById('searchIncidents');
    if (searchIncidents) {
        searchIncidents.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.incident-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    // Filter status
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
        filterStatus.addEventListener('change', function() {
            const status = this.value;
            document.querySelectorAll('.incident-card').forEach(card => {
                const badge = card.querySelector('.status-badge');
                if (!status || badge.textContent === status) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// ============================================
// MODAL FUNCTIONS
// ============================================

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Responsive menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        if (navMenu) {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}
