window.onload = dashboardStart;

function dashboardStart() {

	const cardSubtitle = document.querySelectorAll('.card-subtitle');
	
	let i = 0;

	cardSubtitle.forEach(item => {
		const count = parseInt(item.textContent);
		item.textContent = 0;

		let i = 0;
		setInterval(() => {
			if(i < count)
				item.textContent = i++;
			else
				item.textContent = count;
		}, 1)
					
	});

	const burger = document.querySelector('div.burger');
	burger.addEventListener('click', function(){
			const verticalNavbar = document.querySelector('.hero-head');
			verticalNavbar.classList.toggle('show-nav');
	});

	}


