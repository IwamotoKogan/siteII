function calculateRecommendedFrontDimensions(height, width, depth) {
    const recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
    const recommendedWidth = width - 0.4; // Smanjite širinu za 4mm
    return { recommendedHeight, recommendedWidth };
}
const kuhinjaDetailsDiv1 = document.getElementById('kuhinja-details');
const savedItems = JSON.parse(localStorage.getItem('items')) || [];
const kuhinjaData = JSON.parse(localStorage.getItem('kuhinjaData')); // Dodajte ovu liniju

if (savedItems.length > 0) {
    
    savedItems.forEach((item, index) => {
        const itemDetails = document.createElement('tr');
        itemDetails.className = 'item-details';
        
        // Izračunajte preporučene dimenzije fronta na osnovu unetih dimenzija
        const recommendedFrontDimensions = calculateRecommendedFrontDimensions(item.height, item.width, item.depth);
        
        itemDetails.innerHTML = `
 <td class="product-thumbnail ">
                <img src="${item.itemImageSrc}" alt="Image" class="img-fluid">
                <div class="button-group">
                    <button type="button" class="btn btn-danger delete-button custom-delete-button" data-index="${index}" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-trash fa-lg"></i></button>
                    <button type="button" class="btn btn-info details-button custom-details-button" data-index="${index}" data-toggle="modal" data-target="#detailsModal"><i class="fa-sharp fa-solid fa-magnifying-glass-plus fa-lg"></i></button>
                </div>
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">${item.itemName}</h2>
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">H: <span class="highlight">${item.height}cm</span> W: <span class="highlight">${item.width}cm</span> D: <span class="highlight">${item.depth}cm</span></h2>
            </td>
            
            <td class="product-name ">cena<strong> <span class="highlight">${item.price}</span></strong>  din.</td>
            
            <td class="product-name ">
                
            </td>
   
        `;
        kuhinjaDetailsDiv1.appendChild(itemDetails);

        /*dodato*/
        // Dodajte preporučene dimenzije u lokalno skladište za svaki element
    savedItems[index].recommendedFrontDimensions = recommendedFrontDimensions;
    localStorage.setItem('items', JSON.stringify(savedItems));
        /*dodato*/
    });
} else {
    kuhinjaDetailsDiv1.innerHTML = `
    <tr>
            <td class="product-thumbnail">
                <img src="images/empty.png" alt="Image" class="img-fluid">
            </td>
            <td class="product-name">
                <h2 class="h5 text-black">Nemate nijedan element u korpi.</h2>
            </td>
            <td>$00.00</td>
            <td>
                prazno
            </td>
            <td>prazno</td>
            <td><a href="#" class="btn btn-black btn-sm"></a></td>
        </tr>
    `;
}


// JavaScript kod za prikazivanje/sakrivanje popup prozora
//const orderButton = document.getElementById('order-button');
const popup = document.getElementById('popup');




/**delete button************* */



// Dohvatimo sva dugmad "Izbriši"
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Prikazujemo modalni prozor kada korisnik klikne "Izbriši"
        
      

        // Obrada klika na dugme "Da"
        const deleteYesButton = document.getElementById('deleteYes');
        deleteYesButton.addEventListener('click', function () {
            // Ovde treba da dodate logiku za brisanje elementa
           
            location.reload();
            // Implementirajte brisanje elementa iz liste (savedItems)
            const itemIndex = parseInt(button.getAttribute('data-index'));
            if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < savedItems.length) {
        savedItems.splice(itemIndex, 1); // Uklonite element iz niza
        localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište
    }
            // Sakrijte modalni prozor nakon brisanja
              
        });

        // Obrada klika na dugme "Ne"
        const deleteNoButton = document.getElementById('deleteNo');
        deleteNoButton.addEventListener('click', function () {
            // Samo sakrijemo modalni prozor
            hideDeleteModal();
        });
    });
});



/**delete button************* */



/*sumiranje cena svih elemenata */
/*let totalCost = 0;
savedItems.forEach(item => {
    totalCost += item.price;
});
const totalCostElement = document.getElementById('total-cost');
totalCostElement.textContent = `Ukupna cena: ${totalCost} evra`;*/


let totalCost = 0;
savedItems.forEach(item => {
    totalCost += parseFloat(item.price); // Konvertujemo cenu u broj pre sabiranja
});
const totalCostElement = document.getElementById('total-cost');
totalCostElement.textContent = `Ukupna cena: ${totalCost.toFixed(2)} evra`; // Formatiramo na 2 decimale


/*sumiranje cena svih elemenata */












/*DODATO BRISANJE ZA SUBMITOVANJEeeeEEE NASTAVITI DALJE HOSTOVATI OVO NA GITHUB I VIDETI DA LI RADI**********
*****************************************************************/
/**************************************PROCITATI GORE*********************************************************/
// Funkcija za brisanje elementa iz korpe
function deleteItem(index) {
    savedItems.splice(index, 1); // Uklonite element iz niza
    localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište

    // Ovde možete dodati kod za osvežavanje prikaza korpe ili bilo koji drugi odgovarajući korak
    location.reload(); // Osveži stranicu kako bi se prikaz korpe ažurirao
}


/**************************************************vise detalja************************************************************************/
// Dohvatimo sva dugmad "Detalji"
const detailsButtons = document.querySelectorAll('.details-button');
detailsButtons.forEach(button => {
    button.addEventListener('click', function () {
        const itemIndex = parseInt(button.getAttribute('data-index'));
        if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < savedItems.length) {
            const item = savedItems[itemIndex];
            const detailsModalBody = document.getElementById('detailsModalBody');
            detailsModalBody.innerHTML = `
                <p><strong>Visina:</strong> ${item.height}cm</p>
                <p><strong>Širina:</strong> ${item.width}cm</p>
                <p><strong>Dubina:</strong> ${item.depth}cm</p>
                <p><strong>Dezen:</strong> ${item.dezen}</p>
                <p><strong>Front:</strong> ${item.message}cm</p>
                <p><strong>Šarke:</strong> ${item.hinges}</p>
                <p><strong>Potrebne nogice:</strong> ${item.answer}</p>
                <p><strong>Cena:</strong> ${item.price} evra</p>
                <p><strong>Dezen korpusa:</strong> ${item.korpusOdgovor} </p>
                
            `;
        }
    });
});

/**************************************************vise detalja*************************************************************************/
