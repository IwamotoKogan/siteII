/*dodato*/
 // Dodajte event listenere za dugmad "Da" i "Ne"
 /*const beli = document.getElementById('white-korpus');
 const crni = document.getElementById('black-korpus');
 const sivi = document.getElementById('gray-korpus');*/
 const yesButton = document.getElementById('yes-button');
 const noButton = document.getElementById('no-button');
 const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"
 const leftHingesButton = document.getElementById('left-hinges');
const rightHingesButton = document.getElementById('right-hinges');
/*dodato*/
let selectedDezenPrice = 0;

let dezeni = [];
let selectedDezenKant = 0;
let imeKanta = "Nijedna";
let kantTrake = [];

let izabraniLesonit = null
let imeLesonita = "";


/*************************************************** POVLACENJA CENE LESONITAdocument.addEventListener("DOMContentLoaded", function () {
  const lesonitSelect = document.getElementById("lesonit-select");
  const imeLesonitaEl = document.getElementById("ime-lesonita");
  const cenaLesonitaEl = document.getElementById("cena-lesonita");


  // Dohvatanje JSON podataka o lesonitu
  fetch("lesonit.json")
      .then(response => response.json())
      .then(loadedLesonit => {
          // Popuni <select> opcije
          lesonitSelect.innerHTML = loadedLesonit
              .map(item => `<option value="${item.cena}" data-name="${item.name}">${item.name} (${item.cena} din)</option>`)
              .join("");

          // Podrazumevano postavljanje na prvi u listi
          if (loadedLesonit.length > 0) {
              lesonitSelect.selectedIndex = 0;
              izabraniLesonit = loadedLesonit[0].cena;
              imeLesonita = loadedLesonit[0].name;
              imeLesonitaEl.textContent = imeLesonita;
              cenaLesonitaEl.textContent = izabraniLesonit;
          }
      })
      .catch(error => {
          console.error("Greška pri dohvatanju lesonita: " + error);
      });

  // Kada korisnik promeni izbor lesonita
  lesonitSelect.addEventListener("change", function () {
      const selectedOption = lesonitSelect.options[lesonitSelect.selectedIndex];
      izabraniLesonit = selectedOption.value;
      imeLesonita = selectedOption.getAttribute("data-name");

      // Ažuriraj prikaz
      imeLesonitaEl.textContent = imeLesonita;
      cenaLesonitaEl.textContent = izabraniLesonit;
  });
});
***************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
    const lesonitSelect = document.getElementById("lesonit-select");
    const imeLesonitaEl = document.getElementById("ime-lesonita");
    const cenaLesonitaEl = document.getElementById("cena-lesonita");
    const lesonitModal = new bootstrap.Modal(document.getElementById('lesonitModal'));

   

    // Dohvatanje JSON podataka o lesonitu
    fetch("lesonit.json")
        .then(response => response.json())
        .then(loadedLesonit => {
            // Popuni listu unutar popupa
            lesonitSelect.innerHTML = loadedLesonit
                .map(item => `
                    <button type="button" class="list-group-item list-group-item-action bg-dark text-white border-light" 
                        data-cena="${item.cena}" data-name="${item.name}">
                        ${item.name} (${item.cena} din)
                    </button>
                `)
                .join("");

            // Dodaj event listener za svaki list item
            const listItems = lesonitSelect.querySelectorAll('.list-group-item');
            listItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Uzimamo podatke iz atributa
                    izabraniLesonit = item.getAttribute('data-cena');
                    imeLesonita = item.getAttribute('data-name');

                    // Postavljamo prikaz
                    imeLesonitaEl.textContent = imeLesonita;
                    cenaLesonitaEl.textContent = izabraniLesonit;

                    // Zatvaranje modala
                    lesonitModal.hide();
                });
            });

            // Opcionalno: podrazumevano postavi prvi u listi
            if (loadedLesonit.length > 0) {
                izabraniLesonit = loadedLesonit[0].cena;
                imeLesonita = loadedLesonit[0].name;
                imeLesonitaEl.textContent = imeLesonita;
                cenaLesonitaEl.textContent = izabraniLesonit;
            }
        })
        .catch(error => {
            console.error("Greška pri dohvatanju lesonita: " + error);
        });
});

/***************************************************KRAJ POVLACENJA CENE LESONITA***************************************************************** */


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

       /*************************************************** POVLACENJA CENE KANT TRAKA***************************************************************** */

       document.addEventListener("DOMContentLoaded", function () {
        const kantSelect = document.getElementById("izabraniKant");
        const imeKantaEl = document.getElementById("ime-kanta");
        const cenaKantaEl = document.getElementById("cena-kanta");
    
        // Dohvatanje JSON podataka o kant trakama
        fetch("kantTrake.json")
            .then(response => response.json())
            .then(loadedKantTrake => {
                kantTrake = loadedKantTrake;
    
                // Generisanje HTML opcija za select element
                kantSelect.innerHTML = kantTrake
                    .map(kant => `<option value="${kant.kant}" data-name="${kant.name}">${kant.name} (${kant.kant} din)</option>`)
                    .join("");
    
                // Postavljamo podrazumevanu vrednost (prva opcija u listi)
                if (kantTrake.length > 0) {
                    kantSelect.selectedIndex = 0;
                    selectedDezenKant = kantTrake[0].kant;
                    imeKanta = kantTrake[0].name;
                    imeKantaEl.textContent = imeKanta;
                    cenaKantaEl.textContent = selectedDezenKant;
                }
            })
            .catch(error => {
                console.error("Greška pri dohvatanju kant traka: " + error);
            });
    
        // Event listener za promenu odabira kant trake
        kantSelect.addEventListener("change", function () {
            const selectedOption = kantSelect.options[kantSelect.selectedIndex];
            selectedDezenKant = selectedOption.value;
            imeKanta = selectedOption.getAttribute("data-name");
    
            // Ažuriranje prikaza u HTML-u
            imeKantaEl.textContent = imeKanta;
            cenaKantaEl.textContent = selectedDezenKant;
        });
    });     

           /***************************************************KRAJ POVLACENJA CENE KANT TRAKA***************************************************************** */


