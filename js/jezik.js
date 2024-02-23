document.querySelector('.nav1 label').addEventListener('click', function () {
  // Prikazuje sve slike u padajućem meniju
  document.querySelectorAll('.menu li a img').forEach(img => {
      img.style.display = 'inline'; // Menja display slika na inline da bi se ponovo prikazale
  });
});

const languages = {
  sr: {
      "home": "Početna",
      "about": "O nama",
      "products": "Proizvodi",
      "interior": "Enterijer",
      "exterior": "Eksterijer",
      "decor": "Dekor",
      "sanitaryCabins": "Sanitarne Kabine",
      "services": "Usluge",
      "howToFindUs": "Kako do nas",
      "naslov": "Vodeći lider evropskog brenda na domaćem tržištu",
      "years": "Godine poslovanja | 26 godina sa vama",
      "employers": "Broj zaposlenih | 80",
      "clients": "Zadovoljnih klijenata | preko 10.000",
      "projects": "Realizovani projekti | 9+"

  },
  en: {
      "home": "Home",
      "about": "About",
      "products": "Products",
      "interior": "Interior",
      "exterior": "Exterior",
      "decor": "Decor",
      "sanitaryCabins": "Sanitary Cabins",
      "services": "Services",
      "howToFindUs": "How to Find Us",
      "naslov": "Top leader of a European brand in the balcan market",
      "years": "Years in business | 26 years with you",
      "employers": "Number of employees | 80 members",
      "clients": "Satisfied clients | 10,000",
      "projects": "large projects | 9+"
  },
  de: {
      "home": "Startseite",
      "about": "Über uns",
      "products": "Produkte",
      "interior": "Innenraum",
      "exterior": "Außenbereich",
      "decor": "Dekor",
      "sanitaryCabins": "Sanitärkabinen",
      "services": "Dienstleistungen",
      "howToFindUs": "Kontakt",
      "naslov": "Führender Anführer einer europäischen Marke auf dem heimischen Markt",
      "years": "Geschäftsjahre | 26 Jahre mit Ihnen",
      "employers": "Anzahl der Mitarbeiter | 80 treue Kameraden",
      "clients": "Zufriedene Kunden | über 10.000",
      "projects": "groß realisiert Projekte | 9+"
  }
};

document.querySelectorAll('.menu a').forEach(item => {
  item.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedLanguage = this.getAttribute('data-language');

      // Sačuvajte izabrani jezik u localStorage
      localStorage.setItem('selectedLanguage', selectedLanguage);

      changeLanguage(selectedLanguage);
      closeMenuAndDisplaySelectedLanguage(selectedLanguage);
  });
});

// Funkcija za promenu jezika
function changeLanguage(selectedLanguage) {
  document.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      el.textContent = languages[selectedLanguage][key];
  });
}

// Funkcija za zatvaranje menija i prikaz izabranog jezika
function closeMenuAndDisplaySelectedLanguage(selectedLanguage) {
  document.getElementById('menu').checked = false;

  const planetIconSpan = document.querySelector('.nav1 label span');
  if (!planetIconSpan) {
    const newSpan = document.createElement('span');
    newSpan.classList.add('selected-language'); 
    newSpan.textContent = selectedLanguage; // Prikazuje skraćenicu jezika
    document.querySelector('.nav1 label').appendChild(newSpan);
  } else {
    planetIconSpan.textContent = selectedLanguage; // Prikazuje skraćenicu jezika
  }

  document.querySelectorAll('.menu li a img').forEach(img => {
      img.style.display = 'none';
  });
}

// Provera lokalnog skladišta pri učitavanju stranice
document.addEventListener('DOMContentLoaded', () => {
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'sr'; // 'sr' je podrazumevani jezik
  changeLanguage(selectedLanguage);
  closeMenuAndDisplaySelectedLanguage(selectedLanguage);
});
