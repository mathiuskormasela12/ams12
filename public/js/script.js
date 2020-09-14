const inputUsername = document.querySelector('.controls:nth-child(2) input');
inputUsername.addEventListener('keyup', function() {
	if(this.value.length < 5) 
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'Username must be longer than 4 words');
  else if(this.value.match(/[a-z]/g) === null || this.value.match(/\d/g) === null) 
		this.nextElementSibling.textContent = 'Username must be filled letter & number';
	else 
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputEmail = document.querySelector('.controls:nth-child(3) input');
inputEmail.addEventListener('keyup', function() {
	if(!this.value.includes('smkn12jkt.com')) 
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'The email format must be @smkn12jkt.com');
	else
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputPassword = document.querySelector('.controls:nth-child(4) input');
inputPassword.addEventListener('keyup', function() {
	if(this.value.match(/[a-z]/g) === null || this.value.match(/[A-Z]/g) === null || this.value.match(/\d/g) === null)
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', 'The password must consist of upper and lowercase letters and numbers');
	else if(this.value.length < 5)
		this.nextElementSibling.textContent = 'Password must be longer than 4 words';
	else
		hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

const inputPasswordConfirm = document.querySelector('.controls:nth-child(5) input');
inputPasswordConfirm.addEventListener('keyup', function(){
	if(this.value !== inputPassword.value)
		showInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger', "Password don't match");
	else
		 hideInputAlert(this.nextElementSibling, this, 'text-danger', 'show-alert', 'input-danger');
});

removeAlert();
enabledButtonEdit();




