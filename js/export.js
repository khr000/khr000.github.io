/**
 * Export Excel
 */
function exportExcel() {

    if (resiData.length === 0) {

        alert("Tidak ada data untuk diexport.");

        return;

    }


    const exportData = resiData.map((item, index) => {

        return {

            "No": index + 1,

            "Nomor Resi":
                item.nomorResi,

            "Jenis Kasus":
                item.jenisKasus,

            "Status":
                item.status,

            "Tanggal Pengajuan":
                item.tanggalPengajuan,

            "Tanggal Selesai":
                item.tanggalSelesai || "",

            "Nama Barang":
                item.namaBarang,

            "Kode Barang":
                item.kodeBarang || "",

            "Variasi Barang":
                item.variasiBarang || "",

            "Jumlah":
                item.jumlah,

            "Jenis Banding":
                item.jenisBanding,

            "Catatan":
                item.catatan || ""

        };

    });


    const worksheet =
        XLSX.utils.json_to_sheet(exportData);


    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Resi"
    );


    XLSX.writeFile(
        workbook,
        `Data-Resi-${getToday()}.xlsx`
    );

}


/**
 * Print
 */
function printTable() {

    window.print();

}