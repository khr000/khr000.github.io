document.addEventListener("DOMContentLoaded", async () => {

    await initializeData();

    setupNavigation();

    setupFilter();

    renderTable();

    updateDashboard();

});


/**
 * Navigation
 */
function setupNavigation() {

    const dashboardSection =
        document.getElementById("dashboardSection");

    const dataResiSection =
        document.getElementById("dataResiSection");


    const menuDashboard =
        document.getElementById("menuDashboard");

    const menuDataResi =
        document.getElementById("menuDataResi");


    menuDashboard.addEventListener("click", event => {

        event.preventDefault();

        dashboardSection.classList.remove("d-none");

        dataResiSection.classList.add("d-none");

        menuDashboard.classList.add("active");

        menuDataResi.classList.remove("active");

        document.getElementById("pageTitle").textContent =
            "Dashboard";

    });


    menuDataResi.addEventListener("click", event => {

        event.preventDefault();

        dashboardSection.classList.add("d-none");

        dataResiSection.classList.remove("d-none");

        menuDashboard.classList.remove("active");

        menuDataResi.classList.add("active");

        document.getElementById("pageTitle").textContent =
            "Data Resi";

        renderTable();

    });

}


/**
 * Filter
 */
function setupFilter() {

    document
        .getElementById("searchInput")
        .addEventListener("input", renderTable);


    document
        .getElementById("statusFilter")
        .addEventListener("change", renderTable);


    document
        .getElementById("kasusFilter")
        .addEventListener("change", renderTable);


    document
        .getElementById("bandingFilter")
        .addEventListener("change", renderTable);

}


/**
 * Dashboard
 */
function updateDashboard() {

    const total =
        resiData.length;


    const pending =
        resiData.filter(
            item => item.status === "Pending"
        ).length;


    const success =
        resiData.filter(
            item => item.status === "Success"
        ).length;


    const gagal =
        resiData.filter(
            item => item.status === "Gagal"
        ).length;


    document.getElementById("totalData").textContent =
        total;


    document.getElementById("totalPending").textContent =
        pending;


    document.getElementById("totalSuccess").textContent =
        success;


    document.getElementById("totalGagal").textContent =
        gagal;

}