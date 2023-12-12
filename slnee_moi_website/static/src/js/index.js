odoo.define('slnee_moi_website.home_page', function(require){
    'use strict';
    $( document ).ready(function() {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 3.5,
            spaceBetween: 15,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        if ($('.oe_website_login_container .oe_login_buttons button.btn-primary').length > 0) {
            $('.oe_website_login_container .oe_login_buttons button.btn-primary').text('Log in →');
        }
        if ($('.oe_website_login_container label[for="login"]').length > 0) {
            $('.oe_website_login_container label[for="login"]').hide();
        }
        if ($('.oe_website_login_container label[for="password"]').length > 0) {
            $('.oe_website_login_container label[for="password"]').hide();
        }
        if ($('.oe_website_login_container input[id="login"]').length > 0) {
            $('.oe_website_login_container input[id="login"]').attr('placeholder', 'User Name');
        }
        if ($('.oe_website_login_container input[id="password"]').length > 0) {
            $('.oe_website_login_container input[id="password"]').attr('placeholder', 'Password');
        }

        const labels = document.querySelectorAll(".custom-sidebar .label");

        labels.forEach((label, index) => {
          label.style.transitionDelay = `${index * 50}ms`;
        });

        const sidebarBtn = document.querySelector(".custom-sidebar .sidebar-btn");
        const customSidebar = document.querySelector(".custom-sidebar");

		if (sidebarBtn){
			sidebarBtn.addEventListener("click", () => {
			  customSidebar.classList.toggle("active");
			});
		}

		if ($('#leaves')){
			var leaves = new DataTable('#leaves', {
				columnDefs: [
					{
						orderable: false,
						className: 'select-checkbox',
						targets: 4
					}
				],
//				searching: false,
//				lengthChange: false,
				select: {
					style: 'multi',
					selector: 'td:last-child'
				},
				order: [[1, 'asc']]
			});
			
            $('.select-all').change(function() {
				if ($(this)[0].checked) {
					$(this).closest('table').find('tbody tr').removeClass('selected');
					$(this).closest('table').find('tbody tr').addClass('selected');
				} else {
					$(this).closest('table').find('tbody tr').removeClass('selected');
				}
			});
//			add here

		}
    });
});