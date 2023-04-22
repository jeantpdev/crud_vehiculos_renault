(function(){
	var formulario = document.getElementsByName('formulario')[0], elementos = formulario.elements, boton= document.getElementById('btn');

	var validarNombre = function (e){
		if (formulario.nombre.value === ''){
			alert("Digite un nombre");
			e.preventDefault();
		}
	};

	var validarApellido = function (e){
		if (formulario.apellido.value === ''){
			alert("Digite un apellido");
			e.preventDefault();
		}
	};

	var validarNickName = function (e){
		if (formulario.nickname.value === ''){
			alert("Digite tu nickname");
			e.preventDefault();
		}
	};

	var validarPassword = function (e){
		if (formulario.password.value === '' || formulario.password2.value === ''){
			alert("Faltan campos por llenar en contraseñas");
			e.preventDefault();
		}
		else if ( formulario.password.value != formulario.password2.value){
			alert("Las contraseñas no coinciden")
				e.preventDefault();
			}
		
	};

	var validarEmail = function (e){
		if (formulario.email.value === ''){
			alert("Correo electronico necesario");
			e.preventDefault();
		}
	};


	var validar = function(e){
		validarNombre(e);
		validarApellido(e);
		validarPassword(e);
		validarEmail(e);
	};

	formulario.addEventListener("submit",validar);


}())