// Funkcija za izračunavanje cene na osnovu dimenzija
const dezen1Price = 0;   // Osnovni dezen
const dezen2Price = 50;  // Crni kamen
const dezen3Price = 70;  // Beli mermer

let selectedDezenKorpusPrice = 0;
let selectedDezenKorpusName = 0; 


// Učitavanje dezena korpusa iz JSON fajla
fetch("dezeni.json")
  .then(response => response.json())
  .then(data => {
    // Inicijalno postavi prvi dezen kao podrazumevani
    selectedDezenKorpusPrice = data[0].price; // Cena
    selectedDezenKorpusName = data[0].name; // Ime dezena

    // Kreiraj opcije za selekciju dezena u interfejsu
    const korpusSelect = document.getElementById("korpus-select");
    data.forEach(dezen => {
      const option = document.createElement("option");
      option.value = JSON.stringify({ price: dezen.price, name: dezen.name }); // Čuvamo ime i cenu kao objekat
      option.textContent = dezen.name;
      korpusSelect.appendChild(option);
    });

    // Dodaj event listener za promenu selekcije
    korpusSelect.addEventListener("change", (event) => {
      const selectedValue = JSON.parse(event.target.value);
      selectedDezenKorpusPrice = selectedValue.price;
      selectedDezenKorpusName = selectedValue.name;
    });
  })
  .catch(error => console.error("Greška prilikom učitavanja korpusa:", error));


