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
const police = document.getElementById('shelves');
const sarke = document.getElementById('hinge-type')
/*dodato*/
let selectedDezenPrice = 0;
let selectedDezenKant = 0;
let dezeni = [];

let imeKanta = "Nijedna";
let kantTrake = [];
let izabraniLesonit = null;
console.log("Izabrani lesonit:", izabraniLesonit);
let imeLesonita = "";

/*************************************************** POVLACENJA CENE LESONITA
document.addEventListener("DOMContentLoaded", function () {
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
});***************************************************************** */

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
let selectedDezenKorpusName;  

// Učitavanje dezena korpusa iz JSON fajla
fetch("korpusi.json")
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

function calculatePrice(height, width, depth, shelves) {


    // Površine stranica
    const bottomSurface = width * depth;
    const leftSurface = height * depth;
    const rightSurface = height * depth;
    const topSurface = width * depth;
    const adjustedDepth = depth - 1.8;
    const shelfSurface = shelves * (width * adjustedDepth);

    let totalSurface = bottomSurface + leftSurface + rightSurface + topSurface + shelfSurface;

    // Zadnja strana LESONIT
    const backSurface = width * height;
    const backSurfaceInSquareMeters = backSurface / 10000;
    const backSurfacePrice = backSurfaceInSquareMeters * izabraniLesonit;

    // Prednja strana
    const frontSurface = width * height;
    const frontSurfaceInSquareMeters = frontSurface / 10000;
    const frontSurfacePrice = frontSurfaceInSquareMeters * selectedDezenPrice;

    // Pretvaranje ukupne površine u m²
    const totalSurfaceInSquareMeters = totalSurface / 10000;

    // Računanje cene za osnovne strane bez otpada KORPUS
    const basePrice = totalSurfaceInSquareMeters * selectedDezenKorpusPrice;

    // Ukupna cena svih površina bez otpada
    let totalPriceWithoutWaste = basePrice + backSurfacePrice + frontSurfacePrice;

    // Računanje kant traka
    const kantTrakaLength = (height * 4 + depth * 4 + width * 5) / 100; // Pretvaranje u metre
    const kantTrakaPrice = kantTrakaLength * selectedDezenKant;

    // Cena šarki na osnovu izbora
    const hingeType = document.getElementById('hinge-type').value;
    const hingePrice = 1 * parseInt(hingeType);


    // Dodavanje kant trake na ukupnu cenu
    const totalPriceWithKantTraka = totalPriceWithoutWaste + kantTrakaPrice + hingePrice;

    // Dodavanje 10% za otpad na finalnu cenu 2160 JE CENA SPOJNICA I BUŠENJA 
    const finalPrice = totalPriceWithKantTraka * 1.10 + 1470;

    return {
        totalPrice: finalPrice.toFixed(2),
        totalSurface: totalSurface.toFixed(2),
        totalSurfaceInSquareMeters: totalSurfaceInSquareMeters.toFixed(2),
        backSurfacePrice: backSurfacePrice.toFixed(2),
        frontSurfacePrice: frontSurfacePrice.toFixed(2),
        kantTrakaLength: kantTrakaLength.toFixed(2),
        kantTrakaPrice: kantTrakaPrice.toFixed(2),
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
   const shelvesInput = document.getElementById('shelves');

   const height = parseInt(heightInput.value);
   const width = parseInt(widthInput.value);
   const depth = parseInt(depthInput.value);
   const shelves = parseInt(shelvesInput.value);


 /**/
  const selectedPatternTitle = document.getElementById('selected-pattern-title');
   const selectedPatternName = selectedPatternTitle.textContent;
   const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);
 
 let hasError = false;

if (izabraniLesonit === 0) {
    alert("Niste odabrali lesonit.");
    hasError = true;
}

if (selectedDezenKant === 0) {
    alert("Niste odabrali kant.");
    hasError = true;
}

if (selectedDezenKorpusPrice === 0) {
    alert("Niste odabrali dezen korpusa.");
    hasError = true;
}

if (!selectedDezen) {
    alert("Niste odabrali dezen elementa.");
    hasError = true;
}


if (hasError) {
    return; // Prekini funkciju ako postoji neka greška
}
 /**/
   if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
       document.getElementById('price').innerText = "Niste uneli validne podatke";
       return;
   }

   if (!isValidDimensions(height, width, depth)) {
       document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
       return;
   }

  const priceData = calculatePrice(height, width, depth, shelves);

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

