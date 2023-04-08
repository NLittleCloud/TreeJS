const bt_modal = document.querySelector('.Mydialog_open');
const modal = document.querySelector('.Mydialog');
const bt_pass = document.getElementsByClassName('b01')[1];
const password = document.getElementById("password");
const email = document.getElementById("email");
const error = document.getElementById("error");
const form = document.querySelector('.FormRegistr');

bt_modal.addEventListener('click', () =>{
	modal.showModal();
});

modal.addEventListener('click', (event) => {
	if(event.target == modal) modal.close();
});

bt_pass.addEventListener('pointerdown', () =>{
	password.type = "text"
});

bt_pass.addEventListener('pointerup', () =>{
	password.type = "password"
});

email.onblur = function (){
	if (email.validity.typeMismatch) {
		error.innerHTML = "Please check the entered email!";
		email.setCustomValidity("Please check the entered email!");
	}
	else if (email.validity.valueMissing){
		error.innerHTML = "Please enter email!";
		email.setCustomValidity("Please enter email!");
	}
	else
	{
		error.innerHTML = '';
		email.setCustomValidity("");
	}
}

password.onblur = function (){
	if (password.validity.tooShort) {
		error.innerHTML = "Password must not be less than 6 characters!";
		password.setCustomValidity("Password must not be less than 6 characters!");
	}
	else if (password.validity.valueMissing){
		error.innerHTML ="Please enter password!";
		password.setCustomValidity("Please enter password!");
	}
	else
	{
		error.innerHTML = "";
		password.setCustomValidity("");
	}
}

form.addEventListener("submit", (event) =>{

	let formData = new FormData(form);
	//console.log(Array.from(formData));

	for(let [key, value] of formData){
		console.log(`${key}: ${value}`);
	}

	//console.log(`email: ${formData.get('email')}`);
	//console.log(`password: ${formData.get('password')}`);

	event.preventDefault();
	modal.close();
}) 