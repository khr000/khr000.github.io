function renderTable() {

    const tbody = document.getElementById("resiTableBody");

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const statusFilter =
        document.getElementById("statusFilter").value;

    const kasusFilter =
        document.getElementById("kasusFilter").value;

    const bandingFilter =
        document.getElementById("bandingFilter").value;


    const filteredData = resiData.filter(item => {

        const searchableText = `
            ${item.nomorResi}
            ${item.namaBarang}
            ${item.kodeBarang}
            ${item.variasiBarang}
        `.toLowerCase();


        const matchSearch =
            searchableText.includes(search);


        const matchStatus =
            !statusFilter ||
            item.status === statusFilter;


        const matchKasus =
            !kasusFilter ||
            item.jenisKasus === kasusFilter;


        const matchBanding =
            !bandingFilter ||
            item.jenisBanding === bandingFilter;


        return (
            matchSearch &&
            matchStatus &&
            matchKasus &&
            matchBanding
        );

    });


    tbody.innerHTML = "";


    if (filteredData.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="12" class="text-center py-4">
                    <i class="bi bi-inbox fs-3 d-block mb-2"></i>
                    Data tidak ditemukan
                </td>
            </tr>
        `;

        return;

    }


    filteredData.forEach((item, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                <strong>
                    ${escapeHTML(item.nomorResi)}
                </strong>
            </td>

            <td>
                ${escapeHTML(item.jenisKasus)}
            </td>

            <td>
                ${getStatusBadge(item.status)}
            </td>

            <td>
                ${formatDate(item.tanggalPengajuan)}
            </td>

            <td>
                ${item.tanggalSelesai
                    ? formatDate(item.tanggalSelesai)
                    : "-"
                }
            </td>

            <td>
                ${escapeHTML(item.namaBarang)}
            </td>

            <td>
                ${escapeHTML(item.kodeBarang || "-")}
            </td>

            <td>
                ${escapeHTML(item.variasiBarang || "-")}
            </td>

            <td class="text-center">
                ${item.jumlah}
            </td>

            <td>
                ${escapeHTML(item.jenisBanding)}
            </td>

            <td>

                <div class="d-flex gap-1">

                    <button
                        class="btn btn-sm btn-info text-white"
                        onclick="showDetail(${item.id})"
                        title="Detail"
                    >
                        <i class="bi bi-eye"></i>
                    </button>

                    <button
                        class="btn btn-sm btn-warning"
                        onclick="openEditModal(${item.id})"
                        title="Edit"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="removeData(${item.id})"
                        title="Hapus"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </td>

        `;

        tbody.appendChild(row);

    });

}


/**
 * Status badge
 */
function getStatusBadge(status) {

    if (status === "Pending") {

        return `
            <span class="badge text-bg-warning status-badge">
                Pending
            </span>
        `;

    }

    if (status === "Success") {

        return `
            <span class="badge text-bg-success status-badge">
                Success
            </span>
        `;

    }

    if (status === "Gagal") {

        return `
            <span class="badge text-bg-danger status-badge">
                Gagal
            </span>
        `;

    }

    return `
        <span class="badge text-bg-secondary">
            ${escapeHTML(status)}
        </span>
    `;

}


/**
 * Format tanggal
 */
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


/**
 * Escape HTML
 */
function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/**
 * Hapus data
 */
function removeData(id) {

    const item = resiData.find(
        item => Number(item.id) === Number(id)
    );

    if (!item) {
        return;
    }


    const confirmation = confirm(
        `Yakin ingin menghapus resi ${item.nomorResi}?`
    );


    if (!confirmation) {
        return;
    }


    deleteData(id);

    renderTable();

    updateDashboard();

}