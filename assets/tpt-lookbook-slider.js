/**
 * Lookbook
 */

if (!customElements.get("tpt-lookbook-slider")) {
	class LookBookSlider extends HTMLElement {
		constructor() {
			super();
			const docWidth = document.body.offsetWidth;
			const productSlider = this.querySelector('tpt-slider-product .swiper');
			const optionString = this.querySelector('tpt-slider-options').innerHTML;
			const optionsJson = JSON.parse(optionString);
			const dotsLookBook = this.querySelectorAll('tpt-lookbook-button');
			const sliderProductWrapper = this.querySelector('.lookbook-slider_product-wrapper');
	
			this.swiper = new Swiper(productSlider, {
				...optionsJson,
				navigation: {
					nextEl: this.querySelector('.swiper-button-next'),
					prevEl: this.querySelector('.swiper-button-prev'),
				},
				pagination: {
					el: this.querySelector('.swiper-paginations'),
					clickable: true,
				},
			});
	
			dotsLookBook.forEach((dotLookBook) => {
				dotLookBook.addEventListener('click', this.activeItemSlider.bind(this));
				dotLookBook.addEventListener('keypress', this.keyPress.bind(this));
			});

			if(sliderProductWrapper){
				sliderProductWrapper.addEventListener('click', this.closingModal.bind(this))
			}
		}
	
		keyPress(event) {
			if (event.key === 'Enter') {
				this.activeItemSlider(event);
			}
		}
	
		activeItemSlider(event) {
			const docWidth = document.body.offsetWidth;
			const dotButton = event.target;
			const sliderProductWrapper = this.querySelector('.lookbook-slider_product-wrapper');
	
			if (docWidth < 768) {
				if (!dotButton.closest('tpt-lookbook-item').querySelector('.lookbook-item-dropdown')) {
					const lookbookItem = dotButton.closest('tpt-lookbook-item');
					const checkActive = lookbookItem.classList.contains('active');
					dotButton.closest('tpt-lookbook-item').classList.add('loading');
					
					document.querySelectorAll('tpt-lookbook-item').forEach((lookbookItem) => {
						lookbookItem.classList.remove('active');
					});

					if (checkActive) {
						lookbookItem.classList.remove('active');
					}else{
						lookbookItem.classList.remove('loading');
						lookbookItem.classList.add('active');
					}
				} else {
					if (dotButton.closest('tpt-lookbook-item').classList.contains('active')) {
						dotButton.closest('tpt-lookbook-item').classList.remove('active');
					} else {
						document.querySelectorAll('tpt-lookbook-item').forEach((lookbookItem) => {
							lookbookItem.classList.remove('active');
						});
						dotButton.closest('tpt-lookbook-item').classList.add('active');
					}
				}

				if(sliderProductWrapper){
					const checkSliderProductWrapperActive = sliderProductWrapper.classList.contains('active');
					if (checkSliderProductWrapperActive) {
						sliderProductWrapper.classList.remove('active');
					}else{
						sliderProductWrapper.classList.add('active');
					}

					const lookbookItems = sliderProductWrapper.querySelectorAll(".swiper-slide.product-item");
					
					lookbookItems.forEach((item, index)=> {
						if(dotButton.getAttribute("data-product-id") === item.getAttribute("data-product-id")){
							this.swiper.slideTo(parseInt(index));
						}
					})
				}

			} else {
				const index = event.target.getAttribute('data-slide-index');
	
				if (index) {
					this.swiper.slideTo(parseInt(index) - 1);
				}
			}
		}

		closingModal(event){
			if(event.target.classList.contains("lookbook-slider_product-wrapper") && event.target.classList.contains("active")){
				event.target.classList.remove("active")
			}
		}
	}
	
	customElements.define('tpt-lookbook-slider', LookBookSlider);
}
