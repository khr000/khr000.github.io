const STORAGE_KEY = "resiManagementData";

let resiData = [];


/**
 * Load data awal dari JSON
 */
async function initializeData() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {

        resiData = JSON.parse(savedData);

    } else {

        try {

            const response = await fetch("data/data.json");

            const data = await response.json();

            resiData = data;

            saveData();

        } catch (error) {

            console.error("Gagal membaca data.json:", error);

            resiData = [];

        }

    }

}


/**
 * Simpan data ke localStorage
 */
function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(resiData)
    );

}


/**
 * Generate ID
 */
function generateId() {

    if (resiData.length === 0) {
        return 1;
    }

    return Math.max(
        ...resiData.map(item => Number(item.id))
    ) + 1;

}


/**
 * Tambah data
 */
function addData(data) {

    data.id = generateId();

    resiData.push(data);

    saveData();

}


/**
 * Update data
 */
function updateData(id, newData) {

    const index = resiData.findIndex(
        item => Number(item.id) === Number(id)
    );

    if (index !== -1) {

        newData.id = Number(id);

        resiData[index] = newData;

        saveData();

    }

}


/**
 * Hapus data
 */
function deleteData(id) {

    resiData = resiData.filter(
        item => Number(item.id) !== Number(id)
    );

    saveData();

}


/**
 * Reset seluruh data
 */
function resetData() {

    const confirmReset = confirm(
        "Yakin ingin menghapus semua data tersimpan dan mengembalikan data awal?"
    );

    if (!confirmReset) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);

    location.reload();

}