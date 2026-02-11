// ============================================
// DATA & INITIALIZATION
// ============================================

let kemalangan = [
    { id: 1, nama: 'Jatuh dari Tangga', orang: 1, tarikh: '2026-02-10', lokasi: 'Bengkel A', keterangan: 'Pekerja terjatuh dari tangga setinggi 3 meter' },
    { id: 2, nama: 'Kemalangan Mesin', orang: 1, tarikh: '2026-02-08', lokasi: 'Bengkel B', keterangan: 'Tangan tertangkap dalam mesin penggiling' },
    { id: 3, nama: 'Kebakaran Kecil', orang: 1, tarikh: '2026-01-25', lokasi: 'Gudang Bahan Kimia', keterangan: 'Kebakaran kecil akibat tumpahan bahan kimia' },
];

let taklimatRecords = [
    { id: 's001', nama: 'Ahmad Sulaiman', sesi: 'Pengenalan Keselamatan Umum', tarikh: '2026-02-01' },
    { id: 's002', nama: 'Siti Aminah', sesi: 'Penggunaan APD', tarikh: '2026-02-03' },
    { id: 's003', nama: 'Hassan Ali', sesi: 'Prosedur Tindakan Darurat', tarikh: '2026-02-05' },
];

// ============================================
// NAVIGATION & PAGE INIT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    updateDashboard();
    setupFormHandlers();
    setupCharts();
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
    // Jumlah kemalangan
    document.getElementById('totalKemalangan').textContent = kemalangan.length;
    
    // Jumlah orang terlibat
    let totalOrang = kemalangan.reduce((sum, item) => sum + item.orang, 0);
    document.getElementById('totalOrang').textContent = totalOrang;
    
    // Kemalangan bulan ini (February)
    let kemalanganganBulan = kemalangan.filter(k => k.tarikh.includes('2026-02')).length;
    document.getElementById('kemalanganganBulan').textContent = kemalanganganBulan;
    
    // Status keselamatan
    updateStatus();
}

function updateStatus() {
    const statusElement = document.getElementById('statusKeselamatan');
    if (kemalangan.length === 0) {
        statusElement.textContent = 'SANGAT BAIK';
        statusElement.style.color = '#27ae60';
    } else if (kemalangan.length < 3) {
        statusElement.textContent = 'BAIK';
        statusElement.style.color = '#f39c12';
    } else {
        statusElement.textContent = 'MEMERLUKAN PERHATIAN';
        statusElement.style.color = '#e74c3c';
    }
}

function showDetailKemalangan() {
    let message = `📊 Jumlah Kemalangan Total: ${kemalangan.length}\n\n📋 Senarai:\n`;
    kemalangan.forEach((k, index) => {
        message += `${index + 1}. ${k.nama} (${k.tarikh})\n`;
    });
    alert(message);
}

function showDetailOrang() {
    let totalOrang = kemalangan.reduce((sum, item) => sum + item.orang, 0);
    alert(`👥 Jumlah Orang yang Terlibat:\n\n${totalOrang} orang`);
}

function filterByMonth() {
    const bulan = prompt('Masukkan bulan (format: 2026-02):');
    if (bulan) {
        const filtered = kemalangan.filter(k => k.tarikh.startsWith(bulan));
        let message = `📅 Kemalangan bulan ${bulan}:\n\nJumlah: ${filtered.length} kejadian\n\n`;
        if (filtered.length > 0) {
            filtered.forEach((k, index) => {
                message += `${index + 1}. ${k.nama}\n`;
            });
        } else {
            message += 'Tiada kemalangan.';
        }
        alert(message);
    }
}

function showStatusDetail() {
    let status = '';
    if (kemalangan.length === 0) {
        status = '✅ Status: SANGAT BAIK\n\nTidak ada kemalangan tercatat.\nTeruskan usaha keselamatan dengan baik!';
    } else if (kemalangan.length < 3) {
        status = '⚠️ Status: BAIK\n\nAda beberapa kemalangan.\nPerlukan peningkatan kesedaran keselamatan.';
    } else {
        status = '🔴 Status: MEMERLUKAN PERHATIAN\n\nBanyak kemalangan tercatat.\nAudit keselamatan diperlukan segera!';
    }
    alert(status);
}

// ============================================
// STATISTIK FUNCTIONS
// ============================================

function setupCharts() {
    drawChart();
    window.addEventListener('resize', drawChart);
}

function drawChart() {
    const canvas = document.getElementById('statistikChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    // Data
    const data = [5, 4, 6, 3, 2];
    const labels = ['Jatuh', 'Mesin', 'Potong', 'Bakar', 'Lain'];
    const colors = ['#2ecc71', '#3498db', '#f39c12', '#e74c3c', '#9b59b6'];
    
    const maxValue = Math.max(...data);
    const barWidth = canvas.width / data.length;
    const padding = 10;
    
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    data.forEach((value, index) => {
        const x = index * barWidth + padding;
        const barHeight = (value / maxValue) * (canvas.height - 60);
        const y = canvas.height - 40 - barHeight;
        
        // Bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth - 2 * padding, barHeight);
        
        // Value text
        ctx.fillStyle = '#2c3e50';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + (barWidth - 2 * padding) / 2, y - 10);
        
        // Label
        ctx.font = '12px Arial';
        ctx.fillText(labels[index], x + (barWidth - 2 * padding) / 2, canvas.height - 10);
    });
}

