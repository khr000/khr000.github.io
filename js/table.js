function renderTable() {

    const tbody =
        document.getElementById(
            "returnTableBody"
        );


    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    const banding =
        document.getElementById(
            "bandingFilter"
        ).value;


    const alasan =
        document.getElementById(
            "alasanFilter"
        ).value;


    /*
        FILTER
    */

    const filteredData =
        returnData.filter(
            item => {


                const searchableText = `

                    ${item.noPesanan || ""}

                    ${item.noResi || ""}

                    ${item.namaBarang || ""}

                    ${item.kodeBarang || ""}

                    ${item.variasi || ""}

                    ${item.keterangan || ""}

                `.toLowerCase();


                const matchSearch =
                    searchableText
                        .includes(search);


                const matchStatus =
                    !status ||
                    item.status === status;


                const matchBanding =
                    !banding ||
                    item.pengajuanBanding === banding;


                const matchAlasan =
                    !alasan ||
                    item.alasanPengajuan === alasan;


                return (
                    matchSearch &&
                    matchStatus &&
                    matchBanding &&
                    matchAlasan
                );

            }
        );


    tbody.innerHTML = "";


    /*
        KOSONG
    */

    if (
        filteredData.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="15"
                    class="text-center py-5"
                >

                    <i
                        class="bi bi-inbox fs-2 d-block mb-2"
                    ></i>

                    Tidak ada data.

                </td>

            </tr>

        `;

        return;

    }


    /*
        RENDER
    */

    filteredData.forEach(
        (item, index) => {


            const totalHarga =
                Number(item.jumlah) *
                Number(item.hargaSatuan);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>


                <td>

                    ${
                        item.noPesanan
                        ? escapeHTML(
                            item.noPesanan
                        )
                        : `
                            <span class="text-muted">
                                -
                            </span>
                        `
                    }

                </td>


                <td>

                    <strong>

                        ${escapeHTML(
                            item.noResi
                        )}

                    </strong>

                </td>


                <td>

                    ${getStatusBadge(
                        item.status
                    )}

                </td>


                <td>

                    ${
                        item.pengajuanBanding === "Ya"

                        ? `
                            <span class="badge text-bg-warning">
                                Ya
                            </span>
                        `

                        : `
                            <span class="badge text-bg-secondary">
                                Tidak
                            </span>
                        `
                    }

                </td>


                <td>

                    ${
                        item.alasanPengajuan
                        ? escapeHTML(
                            item.alasanPengajuan
                        )
                        : `
                            <span class="text-muted">
                                -
                            </span>
                        `
                    }

                </td>


                <td>

                    ${escapeHTML(
                        item.namaBarang
                    )}

                </td>


                <td>

                    ${escapeHTML(
                        item.kodeBarang || "-"
                    )}

                </td>


                <td>

                    ${escapeHTML(
                        item.variasi || "-"
                    )}

                </td>


                <td class="text-center">

                    ${item.jumlah}

                </td>


                <td>

                    ${formatRupiah(
                        item.hargaSatuan
                    )}

                </td>


                <td>

                    <strong>

                        ${formatRupiah(
                            totalHarga
                        )}

                    </strong>

                </td>


                <td>

                    ${formatDate(
                        item.tanggalDiterima
                    )}

                </td>


                <td>

                    ${escapeHTML(
                        item.keterangan || "-"
                    )}

                </td>


                <td>

                    <div
                        class="d-flex gap-1"
                    >


                        <button
                            class="btn btn-sm btn-outline-primary"
                            onclick="editData(${item.id})"
                            title="Edit"
                        >

                            <i class="bi bi-pencil"></i>

                        </button>


                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="deleteData(${item.id})"
                            title="Hapus"
                        >

                            <i class="bi bi-trash"></i>

                        </button>


                    </div>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


/* =====================================================
   STATUS BADGE
===================================================== */

function getStatusBadge(status) {


    if (
        status ===
        "Diterima dengan Baik"
    ) {

        return `

            <span
                class="badge badge-custom status-good"
            >

                <i class="bi bi-check-circle"></i>

                Baik

            </span>

        `;

    }


    if (
        status ===
        "Diterima Tidak Baik"
    ) {

        return `

            <span
                class="badge badge-custom status-bad"
            >

                <i class="bi bi-x-circle"></i>

                Tidak Baik

            </span>

        `;

    }


    return `

        <span class="badge text-bg-secondary">

            ${escapeHTML(status)}

        </span>

    `;

}
