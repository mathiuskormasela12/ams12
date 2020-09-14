const keywords = document.getElementById('keyword');
const buttonShowAll = document.querySelector('.table-all');
keywords.addEventListener('keyup', async function() {
		try {
		let students = null;
		if(this.value != '')  {
			students = await fetchAllStudents(this.value);
			buttonShowAll.style.visibility = 'hidden';
		} else {
			students = await fetchAllStudents(this.value);
		}
		updateUI(students.results, this.value);
	} catch(err) {
		console.log(err);
	}
});

showButtonAll(buttonShowAll);
removeAlert();