function downloadStatistik() {
    const csvContent = "Jenis Kemalangan,Bilangan,Peratus\nJatuh dari Ketinggian,5,25%\nKemalangan Mesin,4,20%\nTerpotong/Luka Tajam,6,30%\nTerbakar,3,15%\nCedera Lain,2,10%";
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', 'statistik-kemalangan.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Statistik telah dimuat turun!');
}

function cetakStatistik() {
    window.print();
}

// ============================================
// LAPORAN FUNCTIONS
// ============================================

function tambahLaporan() {
    openModal('formModal');
}

function lihatLaporan(id) {
    const laporan = kemalangan.find(l => l.id === id);
    if (laporan) {
        alert(`📋 LAPORAN #${String(id).padStart(3, '0')}\n\nNama: ${laporan.nama}\nTarikh: ${laporan.tarikh}\nLokasi: ${laporan.lokasi}\n\n${laporan.keterangan}`);
    }
}

function editLaporan(id) {
    const laporan = kemalangan.find(l => l.id === id);
    if (laporan) {
        const newNama = prompt('Nama Kemalangan:', laporan.nama);
        if (newNama) {
            laporan.nama = newNama;
            alert('✅ Laporan telah dikemaskini!');
            location.reload();
        }
    }
}

function deleteLaporan(id) {
    if (confirm('Anda pasti mahu padam laporan ini?')) {
        kemalangan = kemalangan.filter(l => l.id !== id);
        alert('✅ Laporan telah dipadamkan!');
        updateDashboard();
        location.reload();
    }
}

// ============================================
// BORANG FUNCTIONS
// ============================================

function isiBorgForm(type) {
    const titles = {
        'kemalangan': 'Borang Laporan Kemalangan',
        'kesihatan': 'Borang Pemeriksaan Kesihatan',
        'peralatan': 'Borang Inspeksi Peralatan',
        'bahaya': 'Borang Laporan Bahaya',
        'latihan': 'Borang Latihan Keselamatan',
        'penyelidikan': 'Borang Penyelidikan Kemalangan'
    };
    
    document.getElementById('modalTitle').textContent = titles[type] || 'Isi Borang';
    openModal('formModal');
}

function downloadBorang(filename) {
    const element = document.createElement('a');
    element.setAttribute('href', '#');
    element.setAttribute('download', filename);
    alert(`📥 Borang "${filename}" sedang dimuat turun...`);
}

// ============================================
// TAKLIMAT FUNCTIONS
// ============================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active to clicked button
    event.target.classList.add('active');
}

function playVideo(videoId) {
    alert(`🎬 Video "${videoId}" sedang diputar...\n\nDalam sistem sebenar, video akan diputar menggunakan YouTube atau video player.`);
}

function cetakSuratKeselamatan(type) {
    alert(`📄 Surat kehadiran untuk "${type}" sedang dicetak...`);
    window.print();
}

function daftarTaklimat(sesiId) {
    openModal('daftarModal');
}

function lihatSurat(suratId) {
    const surat = taklimatRecords.find(s => s.id === suratId);
    if (surat) {
        alert(`📄 SURAT PENGESAHAN\n\nNama: ${surat.nama}\nSesi: ${surat.sesi}\nTarikh: ${surat.tarikh}\n\n✅ Hadir`);
    }
}

function cetakSurat(suratId) {
    window.print();
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
}

function closeDaftarModal() {
    closeModal();
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal with close button
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', closeModal);
});

// ============================================
// FORM HANDLERS
// ============================================

function setupFormHandlers() {
    // Dynamic Form Handler
    const dynamicForm = document.getElementById('dynamicForm');
    if (dynamicForm) {
        dynamicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            alert('✅ Borang telah disimpan!\n\nNama: ' + formData.get('namaPerkerja') || 'Tidak ada');
            closeModal();
            this.reset();
        });
    }
    
    // Daftar Form Handler
    const daftarForm = document.getElementById('daftarForm');
    if (daftarForm) {
        daftarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Pendaftaran taklimat berjaya!\n\nAnda akan menerima email pengesahan.');
            closeDaftarModal();
            this.reset();
        });
    }
    
    // Feedback Form Handler
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Terima kasih! Maklum balas anda telah diterima.');
            this.reset();
        });
    }
}

// ============================================
// SEARCH & FILTER FUNCTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const cariLaporan = document.getElementById('cariLaporan');
    if (cariLaporan) {
        cariLaporan.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.laporan-card').forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
    
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
        filterStatus.addEventListener('change', function() {
            const status = this.value;
            document.querySelectorAll('.laporan-card').forEach(card => {
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
// UTILITY FUNCTIONS
// ============================================

function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ms-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Smooth scroll untuk semua link
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
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navMenu) {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
});
