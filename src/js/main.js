
$(document).ready(function(){
	function isVisible(elem){
		var result = elem.getBoundingClientRect().top < (screen.height - 100);
		return result;
	}

	// Появление брелка
	$(".page-header__brelok").delay(5000).addClass("page-header__brelok--visible");

	// Slick - слайдеры

	// Слайдер с работами
	$(".projects__item").slick({
		fade: true,
		autoplay: true,
  		autoplaySpeed: 5000,
	});

	// Параллакс - эффект на блоке с Производством и поставкой
	var yPos = 0;
	var speed = parseInt($(".production").attr("data-speed"));
	var startedPosXOfBg = -200;
	var coords;

	$(window).scroll(function(e){
		yPos = $(window).scrollTop() /  speed;
		var coords = -yPos + startedPosXOfBg + 'px';
		$(".production").css({ backgroundPositionY: coords });
	});

	// Поочередное появление преимуществ
	// Прогрессивное улучшение 
	$(".features__item").addClass("features__item--hidden");

	$(window).scroll(function(e){
		if(isVisible(document.querySelector(".features__list"))){
			$(".features__item").each(function(i) {
			    $(this).delay(1000 * i).removeClass("features__item--hidden");
			});				
		}
	});
});