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
                <img src="images/product-3.png" alt="Image" class="img-fluid">
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Ime elementa</h2>
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Visina: ${item.height}cm širina: ${item.width}cm dubina: ${item.depth}cm</h2>
            </td>
            <td class=" ">Izabrani dezen:<strong>${item.dezen}</strong></td>
            <td class=" ">
               Front: ${item.message}cm
            </td>
            <td class="product-name ">
                <h2 class="h5 text-black">Pozicija šarki? ${item.hinges}</h2>
                <h2 class="h5 text-black">Potrebne nogice? ${item.answer}</h2>
            </td>
            <td class="product-name ">cena vašeg elementa je<strong> ${item.price}</strong>  evra</td>
               
<button type="button" class="btn btn-danger delete-button custom-delete-button" data-index="${index}" data-toggle="modal" data-target="#exampleModalCenter">
 Izbriši
</button>


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
let totalCost = 0;
savedItems.forEach(item => {
    totalCost += item.price;
});
const totalCostElement = document.getElementById('total-cost');
totalCostElement.textContent = `Ukupna cena: ${totalCost} evra`;

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


