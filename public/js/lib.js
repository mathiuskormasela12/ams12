function showInputAlert(inputAlert, input, textColor, showAlert, inputBorder, text) {
	inputAlert.classList.add(textColor);			
	inputAlert.classList.add(showAlert);
	input.classList.add(inputBorder);
	inputAlert.textContent = text;
}

function hideInputAlert(inputAlert, input, textColor, showAlert, inputBorder) {
	inputAlert.classList.remove(showAlert);
	inputAlert.classList.remove(textColor);
	input.classList.remove(inputBorder);
	inputAlert.textContent = ''
}

function enabledButtonEdit() {
	setInterval(function(){
		if(inputUsername.value.length > 0 && inputEmail.value.length > 0 && inputPassword.value.length > 0 && inputPasswordConfirm.value.length > 0 && inputPassword.value === inputPasswordConfirm.value)
			document.querySelector('button.btn-edit').removeAttribute('disabled');
		else
			document.querySelector('button.btn-edit').setAttribute('disabled', true);
	}, 0);	
}

function enabledButtonEdit2() {
	setInterval(function(){
		if(inputStudentName.value.length > 0 && inputNisn.value.length > 0 && inputBirthPlace.value.length > 0 && inputBirthday.value.length > 0) 
			document.querySelector('button.btn-edit').removeAttribute('disabled');
		else
			document.querySelector('button.btn-edit').setAttribute('disabled', true);
	}, 0);	
}

function removeAlert() {
	const alertEl = document.querySelector('div.alert');
	document.addEventListener('click', function(e) {
		if(e.target.parentElement.parentElement.classList.contains('alert'))
			document.body.removeChild(e.target.parentElement.parentElement);
	})
}

function login() {
	setInterval(function() {
		if(document.querySelector('.alert') === null)
			document.querySelector('.hero').classList.add('hero-normal');
	}, 0)
}

function showButtonAll(buttonShowAll) {
	setInterval(() => {
		if(keywords.value == '') 
			buttonShowAll.style.visibility = ''
	}, 0)


}

function fetchSeveralStudents(keyword) {
	return fetch('/app/search?keyword=' + keyword + '&limit=7')
				.then(res => {
					if(!res.ok) {
						throw new Error('Server Error');
					}
					return res.json()
				})
				.then(res => {
					if(res.results.length < 1) {
						throw new Error('There is not results');
					}
					return res;
				});
}

function fetchAllStudents(keyword) {
	return fetch('/app/search?keyword=' + keyword )
				.then(res => {
					if(!res.ok) {
						throw new Error('Server Error');
					}
					return res.json()
				})
				.then(res => {
					if(res.results.length < 1) {
						throw new Error('There is not results');
					}
					return res;
				});
}

function updateUI(data, keyword) {
	const table = document.getElementById('table');
	table.innerHTML = `${data.map(item => {
		return `<tr>
							<td>${item.no}</td>	
							<td>${item.name}</td>
							<td>${item.nisn}</td>
							<td>${item.grade} - ${item.major_name}</td>
							<td>${item.birthday}</td>
							<td>
								<a href="/uploads/${item.photo}" target="_blank">See Photo</a>
							</td>
							<td>
							 <span class="edit-icon"><i class="fas fa-edit"></i></span>
							 <a href="/edit/${item.id}" class="table-link">Update</a>
							 <span class="delete-icon"><i class="fas fa-trash"></i></span>
							 <a href="/delete/${item.id}" class="table-link">Delete</a>
							</td>
						</tr>
						`
	}).join('')}`;
}
