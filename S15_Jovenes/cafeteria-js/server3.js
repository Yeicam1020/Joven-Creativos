const url = require("url"); 
if  (req.url.startsWith("/producto")) {
   
const sc_camel_partes_url = url.parse(req.url, true );
const sc_camel_id_buscado = Number(partesUrl.query.id);
const  producto = productos.find((p) => p.id === idBuscado);

   
if  (producto) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>${producto.nombre}</h1>
             <p>Precio: $${producto.precio}</p>`);
  }  
else  {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Producto no encontrado</h1>");
  }
}

servidor.listen(3000);