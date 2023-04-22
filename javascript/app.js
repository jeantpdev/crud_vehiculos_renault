

//___ REGISTRAR UN NUEVO USUARIO
function registrar(){
	/*---------------- Varialbes para autenticar usuario ------------------*/
	var email = document.getElementById('email').value;
	var contrasena = document.getElementById('contrasena').value;
	/*---------------- Variables para registrar en Base de datos FireStone --------------*/
	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var mensaje = document.getElementById('mensajeVerificacion');

	var db = firebase.firestore();
	db.collection("usuarios").add({
	    first: nombre,
	    last: apellido,
	    born: email
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});

	// Initialize Cloud Firestore through Firebase
	/* Metodo de FireBase para crear Usuario*/			
	firebase.auth().createUserWithEmailAndPassword(email, contrasena)

	//SI SE CREO, SE EJECUTA ESTO ( ENVIA EL CORREO )
	.then(function(){
		verificar();
		mensajeVerificacion.innerHTML = '<h1 class = "h1-veri">Hemos mandado un correo de verificación a tu correo</h1>';

	})
	.catch(function(error) {
	  //Errores almacenados en variables
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // Errores mostrados por consola
	  console.log(errorCode);
	  console.log(errorMessage);
	})
} 

// Inicio de sesión de un usuario
function ingresar(){
	/* Se crea una variable y se almacenan sus valores con .value*/
	var email2 = document.getElementById('email2').value;
	var contrasena2 = document.getElementById('contrasena2').value;
	var contenido = document.getElementById('contenido');

	// Metodo de FireBase para ingresar Usuario 
	firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
	.catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  contenido.innerHTML = '<h1 class = "js-h1">email/contraseña no encontrados</h1>';
	  console.log('error codigo: '+errorCode);
	  console.log('error en mensaje: '+errorMessage);
	  // ...
	});
}
//¿Hay algún usuario activo?  VERIFICA TODA INTERACCION DE LA PAGINA

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	  	console.log('usuario activo :D');
	  	aparece(user);
	    // Si hay usuario, mostrará esto
	    var displayName = user.displayName;
	    var email = user.email;

	    console.log('..................................');
	    console.log(user.emailVerified);
		console.log('..................................');	    

	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	    console.log('no existe usuario activo');
	  }
	});
}

observador(); //SOLO DE PRUEBA PARA VER EN CONSOLA EL DESULTADO DE OBSERVADOR

function aparece (user){
	var user = user;
	var contenido = document.getElementById('contenido');
	if (user.emailVerified) {
		contenido.innerHTML = '<h1 class = "js-h1">Usuario encontrado</h1>';
		location.href = "html/register.html";
	}
}

function verificar(){

	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	  console.log('enviando correo...');
	}).catch(function(error) {
	  // An error happened.
	  console.log('Errrorxd');
	});

}
