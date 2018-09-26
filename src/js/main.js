
$(document).ready(function(){
	function isVisible(elem){
		var result = elem.getBoundingClientRect().top < (screen.height - 200);
		return result;
	}

	// Появление брелка
	$(".page-header__brelok").delay(5000).addClass("page-header__brelok--visible");

	// Slick - слайдеры

	// Слайдер с работами(компаниями)
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

	// Слайдер с работами(брелками)
	$(".works__list").slick({
		slidesToShow: 6,
		prevArrow: "<button class='works__arrow slider-arrow slider-arrow--prev' title='Предыдущие работы'></button>",
		nextArrow: "<button class='works__arrow slider-arrow slider-arrow--next' title='Следующие работы'></button>",
	});
	
	(function(){
		var sliderBar = document.querySelector(".scroll-bar");
		var sliderArrowHeight = document.querySelector(".scroll-bar__arrow--top").clientHeight;
		var amountSliderArrows = 2;
		var sliderControl = document.querySelector(".scroll-bar__slider");
		var shiftCoords, coordY, directionCoord, oldCoordY, shiftTicCoord = 0;
		var textBlock = document.querySelector(".adv-text__text");
		var visualBlock = document.querySelector(".adv-text__content");

		var HIDDEN_TEXT_HEIGHT = textBlock.clientHeight;
		var SLIDER_BAR_HEIGHT = sliderBar.clientHeight - (amountSliderArrows * sliderArrowHeight);
		var SLIDER_HEIGHT = sliderControl.clientHeight;
		var MAX_COORD_Y = sliderBar.clientHeight - sliderArrowHeight - SLIDER_HEIGHT;
		var MIN_COORD_Y = sliderArrowHeight;
		var oneTransformTic = HIDDEN_TEXT_HEIGHT / SLIDER_BAR_HEIGHT;

		var onSliderControlMouseMove = function(e){
			// Перемещение текста 
			directionCoord = e.clientY - oldCoordY;
			if(directionCoord < 0){
				shiftTicCoord = shiftTicCoord + oneTransformTic;
			} else {
				shiftTicCoord = shiftTicCoord - oneTransformTic;
			}
			if(textBlock.getBoundingClientRect().bottom <= visualBlock.getBoundingClientRect().bottom + 10){
				shiftTicCoord = -(HIDDEN_TEXT_HEIGHT - visualBlock.clientHeight);
			} else if(shiftTicCoord >= 0){
				shiftTicCoord = 0;
			}

			textBlock.style.transform = "translateY(" + shiftTicCoord + "px)";

			// Перемещение слайдера
			shiftCoords = e.clientY - sliderBar.getBoundingClientRect().top - (SLIDER_HEIGHT / 2);
			// Ограничение выхода слайдера
			if(shiftCoords >= MAX_COORD_Y - 5){
				shiftCoords = MAX_COORD_Y - 5;
			} else if(shiftCoords <= MIN_COORD_Y){
				shiftCoords = MIN_COORD_Y;
			}

			sliderControl.style.transform = "translate(-50%," + shiftCoords + "px)";
			oldCoordY = e.clientY;

		}

		var onSliderControlMouseUp = function(e){
			document.removeEventListener("mousemove", onSliderControlMouseMove);
			document.removeEventListener("mouseup", onSliderControlMouseUp);
		}

		var onSliderControlMouseDown = function(e){
			document.addEventListener("mousemove", onSliderControlMouseMove);
			document.addEventListener("mouseup", onSliderControlMouseUp);
		}



		sliderControl.addEventListener("mousedown", onSliderControlMouseDown);
	})();
});