function calculatePrice(height, width, depth) {
  // Površine osnovnih stranica
  const bottomSurface = width * depth;
  const leftSurface = height * depth;
  const rightSurface = height * depth;
  const adjustedWidth = width - 3.6;
  const topSurface = 2 * (adjustedWidth * 10);
  let totalSurface = bottomSurface + leftSurface + rightSurface + topSurface;

  // Zadnja strana
  const backSurface = width * height;
  const backSurfaceInSquareMeters = backSurface / 10000;
  const backSurfacePrice = backSurfaceInSquareMeters * izabraniLesonit;

  // Pretvaranje ukupne površine u m²
  const totalSurfaceInSquareMeters = totalSurface / 10000;

  // Računanje cene za osnovne strane bez otpada
  const basePrice = totalSurfaceInSquareMeters * selectedDezenKorpusPrice;

  // --- Klizači za fioke ---
  const drawerSlider = document.getElementById('drawer-slider').value.split('|');
  const drawerWidthAdjustment = parseFloat(drawerSlider[0]); // Širina klizača
  const drawerSliderPrice = parseInt(drawerSlider[1]); // Cena klizača

  const drawerWidth = width - drawerWidthAdjustment - 7.2; // Promena širine fioke na osnovu izbora klizača
  const drawerHeight = (height / 2) - 5; // Visina fioke
  const drawerDepth = depth - 5; // Dubina fioke

  // Površina zadnje stranice fioke
  const drawerBackSurface = drawerWidth * drawerHeight;
  const drawerBackSurfaceInSquareMeters = drawerBackSurface / 10000;
  const drawerBackPrice = drawerBackSurfaceInSquareMeters * selectedDezenKorpusPrice;

  // Površina leve i desne stranice fioke (2 strane)
  const drawerSideSurface = 2 * (drawerHeight * drawerDepth);
  const drawerSideSurfaceInSquareMeters = drawerSideSurface / 10000;
  const drawerSidePrice = drawerSideSurfaceInSquareMeters * selectedDezenKorpusPrice;

  // Površina dna fioke
  const drawerBottomSurface = drawerWidth * drawerDepth;
  const drawerBottomSurfaceInSquareMeters = drawerBottomSurface / 10000;
  const drawerBottomPrice = drawerBottomSurfaceInSquareMeters * izabraniLesonit;

  // Površina prednje stranice (front) fioke
  const drawerFrontSurface = width * (height / 2);
  const drawerFrontSurfaceInSquareMeters = drawerFrontSurface / 10000;
  const drawerFrontPrice = drawerFrontSurfaceInSquareMeters * selectedDezenPrice;

  // Dodavanje svih površina fioke ukupnoj površini i ceni
  totalSurface += drawerBackSurface + drawerSideSurface + drawerBottomSurface + drawerFrontSurface;

  // Računanje kant traka za fioku
  const drawerKantLength = (drawerDepth * 4 + drawerHeight * 2 + drawerWidth * 2 + width * 2 + ((height / 2) * 2)) / 100; // Pretvaranje u metre
  const drawerKantPrice = drawerKantLength * selectedDezenKant;

  // Dodavanje cene kant traka za fioku u ukupnu cenu fioke
  let totalDrawerPrice = drawerBackPrice + drawerSidePrice + drawerBottomPrice + drawerFrontPrice + drawerKantPrice ; 

  // Cena za dve fioke, uključujući cenu klizača
  let dveFioke = (totalDrawerPrice * 2) + (drawerSliderPrice * 2); // Dodaj cenu klizača za dve fioke
 
  // Ukupna cena svih površina bez otpada
  let totalPriceWithoutWaste = basePrice + backSurfacePrice + dveFioke ; 

  // Računanje kant traka za ceo element
  const kantTrakaLength = (height * 2 + depth * 4 + width * 5) / 100; // Pretvaranje u metre
  const kantTrakaPrice = kantTrakaLength * selectedDezenKant;

  // Dodavanje kant trake na ukupnu cenu
  const totalPriceWithKantTraka = totalPriceWithoutWaste + kantTrakaPrice;

  // Dodavanje 10% za otpad na finalnu cenu
  /*const finalPrice = totalPriceWithKantTraka * 1.13 + 1310 + 2160; //1310 4 sponice x 40 + 5 busenja x 230 /2160 je dodata cena za 8 busenja x 230 + 8 spojnica x 40*/
 

 // Saberi ukupnu površinu fioka (po dve svake komponente)
  const totalDrawerSurfaceInSquareMeters =
    2 * (drawerBackSurfaceInSquareMeters + drawerSideSurfaceInSquareMeters + drawerFrontSurfaceInSquareMeters);

  // Ukupna površina svih delova (u m²)
  const ukupnaPovrsinaUMetrima =
    totalDrawerSurfaceInSquareMeters + totalSurfaceInSquareMeters;
 let P_fioke = (drawerBackPrice + drawerSidePrice  + drawerFrontPrice) * 2
  let P_fioke_porez = P_fioke * 1.13
let P_lesonit = (backSurfacePrice + (drawerBottomPrice * 2)) * 1.32
  let P_korpus = basePrice * 1.13
  let P_kant = (kantTrakaPrice + (drawerKantPrice * 2)) * 1.10
  let P_uni_kant = P_fioke_porez + P_korpus + P_kant
  let P_klizaci = drawerSliderPrice * 2
  // Loguj ukupnu površinu u konzolu
  console.log("Ukupna površina svih delova u m²:", ukupnaPovrsinaUMetrima.toFixed(2));
  console.log("kant trake metraza ",((drawerKantLength * 2) + kantTrakaLength));
 console.log("zadnja str lesonit korpus cena", backSurfacePrice.toFixed(2));
 console.log("korpus cena", basePrice.toFixed(2));
 console.log("zadnja str fioka",(drawerBackPrice * 2).toFixed(2));
 console.log("leva i desna str str fioka",(drawerSidePrice * 2).toFixed(2));
 console.log("dno fioka",(drawerBottomPrice * 2).toFixed(2));
 console.log("prednja str fioka",(drawerFrontPrice * 2).toFixed(2));
 console.log("kant trake fioke cene ",(drawerKantPrice * 2).toFixed(2));
 console.log("kant trake korpus cena", kantTrakaPrice.toFixed(2));
 console.log("kant trake fioke metraza ",(kantTrakaLength + (drawerKantLength * 2)));
 console.log("povrsina lesonit",((drawerBottomSurfaceInSquareMeters * 2) + backSurfaceInSquareMeters));
 console.log("cena korpusa, lesonita i fioka zajedno sa kantovanjem fioka ",(totalPriceWithoutWaste));
 console.log("ukupna cena  ",(P_uni_kant));
 console.log("ukupna cena lesonit ",(P_lesonit));
  console.log("klizaci cena ",(P_klizaci));
 const finalPrice = P_uni_kant + P_klizaci + P_lesonit + 800 + 2990;
  return {
    totalPrice: finalPrice.toFixed(2),
    totalSurface: totalSurface.toFixed(2),
    totalSurfaceInSquareMeters: totalSurfaceInSquareMeters.toFixed(2),
    backSurfacePrice: backSurfacePrice.toFixed(2),
    kantTrakaLength: kantTrakaLength.toFixed(2),
    kantTrakaPrice: kantTrakaPrice.toFixed(2),
    drawerKantLength: drawerKantLength.toFixed(2),
    drawerKantPrice: drawerKantPrice.toFixed(2),
  };
}





