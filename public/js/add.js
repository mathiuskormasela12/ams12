const inputStudentName = document.querySelector('.controls:nth-child(1) input');
inputStudentName.addEventListener('keyup', function() {
	if(this.value.length < 2) 
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'Student Name  must be longer than 2 words');
	else 
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputNisn = document.querySelector('.controls:nth-child(2) input');
inputNisn.addEventListener('keyup', function() {
	if(this.value.length > 5 || this.value.length < 5) 
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'NISN length must be 5 numbers');
	else
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputBirthPlace = document.querySelector('.controls:nth-child(5) input');
inputBirthPlace.addEventListener('keyup', function() {
	if(this.value.length < 0 || this.value === '')
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'Birth Place must be filled');
	else
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputBirthday = document.querySelector('.controls:nth-child(6) input');
inputBirthday.addEventListener('keyup', function(){
	if(this.value.length < 1 || this.value === '')
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', "Birthday must be filled");
	else
		 hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

removeAlert();
enabledButtonEdit2();




