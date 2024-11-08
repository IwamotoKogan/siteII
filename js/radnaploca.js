/*dodato*/

const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"

/*dodato*/
let selectedDezenPrice = 0;
let selectedDezenKant = 0;
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
    const squareMetersInput = document.getElementById('square-meters'); // Unos za kvadrate
    const squareMeters = parseFloat(squareMetersInput.value);

    if (isNaN(squareMeters) || squareMeters <= 0) {
        document.getElementById('price').innerText = "Unesite validan broj kvadratnih metara";
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
    // ... ostali kod
 
    const priceData = calculatePrice(height, width, depth, shelves); // Izračunata osnovna cena i površina
    
    const selectedPatternName = selectedPatternTitle.textContent;
    const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);
 
    if (!selectedDezen) {
        alert("Niste odabrali dezen elementa.");
        return;
    }
 
    // Ažurirana logika za cenu sa dezenom
    const totalPrice = priceData.totalSurfaceInSquareMeters * selectedDezen.price; // Računamo cenu na osnovu površine i cene dezena
    document.getElementById('price').innerText = `Cena: ${totalPrice} din.`;
 
    const newItem = {
        height: height,
        width: width,
        depth: depth,
        price: totalPrice, // Ažurirana cena sa dezenom
        totalSurface: priceData.totalSurface, 
        totalSurfaceInSquareMeters: priceData.totalSurfaceInSquareMeters, 
        dezen: selectedDezen.name, 
        message: recommendedFrontDimensions.message,
        hinges: calculateHingers(height, width, depth),
        itemName: itemName,
        itemImageSrc: itemImageSrc
    };
 
    kuhinjaData.height = height;
    kuhinjaData.width = width;
    kuhinjaData.depth = depth;
    kuhinjaData.price = totalPrice;
 
    kuhinjaData.recommendedFrontDimensions = recommendedFrontDimensions;
    localStorage.setItem('kuhinjaData', JSON.stringify(kuhinjaData));
 
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(savedItems));
 
    alert("Uspešno ste kreirali element.");
    location.reload();
 }
 
