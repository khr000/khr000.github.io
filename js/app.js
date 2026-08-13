let returnData = [];


/* ================= INITIALIZE ================= */

document.addEventListener("DOMContentLoaded", async () => {

    await loadData();

    setupNavigation();

    setupFilter();

    setupMonthFilter();

    renderTable();

    updateDashboard();

});


/* ================= LOAD JSON ================= */

async function loadData() {

    try {

        const response = await fetch("data/data.json");

        if (!response.ok) {
            throw new Error("Data JSON tidak ditemukan.");
        }

        returnData = await response.json();

    } catch (error) {

        console.error(error);

        alert(
            "Gagal membaca data.json. Pastikan website dijalankan menggunakan Live Server atau GitHub Pages."
        );

        returnData = [];

    }

}


/* ================= NAVIGATION ================= */

function setupNavigation() {

    const dashboardSection =
        document.getElementById("dashboardSection");

    const dataReturnSection =
        document.getElementById("dataReturnSection");


    const menuDashboard =
        document.getElementById("menuDashboard");

    const menuDataReturn =
        document.getElementById("menuDataReturn");


    menuDashboard.addEventListener("click", function (event) {

        event.preventDefault();

        dashboardSection.classList.remove("d-none");

        dataReturnSection.classList.add("d-none");

        menuDashboard.classList.add("active");

        menuDataReturn.classList.remove("active");

        document.getElementById("pageTitle").textContent =
            "Dashboard";

        updateDashboard();

    });


    menuDataReturn.addEventListener("click", function (event) {

        event.preventDefault();

        dashboardSection.classList.add("d-none");

        dataReturnSection.classList.remove("d-none");

        menuDashboard.classList.remove("active");

        menuDataReturn.classList.add("active");

        document.getElementById("pageTitle").textContent =
            "Data Return";

        renderTable();

    });

}


/* ================= FILTER ================= */

function setupFilter() {

    document
        .getElementById("searchInput")
        .addEventListener("input", renderTable);


    document
        .getElementById("statusFilter")
        .addEventListener("change", renderTable);


    document
        .getElementById("bandingFilter")
        .addEventListener("change", renderTable);


    document
        .getElementById("alasanFilter")
        .addEventListener("change", renderTable);

}


/* ================= MONTH FILTER ================= */

function setupMonthFilter() {

    const monthFilter =
        document.getElementById("monthFilter");


    monthFilter.addEventListener(
        "change",
        updateDashboard
    );


    /*
        Default bulan sekarang
    */

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
        .padStart(2, "0");


    monthFilter.value =
        `${year}-${month}`;

}


/* ================= FORMAT RUPIAH ================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* ================= FORMAT TANGGAL ================= */

function formatDate(date) {

    if (!date) {
        return "-";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
        return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ================= PRINT ================= */

function printTable() {

    /*
        Pindah otomatis ke halaman Data Return
        sebelum print.
    */

    document
        .getElementById("dashboardSection")
        .classList.add("d-none");


    document
        .getElementById("dataReturnSection")
        .classList.remove("d-none");


    window.print();

}
