function exportExcel() {

    if (returnData.length === 0) {

        alert(
            "Tidak ada data untuk diexport."
        );

        return;

    }


    /*
        Ambil data yang sedang ditampilkan
        berdasarkan filter.
    */

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const status =
        document.getElementById("statusFilter").value;


    const banding =
        document.getElementById("bandingFilter").value;


    const alasan =
        document.getElementById("alasanFilter").value;


    const filteredData =
        returnData.filter(item => {


            const searchableText = `

                ${item.noPesanan}

                ${item.noResi}

                ${item.namaBarang}

                ${item.kodeBarang}

                ${item.variasi}

                ${item.keterangan}

            `.toLowerCase();


            return (

                searchableText.includes(search) &&

                (!status ||
                    item.status === status) &&

                (!banding ||
                    item.pengajuanBanding === banding) &&

                (!alasan ||
                    item.alasanPengajuan === alasan)

            );

        });


    /*
        FORMAT UNTUK EXCEL
    */

    const excelData =
        filteredData.map(
            (item, index) => {


                const total =
                    Number(item.jumlah) *
                    Number(item.hargaSatuan);


                return {

                    "No":
                        index + 1,

                    "No Pesanan":
                        item.noPesanan || "",

                    "No Resi":
                        item.noResi,

                    "Status":
                        item.status,

                    "Pengajuan Banding":
                        item.pengajuanBanding,

                    "Alasan Pengajuan":
                        item.alasanPengajuan || "",

                    "Nama Barang":
                        item.namaBarang,

                    "Kode Barang":
                        item.kodeBarang || "",

                    "Variasi":
                        item.variasi || "",

                    "Jumlah":
                        item.jumlah,

                    "Harga Satuan":
                        item.hargaSatuan,

                    "Total Harga":
                        total,

                    "Tanggal Diterima":
                        item.tanggalDiterima,

                    "Keterangan":
                        item.keterangan || ""

                };

            }
        );


    if (excelData.length === 0) {

        alert(
            "Tidak ada data sesuai filter."
        );

        return;

    }


    /*
        BUAT WORKSHEET
    */

    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );


    /*
        BUAT WORKBOOK
    */

    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data Return"
    );


    /*
        NAMA FILE
    */

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    XLSX.writeFile(
        workbook,
        `Data-Return-${today}.xlsx`
    );

}
