/*dodato*/
 // Dodajte event listenere za dugmad "Da" i "Ne"
const beli = document.getElementById('white-korpus');
  const crni = document.getElementById('black-korpus');
  const sivi = document.getElementById('gray-korpus');
  const yesButton = document.getElementById('yes-button');
  const noButton = document.getElementById('no-button');
  const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"
  const leftHingesButton = document.getElementById('left-hinges');
const rightHingesButton = document.getElementById('right-hinges');
/*dodato*/
let selectedDezenPrice = 0;
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

/*function calculatePrice(height, width, depth) {
    const basePrice = 1000;
    const increment = 20;
    const limit = 5;

    const heightDifference = height - 90;
    const widthDifference = width - 100;
    const depthDifference = depth - 30;

    const heightPrice = heightDifference >= 0 ? Math.floor(heightDifference / limit) * increment : 0;
    const widthPrice = widthDifference >= 0 ? Math.floor(widthDifference / limit) * increment : 0;
    const depthPrice = depthDifference >= 0 ? Math.floor(depthDifference / limit) * increment : 0;

    const totalPrice = basePrice + heightPrice + widthPrice + depthPrice;
    return totalPrice;
}*/
function calculatePrice(height, width, depth, shelves) {
    const pricePerSquareMeter = 1990; // Cena po kvadratnom metru u dinarima

    // Površine stranica
    const bottomSurface = width * depth; // Donja strana
    const leftSurface = height * depth; // Leva strana
    const rightSurface = height * depth; // Desna strana

    // Površina dve daske na gornjoj strani (svaka daska ima širinu x dubinu 10 cm minus 36 mm)
    const adjustedWidth = width - 3.6; // Oduzimanje 36 mm (3.6 cm)
    const topSurface = 2 * (adjustedWidth * 10);

    // Površina polica (svaka polica ima širinu x (dubina - 18 mm))
    const adjustedDepth = depth - 1.8; // Oduzimanje 18 mm (1.8 cm)
    const shelfSurface = shelves * (width * adjustedDepth);

    // Ukupna površina u cm²
    const totalSurfaceAreaCm2 = bottomSurface + leftSurface + rightSurface + topSurface + shelfSurface;

    // Ukupna površina u m²
    const totalSurfaceAreaM2 = totalSurfaceAreaCm2 / 10000;

    // Dodavanje 10% za otpad
    const totalSurfaceAreaWithWasteM2 = totalSurfaceAreaM2 * 1.10;

    // Cena materijala
    const totalPrice = totalSurfaceAreaWithWasteM2 * pricePerSquareMeter;

    return totalPrice;
}

// Funkcija koja proverava da li su unete vrednosti numeričkog tipa
function isValidNumber(value) {
    return !isNaN(value);
}

// Funkcija koja proverava da li su unete dimenzije unutar dozvoljenog opsega
function isValidDimensions(height, width, depth) {
    const minHeight = 90;
    const maxHeight = 200;
    const minWidth = 100;
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

   const totalPrice = calculatePrice(height, width, depth, shelves) + selectedDezenPrice;
console.log("Total Price:", totalPrice);
    console.log("Selected Dezen Price:", selectedDezenPrice);
    document.getElementById('price').innerHTML = `
    <div class="row mb-5">
		        <div class="col-md-12">
		          <div class="border p-4 rounded text-black" role="alert">
		           <span class="h3">Cena elementa:</span><strong  class="h3">${totalPrice}</strong>
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
	const itemName = document.getElementById('imeElementa').textContent;
	const itemImageSrc = document.getElementById('slikaKorpusa').getAttribute('src');
    const selectedPatternTitle = document.getElementById('selected-pattern-title');

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

    const basePrice = calculatePrice(height, width, depth); // Osnovna cena bez dezena

    const selectedPatternName = selectedPatternTitle.textContent;
    const selectedDezen = dezeni.find(dezen => dezen.name === selectedPatternName);

 /*ovan*/
  
    
                                                           
                                                           
    const isCrniKorpus = crni.classList.contains('selektovan');
    const isBeliKorpus = beli.classList.contains('selektovan');
    const isSiviKorpus = sivi.classList.contains('selektovan');
    const isYesSelected = yesButton.classList.contains('selected');
    const isNoSelected = noButton.classList.contains('selected');
    const isLeftHingeSelected = leftHingesButton.classList.contains('selected');
    const isRightHingeSelected = rightHingesButton.classList.contains('selected');



    if (!(isCrniKorpus || isBeliKorpus || isSiviKorpus)) {
        alert("Odaberite korpus");
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
 /*ovan*/

    if (selectedDezen) {
        // Ako postoji odabrani dezen, ažurirajte cenu sa dezenom
        const totalPrice = basePrice + selectedDezen.price;
        document.getElementById('price').innerText = `Cena: ${totalPrice} evra`;

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
const korpusOdgovor = crni.classList.contains('selektovan') ? 'crni' : beli.classList.contains('selektovan') ? 'beli' : sivi.classList.contains('selektovan') ? 'sivi' : '';

     /*const selectedHinges = leftHingesButton.classList.contains('selected') ? 'Leva str' : 'Desna str';
     pitanjaaaaa */
	    
/*******************************************************KORPUS*************************************************************************/

/*******************************************************KORPUS*************************************************************************/
              const newItem = {
            height: height,
            width: width,
            depth: depth,
            price: totalPrice,//
            dezen: selectedDezen.name, // Dodajte ime dezena
            message: recommendedFrontDimensions.message,
            answer: answer,
            hinges: /*selectedHinges*/calculateHingers(height, width, depth),
            korpusOdgovor: korpusOdgovor,
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
  beli.addEventListener('click', function () {
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
  });

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
  function enableKupiButtonIfKorpus() {
    if (crni.classList.contains('selektovan') || beli.classList.contains('selektovan') || sivi.classList.contains('selektovan')) {
      kupiButton.removeAttribute('disabled');
    } else {
      kupiButton.setAttribute('disabled', 'disabled');
    }
  }

  leftHingesButton.addEventListener('click', () => {
  leftHingesButton.classList.add('selected');
  rightHingesButton.classList.remove('selected');
});

rightHingesButton.addEventListener('click', () => {
  rightHingesButton.classList.add('selected');
  leftHingesButton.classList.remove('selected');
});


/*PITANJAAAAAAAAAAAAAAAAAAAAAAAAAAAA */


/*nova verzija1*/



