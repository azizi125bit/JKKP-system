function showDetailKemalangan(){ alert("Detail kemalangan"); }
function showDetailOrang(){ alert("Detail orang"); }
function filterByMonth(){ alert("Filter bulan"); }
function showStatusDetail(){ alert("Status keselamatan"); }

function downloadStatistik(){ alert("Download statistik"); }
function cetakStatistik(){ window.print(); }

function tambahLaporan(){ alert("Tambah laporan"); }
function lihatLaporan(id){ alert("Lihat laporan "+id); }
function editLaporan(id){ alert("Edit laporan "+id); }
function deleteLaporan(id){ alert("Padam laporan "+id); }

function downloadBorang(n){ alert("Download "+n); }
function isiBorgForm(t){ document.getElementById("formModal").style.display="block"; }

function playVideo(v){ alert("Play "+v); }
function cetakSuratKeselamatan(s){ alert("Cetak surat "+s); }

function lihatSurat(s){ alert("Lihat "+s); }
function cetakSurat(s){ window.print(); }

function daftarTaklimat(s){
document.getElementById("daftarModal").style.display="block";
}

function closeModal(){
document.getElementById("formModal").style.display="none";
}

function closeDaftarModal(){
document.getElementById("daftarModal").style.display="none";
}

function switchTab(tab){
document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active"));
document.getElementById(tab+"-tab").classList.add("active");

document.querySelectorAll(".tab-button").forEach(b=>b.classList.remove("active"));
event.target.classList.add("active");
}