// Funkcija koja proverava da li su unete vrednosti numeričkog tipa
function isValidNumber(value) {
   return !isNaN(value);
}

// Funkcija koja proverava da li su unete dimenzije unutar dozvoljenog opsega
function isValidDimensions(height, width, depth) {
   const minHeight = 72;
   const maxHeight = 76;
   const minWidth = 56;
   const maxWidth = 250;
   const minDepth = 30;
   const maxDepth = 60;

   return height >= minHeight && height <= maxHeight &&
       width >= minWidth && width <= maxWidth &&
       depth >= minDepth && depth <= maxDepth;
}

// Funkcija koja se poziva prilikom klika na dugme za izračunavanje cene
function calculate() {
   const heightInput = document.getElementById('height');
   const widthInput = document.getElementById('width');
   const depthInput = document.getElementById('depth');

   const height = parseInt(heightInput.value);
   const width = parseInt(widthInput.value);
   const depth = parseInt(depthInput.value);

   if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
       document.getElementById('price').innerText = "Niste uneli validne podatke";
       return;
   }

   if (!isValidDimensions(height, width, depth)) {
       document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
       return;
   }
   /** */
 const selectedPatternTitle = document.getElementById('selected-pattern-title');
   const selectedPatternName = selectedPatternTitle.textContent;
   const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);


   if (izabraniLesonit === 0) {
    alert("Niste odabrali lesonit.");
    return;
}

   if (!selectedDezen) {
       alert("Niste odabrali dezen elementa.");
       return;
   }
/** */
  const priceData = calculatePrice(height, width, depth);

   document.getElementById('price').innerHTML = `
   <div class="row mb-5">
               <div class="col-md-12">
                 <div class="border p-4 rounded text-black" role="alert">
                  <span class="h3">Cena elementa:</span><strong  class="h3">${priceData.totalPrice}</strong>
                 </div>
               </div>
             </div>
   `;

   // Izračunajte preporučene dimenzije fronta
   const recommendedFrontDimensions = calculateRecommendedFrontDimensions(height, width, depth);

   // Prikaz preporučenog fronta ispod cene
   const recommendedFront = document.getElementById('recommended-front');
   recommendedFront.innerHTML = `<div class="row mb-5">
               <div class="col-md-12">
                 <div class="border p-4 rounded" role="alert">
                   Dimenzije fronta za kreirani element: ${message}
                 </div>
               </div>
             </div>` ;
}


