$(".product-colors span").click(function () {
				$(".product-colors span").removeClass("active");
				$(this).addClass("active");
				$(".imgBx img").attr('src', $(this).attr("data-pic"));
			});
			(function(window, document, $, undefined) {
    var $slides;

    function activateSlide() {
        var $activeSlide = $slides.not('.active, .last-viewed, .anim-out').first();
        if ($activeSlide.length) {
            $activeSlide.addClass('active');
            $activeSlide.siblings('.slide').removeClass('active anim-in last-viewed').addClass('anim-out');
        }
    }

    function deactivateSlide() {
        var $activeSlide = $slides.filter('.active');
        if ($activeSlide.length) {
            $activeSlide.removeClass('active').addClass('last-viewed');
            $activeSlide.siblings('.slide').removeClass('anim-out').addClass('anim-in');
        }
    }

    $(function() {
        $slides = $('.slide');
        // Pokretanje prve animacije nakon što se stranica učita
        setTimeout(activateSlide, 1000); // 1000 milisekundi = 1 sekunda

        // Ako želite omogućiti korisniku da zatvori aktivni slide i vrati sve u početno stanje
        $slides.find('.btn-close').on('click', deactivateSlide);
    });
})(this, document, jQuery);