function ir() { 
var usuario = "admin"
var contrasenia = "admin"

if (document.form.login.value==usuario && document.form.password.value==contrasenia) {
    alert ("Bienvenido")
    window.location="FrontProd/index.html"}
    else {
    alert('No podes ingresar')
}
}