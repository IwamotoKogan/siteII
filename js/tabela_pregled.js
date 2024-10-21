let krava = document.getElementsByClassName('pregled-tabela');
const savedItems = JSON.parse(localStorage.getItem('items')) || [];

if (savedItems.length > 0) {
    savedItems.forEach((item, index) => {
        const itemDetails = document.createElement('tr');
        itemDetails.className = 'item-details';
        
        // Izračunajte preporučene dimenzije fronta na osnovu unetih dimenzija
        const recommendedFrontDimensions = calculateRecommendedFrontDimensions(item.height, item.width, item.depth);
        
        itemDetails.innerHTML = `
            
            <td class="product-name">
                <h2 class="h5 text-black">Ime elementa</h2>
            </td>
            
            <td class="product-name">cena ${item.price}evra</td>
            
        `;
        krava[0].appendChild(itemDetails); // Uzimamo prvi element iz kolekcije, jer getElementsByClassName vraća kolekciju elemenata

        // Dodajte preporučene dimenzije u lokalno skladište za svaki element
        savedItems[index].recommendedFrontDimensions = recommendedFrontDimensions;
        localStorage.setItem('items', JSON.stringify(savedItems));
    });
} else {
    krava[0].innerHTML = `
        <tr>
            <td class="product-thumbnail">
                <img src="images/empty.png" alt="Image" class="img-fluid">
            </td>
            <td class="product-name">
                <h2 class="h5 text-black">Nemate nijedan element u korpi.</h2>
            </td>
            <hr>
            
        </tr>
    `;
}



let totalCost = 0;
savedItems.forEach(item => {
    totalCost += parseFloat(item.price); // Konvertujemo cenu u broj pre sabiranja
});
const totalCostElement = document.getElementById('ukupna-cena');
totalCostElement.textContent = `Ukupna cena: ${totalCost.toFixed(2)} dinara`; // Formatiramo na 2 decimale