document.getElementById('calculate-btn').addEventListener('click', function() {
   calculate();
   /*calculateHingers(parseInt(document.getElementById('height').value), parseInt(document.getElementById('width').value), parseInt(document.getElementById('depth').value));*/
});


// Kreiramo objekat za čuvanje podataka o kuhinji
let kuhinjaData = {
   height: 0,
   width: 0,
   depth: 0,
   price: 0
};

function addToCart(dezeni) 
{
   const heightInput = document.getElementById('height');
   const widthInput = document.getElementById('width');
   const depthInput = document.getElementById('depth');

 const hingeInput = document.getElementById('hinge-type');
   const itemName = document.getElementById('imeElementa').textContent;
   const itemImageSrc = document.getElementById('slikaKorpusa').getAttribute('src');
   const selectedPatternTitle = document.getElementById('selected-pattern-title');

   const height = parseInt(heightInput.value);
   const width = parseInt(widthInput.value);
   const depth = parseInt(depthInput.value);

 /*const hinge = parseInt(hingeInput.value);*/

   if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
       document.getElementById('price').innerText = "Niste uneli validne podatke";
       return;
   }

   if (!isValidDimensions(height, width, depth)) {
       document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
       return;
   }

 const priceData = calculatePrice(height, width, depth); 

   /*const basePrice = calculatePrice(height, width, depth, shelves); // Osnovna cena bez dezena*/

   const selectedPatternName = selectedPatternTitle.textContent;
   const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);

/*ovan*/
 
   
                                                          
                                                          
   /*const isCrniKorpus = crni.classList.contains('selektovan');
   const isBeliKorpus = beli.classList.contains('selektovan');
   const isSiviKorpus = sivi.classList.contains('selektovan');*/
   



   /*if (!(isCrniKorpus || isBeliKorpus || isSiviKorpus)) {
       alert("Odaberite korpus");
       return;
   }*/

   if (izabraniLesonit === 0) {
    alert("Niste odabrali lesonit.");
    return;
}

   if (!selectedDezen) {
       alert("Niste odabrali dezen elementa.");
       return;
   }
/*ovan*/

   if (selectedDezen) {
    // Ako postoji odabrani dezen, ažurirajte cenu sa dezenom
       const totalPrice = priceData + selectedDezen.price;
       document.getElementById('price').innerText = `Cena: ${totalPrice} din.`;
       // Dodajte dezen u objekat newItem koji se dodaje u korpu
    

      

      /* const cartButton = document.getElementById('cart-button');
       const notification = document.createElement('div');
       notification.className = 'notification';
       notification.innerText = '+1';
       cartButton.appendChild(notification);*/

       // Izračunajte preporučene dimenzije fronta
       const recommendedFrontDimensions = calculateRecommendedFrontDimensions(height, width, depth);
               /*promena*/
               recommendedFrontDimensions.message = message;

               /*pitanjaaaaa */
  
    // Provera odgovora korisnika
/*const korpusOdgovor = crni.classList.contains('selektovan') ? 'crni' : beli.classList.contains('selektovan') ? 'beli' : sivi.classList.contains('selektovan') ? 'sivi' : '';*/

    /*const selectedHinges = leftHingesButton.classList.contains('selected') ? 'Leva str' : 'Desna str';
    pitanjaaaaa */
       
/*******************************************************KORPUS*************************************************************************/

/*******************************************************KORPUS*************************************************************************/

             const newItem = {
           height: height,
           width: width,
           depth: depth,
           price: priceData.totalPrice,//
             
           totalSurface: priceData.totalSurface, // Dodaj ukupnu površinu
            totalSurfaceInSquareMeters: priceData.totalSurfaceInSquareMeters, // Dodaj površinu u m²
           dezen: selectedDezen.name, // Dodajte ime dezena
              korpusDezen: selectedDezenKorpusName,
           message: recommendedFrontDimensions.message,
           /*answer: answer,*/
           
           /*korpusOdgovor: korpusOdgovor,*/
       itemName: itemName,
       itemImageSrc: itemImageSrc 
       };

       kuhinjaData.height = height;
       kuhinjaData.width = width;
       kuhinjaData.depth = depth;
       kuhinjaData.price = totalPrice;
    
/*promena*/

       // Dodajte preporučene dimenzije fronta u objekat kuhinjaData
       kuhinjaData.recommendedFrontDimensions = recommendedFrontDimensions;

       // Sačuvajmo podatke u localStorage
       localStorage.setItem('kuhinjaData', JSON.stringify(kuhinjaData));

       // Uzmi postojeće elemente iz localStorage ili inicijalizuj prazno ako ih nema
       const savedItems = JSON.parse(localStorage.getItem('items')) || [];

       // Dodaj novi element u listu sačuvanih elemenata
       savedItems.push(newItem);

       // Sačuvaj ažuriranu listu elemenata u localStorage
       localStorage.setItem('items', JSON.stringify(savedItems));

       // Redirektuj na stranicu pregled_kuhinja.html
   alert("Uspešno ste kreirali element.");
       
      location.reload();
   }
}

