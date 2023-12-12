const { createApp } = Vue
createApp({
    data() {
        return {
            productos: [],
            tipoproductos: [],
            url: 'https://giself.pythonanywhere.com/productos',
            urltipoproducto: 'https://giself.pythonanywhere.com/productos',
            error: false,
            cargando: true,
            /*alta*/
            id: 0,
            nombre: "",
            imagen: "",
            stock: 0,
            precio: 0,
            tipoproducto: 0
        }
    },
    methods: {
        fetchData(url) {
             fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    // esto es para boton modificar
                    this.id = data.id
                    this.nombre = data.nombre;
                    this.imagen = data.imagen
                    this.stock = data.stock
                    this.precio = data.precio
                    this.tipoproducto = data.tipoproducto
                   
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
                
            fetch(this.urltipoproducto)
                .then(response => response.json())
                .then(data => {
                    this.tipoproductos = data;
                    this.cargando = false 
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },
        grabar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabarr")
                })
        },
        modificar() {
            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock-1,
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + location.search.substr(4), options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        },
        async comprar(id) {
            const url = this.url + '/' + id;           
            await fetch(url)
                   .then(response => response.json())
                   .then(data => {
                      
            
                       this.id = data.id
                       this.nombre = data.nombre;
                       this.imagen = data.imagen
                       this.stock = data.stock
                       this.precio = data.precio
                       this.tipoproducto = data.tipoproducto
                      
                   })
                   .catch(err => {
                       console.error(err);
                       this.error = true
                   })

            let producto = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock-1,
                imagen: this.imagen,
                tipoproducto: this.tipoproducto
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url + "/" + id, options)
                .then(function () {
                    //alert("Registro modificado")
                    window.location.href = "./carrito.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
                
            
        }

    },
    created() {
        if (location.search.substr(4) === "") // si no viene de la modificacion
            url = this.url
        else
            url = this.url + "/" + location.search.substr(4)  // para la modificacion
        // si viene de la modificacion le agrego "/<id>" del producto

        this.fetchData(url)
    },
}).mount('#app')
