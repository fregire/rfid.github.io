
$(document).ready(function(){
	//admittance - допуск(то есть не сразу появляется элемент, как только виден, а через опр. промежуток)
	function isVisible(elem, admittance){
		admittance = admittance || 0;
		var result = elem.getBoundingClientRect().top < (screen.height - admittance);
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
  		arrows: false
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
		if(isVisible(document.querySelector(".features__list"), 200)){
			$(".features__item").each(function(i) {
			    $(this).delay(1000 * i).removeClass("features__item--hidden");
			});				
		}
	});

	// Слайдер с работами(брелками)

	var $slick_slider = $(".works__list");
	var settings = {
		slidesToShow: 6,
		prevArrow: "<button class='works__arrow slider-arrow slider-arrow--prev' title='Предыдущие работы'></button>",
		nextArrow: "<button class='works__arrow slider-arrow slider-arrow--next' title='Следующие работы'></button>",
		responsive: [
					    {
					      breakpoint: 1050,
					      settings: {
					        slidesToShow: 4
					      }
					    },
					    {
					      breakpoint: 800,
					      settings: {
					        slidesToShow: 3
					     }
					    },
					    {
					      breakpoint: 570,
					      settings: {
					        slidesToShow: 2
					     }
					    },
					    {
					      breakpoint: 426,
					      settings: "unslick"
					    }
					    
					    // You can unslick at a given breakpoint now by adding:
					    // settings: "unslick"
					    // instead of a settings object
				  ]
	};
	$slick_slider.slick(settings);
	$(window).on('resize', function() {
	    if ($(window).width() < 426) {
	      if ($slick_slider.hasClass('slick-initialized')) {
	        $slick_slider.slick('unslick');
	      }
	      return
	    }

	    if (!$slick_slider.hasClass('slick-initialized')) {
	      return $slick_slider.slick(settings);
	    }
	});
	// Слайдер с формами брелков
	$(".shape__main-slider").slick({
		slidesToShow: 1,
		prevArrow: "<button class='shape__main-slider-arrow slider-arrow slider-arrow--prev' title='Предыдущие работы'></button>",
		nextArrow: "<button class='shape__main-slider-arrow slider-arrow slider-arrow--next' title='Следующие работы'></button>",
	});
	// Выбор формы брелка и перелистывание к этой форме
	$(".shape__item").click(function(){
		var index = $(this).attr("data-index");
		$(".shape__main-slider").slick("slickGoTo", parseInt(index));
	});

	$(".applying__expand-btn").click(function(){
		$(this).parent().toggleClass("applying__content--hidden");
	});


	// Ползунок для текста
	(function(){
		var sliderBar = document.querySelector(".scroll-bar");
		var sliderArrowHeight = document.querySelector(".scroll-bar__arrow--top").clientHeight;
		var amountSliderArrows = 2;
		var sliderControl = document.querySelector(".scroll-bar__slider");
		var shiftCoords = 0, coordY, directionCoord, oldCoordY, shiftTicCoord = 0;
		var textBlock = document.querySelector(".adv-text__text");
		var visualBlock = document.querySelector(".adv-text__content--hidden");

		var HIDDEN_TEXT_HEIGHT = textBlock.clientHeight;
		var SLIDER_BAR_HEIGHT = sliderBar.clientHeight - (amountSliderArrows * sliderArrowHeight);
		var SLIDER_HEIGHT = sliderControl.clientHeight;
		var MAX_COORD_Y = sliderBar.clientHeight - sliderArrowHeight * 2 - SLIDER_HEIGHT;
		var MIN_COORD_Y = 0;
		var oneTransformTic = HIDDEN_TEXT_HEIGHT / SLIDER_BAR_HEIGHT;
		var MOUSE_WHEEL_SPEED = 5;

		var onSliderControlMouseMove = function(e){
			// Перемещение текста 
			directionCoord = e.clientY - oldCoordY;

			// Перемещение слайдера
			shiftCoords = e.clientY - sliderBar.getBoundingClientRect().top - (SLIDER_HEIGHT / 2);
			// Ограничение выхода слайдера
			if(shiftCoords >= MAX_COORD_Y - 5){
				shiftCoords = MAX_COORD_Y - 5;
			} else if(shiftCoords <= MIN_COORD_Y){
				shiftCoords = MIN_COORD_Y;
			}

			// Перемещение текста
			shiftTicCoord = -(shiftCoords * oneTransformTic);
			textBlock.style.transform = "translateY(" + shiftTicCoord + "px)";

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

		var onScrollArrowsClick = function(e){
			if(e.target.classList.contains("scroll-bar__arrow--bottom")){
				//shiftCoords++;
				shiftCoords = shiftCoords + 5;
			} else if(e.target.classList.contains("scroll-bar__arrow--top")){
				shiftCoords = shiftCoords - 5;
			}

			if(shiftCoords >= MAX_COORD_Y - 5){
				shiftCoords = MAX_COORD_Y - 5;
			} else if(shiftCoords <= MIN_COORD_Y){
				shiftCoords = MIN_COORD_Y;
			}


			shiftTicCoord = -(shiftCoords * oneTransformTic);
			textBlock.style.transform = "translateY(" + shiftTicCoord + "px)";

			sliderControl.style.transform = "translate(-50%," + shiftCoords + "px)";
		}

		var scrollArrows = document.querySelectorAll(".scroll-bar__arrow");
		for(var i = 0; i < scrollArrows.length; i++){
			scrollArrows[i].addEventListener("click", onScrollArrowsClick);
		}

		//TODO: Сделать при наведении на видимый блок обработчик
		var onVisualTextMouseWheel = function(e){
			var delta = e.deltaY || e.detail || e.wheelDelta;
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			console.log(delta);
			if(delta <= 0){
				shiftCoords = shiftCoords - MOUSE_WHEEL_SPEED;
			} else {
				shiftCoords = shiftCoords + MOUSE_WHEEL_SPEED;
			}

			if(shiftCoords >= MAX_COORD_Y - 5){
				shiftCoords = MAX_COORD_Y - 5;
			} else if(shiftCoords <= MIN_COORD_Y){
				shiftCoords = MIN_COORD_Y;
			}

			shiftTicCoord = -(shiftCoords * oneTransformTic);
			textBlock.style.transform = "translateY(" + shiftTicCoord + "px)";

			sliderControl.style.transform = "translate(-50%," + shiftCoords + "px)";
		}

		textBlock.addEventListener("mousewheel", onVisualTextMouseWheel);
	})();


	// Попап окно
	$(".popup__close-btn").click(function(){
		$(".popup").fadeOut();
		$("html").removeClass("popup-opened")
	});

	$(".js-open-popup").click(function(){
		$(".popup").fadeIn();
		var screenName = $(this).closest("[data-screen]").attr("data-screen") || "Обычная заявка";
		$(".popup__input[type='hidden']").val(screenName);
		$("html").addClass("popup-opened");
	});

	// Появление блока с акцией
	$(".sale").addClass("sale--hidden");
	$(window).scroll(function(){
		if(isVisible(document.querySelector(".sale"))){
			$('.sale').removeClass("sale--hidden");
		}
	});

	// Открытие/закрытие блока с текстом Производство и поставка...
	$(".production__text").click(function(){
		$(this).toggleClass("production__text--hidden")
	});

	// Слайдер с услугами 
	$(".services__list").slick({
		mobileFirst: true,
		slidesToShow: 1,
		prevArrow: "<button class='services__arrow slider-arrow slider-arrow--prev' title='Предыдущие услуги'></button>",
		nextArrow: "<button class='services__arrow slider-arrow slider-arrow--next' title='Следующие услуги'></button>",
		responsive: [
			{
				breakpoint: 425,
				settings: "unslick"
			}
		]
	});

	$(".cost__shapes").slick({
		slidesToShow: 9,
		centerMode: true,
		centerPadding: '0px',
		focusOnSelect: true,
		arrows: false
	});

	// Чекбоксы для рассчета стоимости
	$(".checkbox").not(".checkbox__more").click(function(){
		var $checkboxInput = $(this).find(".checkbox__control")
		var checkboxGroupName = $checkboxInput.attr("name");
		var $checkboxesWithTheSameGroup = $(".checkbox__control[name='" + checkboxGroupName + "']");

		$checkboxesWithTheSameGroup.parent().parent().removeClass("checkbox--checked");
		$checkboxesWithTheSameGroup.prop("checked", false);

		$(this).addClass("checkbox--checked");
		$checkboxInput.prop("checked", true);
	})
});