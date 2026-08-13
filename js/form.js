/* =====================================================
   SETUP FORM
===================================================== */

function setupFormEvents() {


    const banding =
        document.getElementById(
            "pengajuanBanding"
        );


    const alasan =
        document.getElementById(
            "alasanPengajuan"
        );


    /*
        Ketika banding = Ya,
        alasan aktif.
    */

    banding.addEventListener(
        "change",
        function () {


            if (this.value === "Ya") {

                alasan.disabled = false;

            } else {

                alasan.disabled = true;

                alasan.value = "";

            }

        }
    );


    /*
        Submit form
    */

    document
        .getElementById("returnForm")
        .addEventListener(
            "submit",
            saveForm
        );

}


/* =====================================================
   PREPARE ADD
===================================================== */

function prepareAddForm() {


    const form =
        document.getElementById(
            "returnForm"
        );


    form.reset();


    document.getElementById(
        "editId"
    ).value = "";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Tambah Data Return";


    /*
        Default
    */

    document.getElementById(
        "pengajuanBanding"
    ).value = "Tidak";


    const alasan =
        document.getElementById(
            "alasanPengajuan"
        );


    alasan.disabled = true;

    alasan.value = "";


    /*
        Default tanggal hari ini
    */

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    document.getElementById(
        "tanggalDiterima"
    ).value = today;

}


/* =====================================================
   SAVE FORM
===================================================== */

function saveForm(event) {

    event.preventDefault();


    const editId =
        document.getElementById(
            "editId"
        ).value;


    const noPesanan =
        document.getElementById(
            "noPesanan"
        ).value.trim();


    const noResi =
        document.getElementById(
            "noResi"
        ).value.trim();


    const namaBarang =
        document.getElementById(
            "namaBarang"
        ).value.trim();


    const kodeBarang =
        document.getElementById(
            "kodeBarang"
        ).value.trim();


    const variasi =
        document.getElementById(
            "variasi"
        ).value.trim();


    const jumlah =
        Number(
            document.getElementById(
                "jumlah"
            ).value
        );


    const hargaSatuan =
        Number(
            document.getElementById(
                "hargaSatuan"
            ).value
        );


    const status =
        document.getElementById(
            "status"
        ).value;


    const pengajuanBanding =
        document.getElementById(
            "pengajuanBanding"
        ).value;


    const alasanPengajuan =
        pengajuanBanding === "Ya"
            ? document.getElementById(
                "alasanPengajuan"
            ).value
            : "";


    const tanggalDiterima =
        document.getElementById(
            "tanggalDiterima"
        ).value;


    const keterangan =
        document.getElementById(
            "keterangan"
        ).value.trim();


    /*
        VALIDASI
    */

    if (!noResi) {

        alert(
            "No Resi wajib diisi."
        );

        return;

    }


    if (!namaBarang) {

        alert(
            "Nama Barang wajib diisi."
        );

        return;

    }


    if (!jumlah || jumlah < 1) {

        alert(
            "Jumlah barang harus lebih dari 0."
        );

        return;

    }


    if (
        hargaSatuan < 0 ||
        isNaN(hargaSatuan)
    ) {

        alert(
            "Harga satuan tidak valid."
        );

        return;

    }


    if (!status) {

        alert(
            "Silakan pilih status."
        );

        return;

    }


    if (!tanggalDiterima) {

        alert(
            "Tanggal diterima wajib diisi."
        );

        return;

    }


    if (
        pengajuanBanding === "Ya" &&
        !alasanPengajuan
    ) {

        alert(
            "Silakan pilih alasan pengajuan."
        );

        return;

    }


    /*
        OBJECT DATA
    */

    const newData = {

        id:
            editId
                ? Number(editId)
                : Date.now(),

        noPesanan,

        noResi,

        status,

        pengajuanBanding,

        alasanPengajuan,

        namaBarang,

        kodeBarang,

        variasi,

        jumlah,

        hargaSatuan,

        tanggalDiterima,

        keterangan

    };


    /*
        EDIT
    */

    if (editId) {


        const index =
            returnData.findIndex(
                item =>
                    item.id ===
                    Number(editId)
            );


        if (index !== -1) {

            returnData[index] =
                newData;

        }


    }

    /*
        TAMBAH
    */

    else {

        returnData.push(
            newData
        );

    }


    /*
        SIMPAN KE LOCAL STORAGE
    */

    saveStoredData(
        returnData
    );


    /*
        REFRESH
    */

    renderTable();

    updateDashboard();


    /*
        TUTUP MODAL
    */

    const modalElement =
        document.getElementById(
            "returnModal"
        );


    const modal =
        bootstrap.Modal
            .getInstance(
                modalElement
            );


    modal.hide();


    alert(
        editId
            ? "Data berhasil diperbarui."
            : "Data berhasil ditambahkan."
    );

}


/* =====================================================
   EDIT DATA
===================================================== */

function editData(id) {


    const item =
        returnData.find(
            data =>
                data.id === Number(id)
        );


    if (!item) {

        alert(
            "Data tidak ditemukan."
        );

        return;

    }


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Data Return";


    document.getElementById(
        "editId"
    ).value =
        item.id;


    document.getElementById(
        "noPesanan"
    ).value =
        item.noPesanan || "";


    document.getElementById(
        "noResi"
    ).value =
        item.noResi || "";


    document.getElementById(
        "namaBarang"
    ).value =
        item.namaBarang || "";


    document.getElementById(
        "kodeBarang"
    ).value =
        item.kodeBarang || "";


    document.getElementById(
        "variasi"
    ).value =
        item.variasi || "";


    document.getElementById(
        "jumlah"
    ).value =
        item.jumlah || 1;


    document.getElementById(
        "hargaSatuan"
    ).value =
        item.hargaSatuan || 0;


    document.getElementById(
        "status"
    ).value =
        item.status || "";


    document.getElementById(
        "pengajuanBanding"
    ).value =
        item.pengajuanBanding || "Tidak";


    document.getElementById(
        "tanggalDiterima"
    ).value =
        item.tanggalDiterima || "";


    document.getElementById(
        "keterangan"
    ).value =
        item.keterangan || "";


    const alasan =
        document.getElementById(
            "alasanPengajuan"
        );


    if (
        item.pengajuanBanding === "Ya"
    ) {

        alasan.disabled = false;

        alasan.value =
            item.alasanPengajuan || "";

    } else {

        alasan.disabled = true;

        alasan.value = "";

    }


    /*
        Buka modal
    */

    const modalElement =
        document.getElementById(
            "returnModal"
        );


    const modal =
        new bootstrap.Modal(
            modalElement
        );


    modal.show();

}


/* =====================================================
   DELETE DATA
===================================================== */

function deleteData(id) {


    const item =
        returnData.find(
            data =>
                data.id === Number(id)
        );


    if (!item) {

        return;

    }


    const confirmDelete =
        confirm(
            `Hapus data return ${item.noResi}?`
        );


    if (!confirmDelete) {

        return;

    }


    returnData =
        returnData.filter(
            data =>
                data.id !== Number(id)
        );


    saveStoredData(
        returnData
    );


    renderTable();

    updateDashboard();


    alert(
        "Data berhasil dihapus."
    );

}
