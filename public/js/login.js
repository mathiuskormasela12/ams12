function start() {
	const input = document.querySelectorAll('input.input');
	setInterval(function(){
		input.forEach(item => {
			if(item.value !== '')
				item.nextElementSibling.classList.add('show-label');
			else
			  item.nextElementSibling.classList.remove('show-label');
		})
	}, 0);
	closeAlert();
	login();
}

function closeAlert() {
	const close = document.querySelector('div.alert > span:last-child');
	document.addEventListener('click', function(e) {
		if(e.target.parentElement.parentElement.classList.contains('alert')) {
			e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('hero-normal');			
			e.target.parentElement.parentElement.parentElement.removeChild(close.parentElement);	
		}
		
	});
}

window.onload = start;
