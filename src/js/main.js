
$(document).ready(function(){
	$(".page-header__brelok").delay(3000).addClass("page-header__brelok--visible");

	// Slick - слайдеры

	// Слайдер с работами
	$(".projects__item").slick({
		fade: true,
		autoplay: true,
  		autoplaySpeed: 5000,
	});
});