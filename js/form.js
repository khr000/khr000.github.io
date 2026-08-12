let resiModal;
let detailModal;


document.addEventListener("DOMContentLoaded", () => {

    resiModal = new bootstrap.Modal(
        document.getElementById("resiModal")
    );

    detailModal = new bootstrap.Modal(
        document.getElementById("detailModal")
    );


    document
        .getElementById("resiForm")
        .addEventListener("submit", handleFormSubmit);

});


/**
 * Buka modal tambah
 */
function openAddModal() {

    document
        .getElementById("resiForm")
        .reset();


    document.getElementById("editId").value = "";

    document.getElementById("modalTitle").textContent =
        "Tambah Data Resi";


    document.getElementById("tanggalPengajuan").value =
        getToday();


    document.getElementById("status").value =
        "Pending";


    document.getElementById("jenisBanding").value =
        "Tidak Ada";


    resiModal.show();

}


/**
 * Buka modal edit
 */
function openEditModal(id) {

    const item = resiData.find(
        item => Number(item.id) === Number(id)
    );


    if (!item) {
        return;
    }


    document.getElementById("modalTitle").textContent =
        "Edit Data Resi";


    document.getElementById("editId").value =
        item.id;


    document.getElementById("nomorResi").value =
        item.nomorResi;


    document.getElementById("jenisKasus").value =
        item.jenisKasus;


    document.getElementById("status").value =
        item.status;


    document.getElementById("tanggalPengajuan").value =
        item.tanggalPengajuan;


    document.getElementById("tanggalSelesai").value =
        item.tanggalSelesai || "";


    document.getElementById("namaBarang").value =
        item.namaBarang;


    document.getElementById("kodeBarang").value =
        item.kodeBarang || "";


    document.getElementById("variasiBarang").value =
        item.variasiBarang || "";


    document.getElementById("jumlah").value =
        item.jumlah;


    document.getElementById("jenisBanding").value =
        item.jenisBanding || "Tidak Ada";


    document.getElementById("catatan").value =
        item.catatan || "";


    resiModal.show();

}


/**
 * Submit form
 */
function handleFormSubmit(event) {

    event.preventDefault();


    const editId =
        document.getElementById("editId").value;


    const data = {

        nomorResi:
            document.getElementById("nomorResi").value.trim(),

        jenisKasus:
            document.getElementById("jenisKasus").value,

        status:
            document.getElementById("status").value,

        tanggalPengajuan:
            document.getElementById("tanggalPengajuan").value,

        tanggalSelesai:
            document.getElementById("tanggalSelesai").value,

        namaBarang:
            document.getElementById("namaBarang").value.trim(),

        kodeBarang:
            document.getElementById("kodeBarang").value.trim(),

        variasiBarang:
            document.getElementById("variasiBarang").value.trim(),

        jumlah:
            Number(document.getElementById("jumlah").value),

        jenisBanding:
            document.getElementById("jenisBanding").value,

        catatan:
            document.getElementById("catatan").value.trim()

    };


    if (editId) {

        updateData(editId, data);

    } else {

        addData(data);

    }


    resiModal.hide();

    renderTable();

    updateDashboard();

}


/**
 * Detail
 */
function showDetail(id) {

    const item = resiData.find(
        item => Number(item.id) === Number(id)
    );


    if (!item) {
        return;
    }


    const content = document.getElementById(
        "detailContent"
    );


    content.innerHTML = `

        <div class="row g-3">

            <div class="col-md-6">
                <strong>Nomor Resi</strong>
                <div>
                    ${escapeHTML(item.nomorResi)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Jenis Kasus</strong>
                <div>
                    ${escapeHTML(item.jenisKasus)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Status</strong>
                <div>
                    ${getStatusBadge(item.status)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Jenis Banding</strong>
                <div>
                    ${escapeHTML(item.jenisBanding)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Tanggal Pengajuan</strong>
                <div>
                    ${formatDate(item.tanggalPengajuan)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Tanggal Selesai</strong>
                <div>
                    ${formatDate(item.tanggalSelesai)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Nama Barang</strong>
                <div>
                    ${escapeHTML(item.namaBarang)}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Kode Barang</strong>
                <div>
                    ${escapeHTML(item.kodeBarang || "-")}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Variasi Barang</strong>
                <div>
                    ${escapeHTML(item.variasiBarang || "-")}
                </div>
            </div>

            <div class="col-md-6">
                <strong>Jumlah</strong>
                <div>
                    ${item.jumlah}
                </div>
            </div>

            <div class="col-12">

                <strong>Catatan</strong>

                <div class="border rounded p-3 mt-1 bg-light">

                    ${escapeHTML(item.catatan || "Tidak ada catatan.")}

                </div>

            </div>

        </div>

    `;


    detailModal.show();

}


/**
 * Tanggal hari ini
 */
function getToday() {

    const date = new Date();

    const year = date.getFullYear();

    const month =
        String(date.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(date.getDate())
        .padStart(2, "0");


    return `${year}-${month}-${day}`;

}