const kupiBtn = document.getElementById('kupi-btn');
kupiBtn.addEventListener('click', () => {
   addToCart(dezeni); // Prosledite dezeni niz funkciji addToCart

});

// Nakon izračunavanja cene, izračunajte preporučene dimenzije fronta
let message;
function calculateRecommendedFrontDimensions(height, width, depth) {
  let recommendedHeight, recommendedWidth;

   if (width <= 149) {
       // Ako je širina manja ili jednaka 150cm
       recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
       recommendedWidth = width - 0.4; // Smanjite širinu za 4mm
       message = `visina ${recommendedHeight.toFixed(1)}cm i širina ${recommendedWidth.toFixed(1)}cm.`;
   } else {
       // Ako je širina veća od 150cm, podelite na dvoje vrata
       const singleDoorWidth = (width  / 2)- 0.2; // Podelite širinu na dva vrata
       recommendedWidth = singleDoorWidth;
       recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
       message = `Unete dimenzije za širinu su preko 150cm. Potrebno je kreirati dvoje vrata 2 x ${singleDoorWidth.toFixed(1)}cm x ${recommendedHeight.toFixed(1)}cm`;
   }

   console.log('Preporučene dimenzije fronta:', recommendedHeight, recommendedWidth);
   console.log('Poruka:', message);

   return { recommendedHeight, recommendedWidth, message };
}








/*PITANJAAAAAAAAAAAAAAAAAAAAAAAAAAAA */

 

 // Označavanje odgovora kada se klikne na dugme "Da"
 /*yesButton.addEventListener('click', function () {
   yesButton.classList.add('selected');
   noButton.classList.remove('selected');
   enableKupiButtonIfAnswered();
 });*/
 /*beli.addEventListener('click', function () {
   beli.classList.add('selektovan');
   crni.classList.remove('selektovan');
   sivi.classList.remove('selektovan');
   enableKupiButtonIfKorpus();
 });
 crni.addEventListener('click', function () {
   crni.classList.add('selektovan');
   beli.classList.remove('selektovan');
   sivi.classList.remove('selektovan');
   enableKupiButtonIfKorpus();
 });
 sivi.addEventListener('click', function () {
   sivi.classList.add('selektovan');
   crni.classList.remove('selektovan');
   beli.classList.remove('selektovan');
   enableKupiButtonIfKorpus();
 });*/

 // Označavanje odgovora kada se klikne na dugme "Ne"
 
 // Funkcija za omogućavanje dugmeta "Kupi" ako je odgovoreno na pitanje
 function enableKupiButtonIfAnswered() {
   if (yesButton.classList.contains('selected') || noButton.classList.contains('selected')) {
     kupiButton.removeAttribute('disabled');
   } else {
     kupiButton.setAttribute('disabled', 'disabled');
   }
 }
 /*function enableKupiButtonIfKorpus() {
   if (crni.classList.contains('selektovan') || beli.classList.contains('selektovan') || sivi.classList.contains('selektovan')) {
     kupiButton.removeAttribute('disabled');
   } else {
     kupiButton.setAttribute('disabled', 'disabled');
   }
 }*/

 


/*PITANJAAAAAAAAAAAAAAAAAAAAAAAAAAAA */


/*nova verzija1*/
