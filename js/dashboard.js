function updateDashboard() {


    const month =
        document.getElementById(
            "monthFilter"
        ).value;


    let filteredData =
        returnData;


    /*
        FILTER BULAN
    */

    if (month) {


        filteredData =
            returnData.filter(
                item => {


                    return (
                        item.tanggalDiterima &&
                        item.tanggalDiterima
                            .startsWith(month)
                    );

                }
            );

    }


    /*
        TOTAL RETURN
    */

    const totalReturn =
        filteredData.length;


    /*
        TOTAL BARANG
    */

    const totalBarang =
        filteredData.reduce(
            (total, item) => {

                return (
                    total +
                    Number(item.jumlah || 0)
                );

            },
            0
        );


    /*
        BAIK
    */

    const totalBaik =
        filteredData.filter(
            item =>
                item.status ===
                "Diterima dengan Baik"
        ).length;


    /*
        TIDAK BAIK
    */

    const totalTidakBaik =
        filteredData.filter(
            item =>
                item.status ===
                "Diterima Tidak Baik"
        ).length;


    /*
        BANDING
    */

    const totalBanding =
        filteredData.filter(
            item =>
                item.pengajuanBanding ===
                "Ya"
        ).length;


    /*
        GAGAL
    */

    const totalGagal =
        filteredData.filter(
            item =>
                item.alasanPengajuan ===
                "Pengiriman Gagal"
        ).length;


    /*
        BARANG DAN DANA
    */

    const totalBarangDana =
        filteredData.filter(
            item =>
                item.alasanPengajuan ===
                "Pengembalian Barang dan Dana"
        ).length;


    /*
        KONDISI AWAL
    */

    const totalKondisiAwal =
        filteredData.filter(
            item =>
                item.alasanPengajuan ===
                "Pulangkan Kondisi Seperti Awal"
        ).length;


    /*
        TOTAL NILAI
    */

    const totalNilai =
        filteredData.reduce(
            (total, item) => {


                const jumlah =
                    Number(item.jumlah || 0);


                const harga =
                    Number(
                        item.hargaSatuan || 0
                    );


                return (
                    total +
                    (jumlah * harga)
                );

            },
            0
        );


    /*
        TAMPILKAN
    */

    document.getElementById(
        "totalReturn"
    ).textContent =
        totalReturn;


    document.getElementById(
        "totalBarang"
    ).textContent =
        totalBarang;


    document.getElementById(
        "totalBaik"
    ).textContent =
        totalBaik;


    document.getElementById(
        "totalTidakBaik"
    ).textContent =
        totalTidakBaik;


    document.getElementById(
        "totalBanding"
    ).textContent =
        totalBanding;


    document.getElementById(
        "totalGagal"
    ).textContent =
        totalGagal;


    document.getElementById(
        "totalBarangDana"
    ).textContent =
        totalBarangDana;


    document.getElementById(
        "totalNilai"
    ).textContent =
        formatRupiah(
            totalNilai
        );


    document.getElementById(
        "totalKondisiAwal"
    ).textContent =
        totalKondisiAwal;


    document.getElementById(
        "totalRefund"
    ).textContent =
        totalBarangDana;


    document.getElementById(
        "totalPengirimanGagal"
    ).textContent =
        totalGagal;

}
