
 const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"

/*dodato*/
let selectedDezenPrice = 0;
let selectedDezenKant = 0;
let dezeni = [];



document.addEventListener('DOMContentLoaded', function () {


           /*fetch*/
           // Dohvatanje JSON podataka o dezenima
           fetch("dezeni.json")
       .then(function (response) {
           return response.json();
       })
       .then(function (loadedDezeni) {
           dezeni = loadedDezeni; // Dodelite učitane podatke nizu dezeni
           let dezeniContainer = document.querySelector(".pattern-grid");
           let html = "";

           // Iteriranje kroz svaki dezen i generisanje HTML za svaki od njih
           dezeni.forEach(function (dezen) {
               html += `
       <div class="pattern">
         <img src="${dezen.image}" alt="${dezen.name}">
         <p>${dezen.name}</p>
       </div>
     `;
           });

           // Postavljanje generisanog HTML-a unutar odgovarajućeg kontejnera
           dezeniContainer.innerHTML += html;

           /*premesten*/
           // Dodajte event listenere za interakciju sa odabranim dezenom
           const patterns = document.querySelectorAll('.pattern');
           patterns.forEach(pattern => {
               pattern.addEventListener('click', () => {
                   selectedImage.src = pattern.querySelector('img').src;
                   selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                   selectedPattern.style.display = 'block'; // Prikažite odabrani dezen
                   patternPopup.classList.remove('active'); // Zatvorite popup prozor
               });
           });

           /*pretraga dezena***********/

           // Dobijte referencu na input polje za pretragu
           const searchInput = document.getElementById('search-pattern');

           // Dodajte event listener za promene u input polju
           searchInput.addEventListener('input', () => {
               const searchValue = searchInput.value.toLowerCase(); // Dobijte vrednost pretrage i pretvorite je u mala slova

               // Dobijte sve dezeni
               const patterns = document.querySelectorAll('.pattern');

               // Iterirajte kroz svaki dezen i sakrijte one koji ne odgovaraju unosu pretrage
               patterns.forEach(pattern => {
                   const name = pattern.querySelector('p').textContent.toLowerCase(); // Dobijte ime dezena

                   if (name.includes(searchValue)) {
                       pattern.style.display = 'block'; // Prikaži dezen ako odgovara pretrazi
                   } else {
                       pattern.style.display = 'none'; // Sakrij dezen ako ne odgovara pretrazi
                   }
               });
           });

           /*pretraga dezena*/

           /*promena cene*/
           // Unutar funkcije koja se poziva kada se klikne na dezen, ažurirajte izabrani dezen i njegovu cenu
           patterns.forEach(pattern => {
               pattern.addEventListener('click', () => {
                   selectedImage.src = pattern.querySelector('img').src;
                   selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                   selectedPattern.style.display = 'block'; // Prikažite odabrani dezen
                   patternPopup.classList.remove('active'); // Zatvorite popup prozor

                   // Dobijte naziv odabranog dezena
                   const patternName = pattern.querySelector('p').textContent;

                   // Pronađite dezen sa datim nazivom u JSON-u
                   selectedDezen = dezeni.find(dezen => dezen.name === patternName);
                   selectedDezenPrice = selectedDezen.price;
                   selectedDezenKant = selectedDezen.kant;
               });
           });

           /*premesten*/
       })
       .catch(function (error) {
           console.error("Greška pri dohvatanju podataka: " + error);
       });

           /*fetch*/
           const selectText = document.getElementById('select-text');
           const chooseButton = document.getElementById('choose-pattern');
           const patternPopup = document.getElementById('pattern-popup');
           const closePopupButton = document.getElementById('close-popup');
           const patternGrid = document.querySelector('.pattern-grid');
           const selectedPattern = document.getElementById('selected-pattern');
           const selectedImage = document.getElementById('selected-image');
           const selectedPatternTitle = document.getElementById('selected-pattern-title');





           /*dodato*/
           const element = document.getElementById('pattern-popup');


           // Prikažite pop-up prozor kada se klikne na dugme "Odaberi dezen"
           chooseButton.addEventListener('click', () => {
               patternPopup.classList.add('active');
           });

           // Zatvorite pop-up prozor kada se klikne na dugme "Zatvori"
           closePopupButton.addEventListener('click', () => {
               patternPopup.classList.remove('active');
               selectText.style.display = 'block'; // Ponovo prikažite tekst "Odaberite dezen fronta"
           });


           /*dodato*/
   

           
       });

// Funkcija za izračunavanje cene na osnovu dimenzija
const dezen1Price = 0;   // Osnovni dezen
const dezen2Price = 50;  // Crni kamen
const dezen3Price = 70;  // Beli mermer

function calculatePrice(worktopLength) {
    const width = 0.60; // Širina radne ploče je uvek 60 cm (0.60 metara)

    // Određivanje cene po kvadratnom metru na osnovu izabranog dezena
    const pricePerSquareMeter = selectedDezenPrice;

    // Računanje površine radne ploče (dužina * širina)
    const worktopSurface = worktopLength * width;

    // Računanje cene radne ploče
    const totalPrice = worktopSurface * pricePerSquareMeter;

    // Vraćanje ukupne cene
    return {
        totalPrice: totalPrice.toFixed(2), // Ukupna cena
        worktopSurface: worktopSurface.toFixed(2), // Površina radne ploče
    };
}



// Funkcija koja se poziva prilikom klika na dugme za izračunavanje cene
function calculate() {
    const worktopLength = parseFloat(document.getElementById('worktop-length').value);

    if (isNaN(worktopLength) || worktopLength <= 0) {
        document.getElementById('price').innerText = "Unesite validnu dužinu radne ploče!";
        return;
    }

    const priceData = calculatePrice(worktopLength);

    // Prikazivanje cene
    document.getElementById('price').innerHTML = `
        <div class="row mb-5">
            <div class="col-md-12">
                <div class="border p-4 rounded text-black" role="alert">
                    <span class="h3">Cena elementa:</span><strong class="h3">${priceData.totalPrice}</strong>
                </div>
            </div>
        </div>
    `;
}



function addToCart(dezeni) {
    const worktopLength = parseFloat(document.getElementById('worktop-length').value);

    if (isNaN(worktopLength) || worktopLength <= 0) {
        alert("Unesite validnu dužinu radne ploče!");
        return;
    }

    const priceData = calculatePrice(worktopLength);

    const selectedPatternName = document.getElementById('selected-pattern-title').textContent;
    const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);

    if (!selectedDezen) {
        alert("Niste odabrali dezen elementa.");
        return;
    }

    // Ukupna cena sa dezenom
    const totalPrice = priceData.totalPrice + selectedDezen.price;

    const newItem = {
        height: 0,  // Ove vrednosti nisu relevantne sada, ali ih možeš zameniti ako su potrebne
        width: 0,
        depth: 0,
        price: totalPrice,
        totalSurface: priceData.worktopSurface,
        totalSurfaceInSquareMeters: priceData.worktopSurface, // Površina u kvadratnim metrima
        dezen: selectedDezen.name,
        itemName: document.getElementById('imeElementa').textContent,
        itemImageSrc: document.getElementById('slikaKorpusa').getAttribute('src')
    };

    // Spremanje u localStorage
    let savedItems = JSON.parse(localStorage.getItem('items')) || [];
    savedItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(savedItems));

    alert("Uspešno ste kreirali element.");
    location.reload();  // Prelazak na stranicu pregled_kuhinja.html
}




// Nakon izračunavanja cene, izračunajte preporučene dimenzije fronta
let message;









/*PITANJAAAAAAAAAAAAAAAAAAAAAAAAAAAA */

 
