
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
		if($(window).width() <= 425){
			speed = 0;
		}
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
		var ARROWS_PER_CLICK_SPEED = 5;

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
				shiftCoords = shiftCoords + ARROWS_PER_CLICK_SPEED;
			} else if(e.target.classList.contains("scroll-bar__arrow--top")){
				shiftCoords = shiftCoords - ARROWS_PER_CLICK_SPEED;
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

		var onVisualBlockMouseWheel = function(e){
			var delta = e.deltaY || e.detail || e.wheelDelta;
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);

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

		visualBlock.addEventListener("mousewheel", onVisualBlockMouseWheel);
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
				breakpoint: 450,
				settings: "unslick"
			}
		]
	});

	// Слайдер форм при рассчете стоимости
	$(".cost__shapes").slick({
		slidesToShow: 9,
		centerMode: true,
		centerPadding: '0px',
		focusOnSelect: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1050,
				settings: {
					slidesToShow: 7
				}
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 670,
				settings: {
					slidesToShow: 3,
					arrows: true,
					prevArrow: "<button type='button' class='cost__arrow slider-arrow slider-arrow--prev' title='Предыдущие услуги'></button>",
					nextArrow: "<button type='button' class='cost__arrow slider-arrow slider-arrow--next' title='Следующие услуги'></button>",
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					arrows: true,
					prevArrow: "<button type='button' class='cost__arrow slider-arrow slider-arrow--prev' title='Предыдущие услуги'></button>",
					nextArrow: "<button type='button' class='cost__arrow slider-arrow slider-arrow--next' title='Следующие услуги'></button>",
				}
			}
		]
	});

	// Чекбоксы для рассчета стоимости
	$(".checkbox").not(".checkbox__more").click(function(){
		var $checkboxInput = $(this).find(".checkbox__control");
		var checkboxGroupName = $checkboxInput.attr("name");
		var $checkboxesWithTheSameGroup = $(".checkbox__control[name='" + checkboxGroupName + "']");

		$checkboxesWithTheSameGroup.parent().removeClass("checkbox--checked");

		$(this).addClass("checkbox--checked");

		$(this).on("change", showPrice);

	});

	// Открытие характеристик при нажатии на форму брелка в слайдере при отправке формы 
	$(".params").addClass("params--hidden");
	
	$(".cost__shapes").on("beforeChange", function(){
		$(".params").removeClass("params--hidden");
	});

	//Раскрытие текста Преимущества RFID брелка...
	$(".adv-text__content").click(function(){
		$(this).toggleClass("adv-text__content--hidden");
	});

	// Галерея для наших работ
	$('.works__item').magnificPopup({
	  type: 'image',
	  gallery:{
	    enabled:true,
	    showCloseBtn: false,
	    tCounter: '',
	    tPrev: 'Предыдущая работа', // title for left button
  		tNext: 'Следующая работа', // title for right button
	    arrowMarkup: '<button title="%title%" type="button" class="works__mfp-arrow slider-arrow slider-arrow--%dir%"></button>' 
	  }
	});

	//Вовращение в начало страницы(на самый верх)
	$('.return-back').click(function() {
		var elemPath = $(this).attr("href");
		var topCoords = $(elemPath).offset().top;
    	$('html, body').animate({scrollTop: topCoords}, 800);
  		return false;
    });

	// Перечисление сообщений(об отправке, ошибках и тд)
    var Message = {
    	NOT_ENOUGH_CONTROLS: "Выберите необходимые параметры для рассчета стоимости(Тип чипа, Кол-во, Размер и тд.)",
    	SENDED: "Данные успешно отправлены! Скоро с Вами свяжется наш менеджер",
    	EMPTY: "Поля формы не могут быть пустыми",
    	INCORRECT_EMAIL: "Введите E-mail в нужном формате",
    	INCORRECT_PHONE: "Введите корректный номер телефона",
    }

    var UserRegExp = {
		PHONE: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/,
		NAME: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
		EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
	}

    var showMessage = function(message, type){
    	type = type || "error";
    	if(type == "error"){
    		$(".notifications__message").css("background", "#f65b25");
    	} else {
    		$(".notifications__message").css("background", "#56de47");
    	}
    	$(".notifications").fadeOut();
    	$(".notifications__text").text(message);
    	$(".notifications").fadeIn().delay(5000).fadeOut();
    }

    window.showPrice = function(){
    	// Кол-во + кол-во одной штуки перемножаются
    	// Если это пункт "Другое"
    	var amount = $(".checkbox--checked[data-amount]").attr("data-amount");
    	var pricePerItem = $(".checkbox--checked[data-" + amount + "]").attr("data-" + amount);
    	var generalPrice = parseInt(amount) * parseInt(pricePerItem);

    	if(amount === "Другое"){
    		$(".params__price-descr").removeClass("params__price-descr--price-shown");
    		$(".params__price-descr").text("Наш менеджер свяжется с Вами в ближайшее время");
    	} else if(!amount || !pricePerItem || (!amount && !pricePerItem)) {
    		return;
    	} else {
    		$(".params__price-descr").text(generalPrice + " руб.");
    		$(".params__price-descr").addClass("params__price-descr--price-shown");
    	}
    }

    // Расчет цены
    // Делаем сначала проверку чекбоксов
    // если они заполнены, то переходим к встроенной проверке input'ов
    // с помощью html5
    $(".cost__form-block").submit(function(e){
    	e.preventDefault();
    	// Кол-во групп, содержащих чекбоксы
    	var amountCheckboxesGroups = $(".params__group").has(".checkbox").length;
    	var amountCheckedControls = $(".checkbox--checked").length;
    	var $messageContainer = $(".notifications__text");
    	var error;

    	// Если кол-во групп не соответсвует кол-ву выбранных чекбоксов
    	// Значит какие-то чекбоксы пользователь не выбрал
    	if(amountCheckedControls != amountCheckboxesGroups){
    		showMessage(Message.NOT_ENOUGH_CONTROLS);
    		error = "empty";
    	} 

    	if(!error){
    		// Ajax

    		showMessage(Message.SENDED, "success");
    		$(".cost__input").val("");
    		showPrice();
    		$(".checkbox").removeClass("checkbox--checked");
    		$(".checkbox .checkbox__control").prop("checked", false);
    		$(".cost__contacts-headline, .cost__fields, .cost__send-info").fadeOut();
    	}
    });

    $(".cost__apply-btn").click(function(){
    	$(".params").removeClass("params--hidden");
    });


    // Модуль с перетаскиванием файла
    (function(){
    	var dropZone = document.querySelector(".upload-file"),
    		dropZoneText = document.querySelector(".upload-file__text"),
    		fileInput = document.querySelector(".upload-file__input"),
    		maxFileSize = 1000000;

    	// В случае если не поддерживается 
    	if (typeof(window.FileReader) == 'undefined') {
		    dropZoneText.textContent = 'Не поддерживается браузером!';
		}
		 
		var hightlightDropZone = function(){
    		dropZone.classList.add("upload-file--on-dragenter");
    	}

    	var onDropZoneDragover = function(e){
    		e.preventDefault();
    		hightlightDropZone();
    		return false;
    	}

    	var onDropZoneDragenter = function(e){
    		e.preventDefault();
    		hightlightDropZone();
    		return false;
    	}

    	var onDropZoneDragleave = function(e){
    		e.preventDefault();
    		dropZone.classList.remove("upload-file--on-dragenter");
    		return false;
    	}

    	// Записываем файл в переменную, которую потом добавим в 
    	// FormData 
    	var onDropZoneDrop = function(e){
    		e.preventDefault();
    		var file = e.dataTransfer.files[0];
    		dropZone.classList.remove("upload-file--on-dragenter");
        
			if (file.size > maxFileSize) {
			    dropZoneText.textContent = 'Файл слишком большой!';
			    return false;
			} else {
				window.file = file;
				dropZoneText.textContent = file.name;
			}

    		return false;
    	}

    	// При выборе файла
    	var onInputFileChange = function(e){
    		var fileName = e.srcElement.files[0].name;
    		dropZoneText.textContent = fileName;
    	}

    	dropZone.addEventListener("dragover", onDropZoneDragover);
    	dropZone.addEventListener("dragenter", onDropZoneDragenter);
    	dropZone.addEventListener("dragleave", onDropZoneDragleave);
    	dropZone.addEventListener("drop", onDropZoneDrop);

    	fileInput.addEventListener("change", onInputFileChange);
    })();
});