/*document.getElementById('calculate-btn').addEventListener('click', calculate);*/
function calculateHingers(height, width, depth) {
   let message2;
   const porukaSarkeDiv = document.querySelector('.poruka-sarke');

   if (width <= 149) {
       // Ako je širina manja ili jednaka 149cm
       message2 = leftHingesButton.classList.contains('selected') ? 'Leva str' : 'Desna str';
       
   } else {
       // Ako je širina veća od 149cm
       leftHingesButton.classList.add('selected');
       rightHingesButton.classList.add('selected');
       message2 = 'i leva str i desna str';
   porukaSarkeDiv.style.display = 'block';
   porukaSarkeDiv.innerText = "Šarkeeee će biti kreirane i sa leve i sa desne strane zato što širina elementa prelazi 150cm.";
   }

   console.log('Poruka za šarke:', message2);

   return message2;
}
document.getElementById('calculate-btn').addEventListener('click', function() {
   calculate();
   calculateHingers(parseInt(document.getElementById('height').value), parseInt(document.getElementById('width').value), parseInt(document.getElementById('depth').value));
});


// Kreiramo objekat za čuvanje podataka o kuhinji
let kuhinjaData = {
   height: 0,
   width: 0,
   depth: 0,
   price: 0
};

function addToCart(dezeni) {
   const heightInput = document.getElementById('height');
   const widthInput = document.getElementById('width');
   const depthInput = document.getElementById('depth');
   const shelvesInput = document.getElementById('shelves');
   const hingeInput = document.getElementById('hinge-type');
   const itemName = document.getElementById('imeElementa').textContent;
   const itemImageSrc = document.getElementById('slikaKorpusa').getAttribute('src');
   const selectedPatternTitle = document.getElementById('selected-pattern-title');

   const height = parseInt(heightInput.value);
   const width = parseInt(widthInput.value);
   const depth = parseInt(depthInput.value);
   const shelves = parseInt(shelvesInput.value);
   const hinge = parseInt(hingeInput.value);

   if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
       document.getElementById('price').innerText = "Niste uneli validne podatke";
       return;
   }

   if (!isValidDimensions(height, width, depth)) {
       document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
       return;
   }

 const priceData = calculatePrice(height, width, depth, shelves); 

   /*const basePrice = calculatePrice(height, width, depth, shelves); // Osnovna cena bez dezena*/

   const selectedPatternName = selectedPatternTitle.textContent;
   const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);

/*ovan*/
 
   
                                                          
                                                          
   /*const isCrniKorpus = crni.classList.contains('selektovan');
   const isBeliKorpus = beli.classList.contains('selektovan');
   const isSiviKorpus = sivi.classList.contains('selektovan');*/
   const isYesSelected = yesButton.classList.contains('selected');
   const isNoSelected = noButton.classList.contains('selected');
   const isLeftHingeSelected = leftHingesButton.classList.contains('selected');
   const isRightHingeSelected = rightHingesButton.classList.contains('selected');
   const ispolice = police.classList.contains('selected');
   const issarke = sarke.classList.contains('selected');



   /**/

  if (izabraniLesonit === 0) {
    alert("Niste odabrali lesonit.");
    return;
}
   
 
   if (!(isYesSelected || isNoSelected)) {
       alert("Niste odgovorili da li želite da element ima ugradjene nogice'.");
       return;
   }

   if (!(isLeftHingeSelected || isRightHingeSelected)) {
       alert("Niste odabrali stranu šarki.");
       return;
   }

   if (!selectedDezen) {
       alert("Niste odabrali dezen elementa.");
       return;
   }
   if (!ispolice) {
    alert("Niste odabrali broj polica.");
    return;
}
if (!issarke) {
  alert("Niste odabrali vrstu sarki.");
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
    const answer = yesButton.classList.contains('selected') ? 'Da' : 'Ne';
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
              shelves: shelves,
              hinge: hinge,
           totalSurface: priceData.totalSurface, // Dodaj ukupnu površinu
            totalSurfaceInSquareMeters: priceData.totalSurfaceInSquareMeters, // Dodaj površinu u m²
           dezen: selectedDezen.name, // Dodajte ime dezena
               korpusDezen: selectedDezenKorpusName,
           message: recommendedFrontDimensions.message,
           answer: answer,
           hinges: /*selectedHinges*/calculateHingers(height, width, depth),
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
 yesButton.addEventListener('click', function () {
   yesButton.classList.add('selected');
   noButton.classList.remove('selected');
   enableKupiButtonIfAnswered();
 });
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
 noButton.addEventListener('click', function () {
   noButton.classList.add('selected');
   yesButton.classList.remove('selected');
   enableKupiButtonIfAnswered();
 });

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

 leftHingesButton.addEventListener('click', () => {
 leftHingesButton.classList.add('selected');
 rightHingesButton.classList.remove('selected');
});

rightHingesButton.addEventListener('click', () => {
 rightHingesButton.classList.add('selected');
 leftHingesButton.classList.remove('selected');
});

police.addEventListener('click', () => {
  police.classList.add('selected');
 });
sarke.addEventListener('click', () => {
  sarke.classList.add('selected');
 });


/*PITANJAAAAAAAAAAAAAAAAAAAAAAAAAAAA */


/*nova verzija1*/
