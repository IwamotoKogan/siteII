const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"

/*ness*/
let selectedDezenPrice = 0;
let dezeni = [];

document.addEventListener('DOMContentLoaded', function () {
    /*fetch*/
    fetch("dezeni.json")
        .then(response => response.json())
        .then(loadedDezeni => {
            dezeni = loadedDezeni; 
            let dezeniContainer = document.querySelector(".pattern-grid");
            let html = "";

            dezeni.forEach(dezen => {
                html += `
                    <div class="pattern">
                        <img src="${dezen.image}" alt="${dezen.name}">
                        <p>${dezen.name}</p>
                    </div>
                `;
            });

            dezeniContainer.innerHTML += html;

            const patterns = document.querySelectorAll('.pattern');
            patterns.forEach(pattern => {
                pattern.addEventListener('click', () => {
                    selectedImage.src = pattern.querySelector('img').src;
                    selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                    selectedPattern.style.display = 'block';
                    patternPopup.classList.remove('active');

                    const patternName = pattern.querySelector('p').textContent;
                    selectedDezen = dezeni.find(dezen => dezen.name === patternName);
                    selectedDezenPrice = selectedDezen.price;
                });
            });
        })
        .catch(error => console.error("Greška pri dohvatanju podataka: " + error));

    const chooseButton = document.getElementById('choose-pattern');
    const patternPopup = document.getElementById('pattern-popup');
    const closePopupButton = document.getElementById('close-popup');
    const selectedPattern = document.getElementById('selected-pattern');
    const selectedImage = document.getElementById('selected-image');
    const selectedPatternTitle = document.getElementById('selected-pattern-title');

    chooseButton.addEventListener('click', () => patternPopup.classList.add('active'));
    closePopupButton.addEventListener('click', () => patternPopup.classList.remove('active'));
});

// Funkcija za izračunavanje cene na osnovu unosa kvadrature
const worktopWidth = 0.6; // u metrima, npr. 60 cm

function calculatePrice(squareMeters) {
    // Površina radne ploče (širina je konstantna 60cm)
    const worktopSurface = squareMeters * worktopWidth;
    
    // Cena radne ploče na osnovu izabranog dezena
    const finalPrice = worktopSurface * selectedDezenPrice;

    return finalPrice.toFixed(2);
}

function calculate() {
    // Preuzimanje vrednosti unosa za kvadraturu
    const squareMetersInput = document.getElementById('square-meters');
    const squareMeters = parseFloat(squareMetersInput.value);

    // Provera da li je kvadratura validna
    if (isNaN(squareMeters) || squareMeters <= 0) {
        document.getElementById('price').innerText = "Unesite validan broj kvadratnih metara";
        return;
    }

    // Provera da li je dezen odabran
    if (!selectedDezenPrice || selectedDezenPrice <= 0) {
        document.getElementById('price').innerText = "Molimo vas odaberite dezen.";
        return;
    }

    const finalPrice = calculatePrice(squareMeters);

    document.getElementById('price').innerHTML = `
        <div class="row mb-5">
            <div class="col-md-12">
                <div class="border p-4 rounded text-black" role="alert">
                    <span class="h3">Cena elementa:</span><strong class="h3">${finalPrice}</strong> din
                </div>
            </div>
        </div>
    `;
}

document.getElementById('calculate-btn').addEventListener('click', calculate);

function addToCart(dezeni) {
    const selectedPatternTitle = document.getElementById('selected-pattern-title');
    const selectedPatternName = selectedPatternTitle.textContent;
    const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);

    if (!selectedDezen) {
        alert("Niste odabrali dezen elementa.");
        return;
    }

    const squareMetersInput = document.getElementById('square-meters');
    const squareMeters = parseFloat(squareMetersInput.value);
    const totalPrice = calculatePrice(squareMeters);

    if (isNaN(totalPrice)) {
        alert("Niste uneli validne podatke za cenu.");
        return;
    }

    const newItem = {
        // Atributi kao height, width, itd. i konačna cena
        price: totalPrice,
        dezen: selectedDezen.name,
        // ... ostali atributi
    };

    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(savedItems));

    alert("Uspešno ste kreirali element.");
    location.reload();
}

kupiButton.addEventListener('click', function() {
    addToCart(dezeni);
});
