// VALIDAR INICIO DE SESIÓN

const correo = document.getElementById('correo_iniciar_sesion');
const contra = document.getElementById('contrasena_iniciar_sesion');
const iniciarSesion = document.getElementById("iniciarSesion")

// Funcion que verifica campos vacios de EMAIL y CONTRASEÑA
iniciarSesion.onclick = function() { 
	if (correo.value == "" || contra.value == "") {
		correo.classList.add("is-invalid");
		contra.classList.add("is-invalid");
	}else{
		const datos_insertar = {
			correo: correo.value,
			contrasena: contra.value,
		  }
	  
		  axios({
			method: "GET",
			url: "https://elofgzyhnliurwchnmse.supabase.co/rest/v1/usuarios?select=*",
			headers: {
				apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI',
				Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb2ZnenlobmxpdXJ3Y2hubXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE1MDM5NTksImV4cCI6MTk5NzA3OTk1OX0.5zlT7FxiI7bD4as9wzXXKaprjKybRlUJe6Pnao_HhpI'
			  }
		  })
			.then(res => {
				if (res.data[0].usuario == "Saray" && res.data[0].contrasena == "4368"){
					location.href = "paginas/inicio.html";
				}else{
					console.log("el usuario y contraseña no existe papu")
					correo.classList.add("is-invalid");
					contra.classList.add("is-invalid");
				}
			})
			.catch(err => console.log('Error:', err))
	}

}