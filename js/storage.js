const STORAGE_KEY = "returnManagementData";


/* =====================================================
   AMBIL DATA
===================================================== */

function getStoredData() {

    const stored =
        localStorage.getItem(STORAGE_KEY);


    if (stored) {

        try {

            return JSON.parse(stored);

        } catch (error) {

            console.error(
                "Data localStorage rusak.",
                error
            );

        }

    }


    return [];

}


/* =====================================================
   SIMPAN DATA
===================================================== */

function saveStoredData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* =====================================================
   INISIALISASI DATA JSON
===================================================== */

async function initializeStorage() {

    const stored =
        localStorage.getItem(STORAGE_KEY);


    /*
        Kalau localStorage belum ada,
        ambil data dari data.json.
    */

    if (!stored) {

        try {

            const response =
                await fetch("data/data.json");


            if (!response.ok) {

                throw new Error(
                    "data.json tidak ditemukan."
                );

            }


            const jsonData =
                await response.json();


            saveStoredData(jsonData);


        } catch (error) {

            console.error(error);

            saveStoredData([]);

        }

    }


    return getStoredData();

}
