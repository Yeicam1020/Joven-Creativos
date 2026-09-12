/*const http = require("http"); 
const servidor2 = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(
    "<h1>Mi proyecto desde el servidor</h1>" +
    "<p>Esta página la generó Node</p>"
  );
});

servidor2.listen(3000);
*/

const  productos = [
  { id: 1, nombre: "Producto A", precio: 25000 },
  { id: 2, nombre: "Producto B", precio: 40000 },
  { id: 3, nombre: "Producto C", precio: 15000 },
];


const http = require("http"); 
const servidor = http.createServer((req, res) => {
   
if  (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Inicio</h1>");
}  
else if  (req.url === "/nosotros") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Nosotros</h1>");
}  
else if (req.url === "/servicios") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Servicios</h1>");
}
else if  (req.url === "/productos") {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(generarListaHTML(productos));
}
if (producto) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>${producto.nombre}</h1>
             <p>Precio: $${producto.precio}</p>`);
} 
else  {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Página no encontrada</h1>");
}
});

servidor.listen(3000);





function  generarListaHTML(items) {
   
const  filas = items
    .map((p) => `<li>${p.nombre} - $${p.precio}</li>`)
    .join("");

   
return  `
    <html>
      <body>
        <h1>Nuestros productos</h1>
        <ul>${filas}</ul>
      </body>
    </html>
  `;
}
