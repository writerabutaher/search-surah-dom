const loadQuran = (search) => {
    const url = `http://api.alquran.cloud/v1/surah/${search}/ar.alafasy`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySurah(data.data))
}

const searchSurah = () => {
    toggleSpinner(true);

    const searchField = document.getElementById("search-field");

    const searchText = searchField.value;

    loadQuran(searchText);
    searchField.value = "";
}

const searchField = document.getElementById("search-field").addEventListener("keyup", function (i) {
    if (i.key === "Enter") {
        searchSurah()
    }
})

const displaySurah = (surah) => {
    console.log(surah);

    const noSurah = document.getElementById("no-surah");
    const yourSearch = document.getElementById("your-search");
    const surahContainer = document.getElementById("surah-container");
    if (typeof (surah.number) === "undefined") {
        noSurah.classList.remove("d-none")
        yourSearch.classList.add("d-none")
        surahContainer.classList.add("d-none")
    } else {
        yourSearch.classList.remove("d-none")
        noSurah.classList.add("d-none")
        surahContainer.classList.remove("d-none")
    }

    surahContainer.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${surah.number}. ${surah.englishName} - ${surah.name}</h5>
            <p class="card-text"><span class="fw-bold">Translation:</span> ${surah.englishNameTranslation}</p>
            <p class="card-text"><span class="fw-bold">Ayah:</span> ${surah.numberOfAyahs}</p>
            <p class="card-text"><span class="fw-bold">Revelation:</span> ${surah.revelationType}</p>
        </div>

        <button onclick="loadSurahDetails()" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#detailModal">
            Read Surah
        </button>
    </div>
    `
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loaderSpiner = document.getElementById("spiner");
    if (isLoading) {
        loaderSpiner.classList.remove("d-none");
    }
    else {
        loaderSpiner.classList.add("d-none");
    }
}


// const loadSurahDetails = (surah) => {
//     document.getElementById("modal-label").innerText = surah.name;
// }
// loadSurahDetails();

// loadQuran(1)