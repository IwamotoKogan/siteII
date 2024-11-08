/*izmena*/

const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"

/*dodato*/
let selectedDezenPrice = 0;
let selectedDezenKant = 0;
let dezeni = [];

document.addEventListener('DOMContentLoaded', function () {
    const kupiButton = document.getElementById('kupi-btn'); // Pretpostavljam da postoji dugme "Kupi"
    const calculateButton = document.getElementById('calculate-btn');
    
    // Funkcija za izračunavanje cene
    function calculatePrice() {
        if (!selectedDezenPrice || selectedDezenPrice === 0) {
            document.getElementById('price').innerText = "Molimo vas odaberite dezen.";
            return NaN;
        }

        // Pretpostavka: squareMeters je uvek 1, budući da je konstanta u vašoj aplikaciji
        const worktopSurface = 1 * worktopWidth;
        const finalPrice = worktopSurface * selectedDezenPrice;
        
        return finalPrice.toFixed(2);
    }

    function calculate() {
        const finalPrice = calculatePrice();

        if (!isNaN(finalPrice)) {
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
    }

    // Event listener za dugme "Izračunaj cenu"
    calculateButton.addEventListener('click', calculate);

    // Event listener za dugme "Kupi" koji poziva funkciju addToCart
    kupiButton.addEventListener('click', function() {
        addToCart(dezeni);
    });
});

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
 
