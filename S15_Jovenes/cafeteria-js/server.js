const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// =====================================
// DATOS DE LA CAFETERÍA
// =====================================

const productos = [
    {
        id: 1,
        nombre: "Café Americano",
        precio: 5000,
        descripcion: "Café preparado con granos seleccionados."
    },
    {
        id: 2,
        nombre: "Capuchino",
        precio: 8000,
        descripcion: "Café con leche espumosa y un toque de canela."
    },
    {
        id: 3,
        nombre: "Torta de Chocolate",
        precio: 7000,
        descripcion: "Deliciosa torta de chocolate para acompañar tu café."
    },
    {
        id: 4,
        nombre: "Croissant",
        precio: 6000,
        descripcion: "Croissant recién horneado."
    }
];

// =====================================
// FUNCIÓN: GENERAR HTML DINÁMICO
// =====================================

function generarListaHTML(items) {

    const filas = items
        .map((producto) => `
            <div class="producto">
                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <strong>
                    $${producto.precio.toLocaleString("es-CO")}
                </strong>

                <br><br>

                <a href="/producto?id=${producto.id}">
                    Ver detalle
                </a>
            </div>
        `)
        .join("");

    return `
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Productos - Cafetería Aroma</title>

            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>

            <header class="encabezado">
                <h1>☕ Cafetería Aroma</h1>
                <p>El mejor café para acompañar tus momentos</p>
            </header>

            <nav class="navegacion">
                <a href="/">Inicio</a>
                <a href="/productos">Nuestros productos</a>
                <a href="/api/productos">API de productos</a>
            </nav>

            <main class="contenedor">

                <section class="bienvenida">
                    <h2>Nuestros productos</h2>

                    <p>
                        Descubre nuestras bebidas y acompañamientos.
                    </p>
                </section>

                <section class="productos">

                    <div class="tarjetas">
                        ${filas}
                    </div>

                </section>

            </main>

            <footer>
                <p>© 2026 Cafetería Aroma</p>
            </footer>

        </body>
        </html>
    `;
}

// =====================================
// SERVIDOR
// =====================================

const servidor = http.createServer((req, res) => {

    const partesUrl = url.parse(req.url, true);
    const ruta = partesUrl.pathname;

    // ---------------------------------
    // RUTA PRINCIPAL
    // ---------------------------------

    if (ruta === "/") {

        const archivo = fs.readFileSync(
            path.join(__dirname, "public", "index.html")
        );

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        res.end(archivo);

    // ---------------------------------
    // ARCHIVOS CSS Y JAVASCRIPT
    // ---------------------------------

    } else if (ruta === "/styles.css") {

        const archivo = fs.readFileSync(
            path.join(__dirname, "public", "styles.css")
        );

        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.end(archivo);

    } else if (ruta === "/calculos.js") {

        const archivo = fs.readFileSync(
            path.join(__dirname, "public", "calculos.js")
        );

        res.writeHead(200, {
            "Content-Type": "application/javascript"
        });

        res.end(archivo);

    // ---------------------------------
    // RUTA: LISTA DE PRODUCTOS
    // ---------------------------------

    } else if (ruta === "/productos") {

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        res.end(generarListaHTML(productos));

    // ---------------------------------
    // RUTA: DETALLE DE PRODUCTO
    // ---------------------------------

    } else if (ruta === "/producto") {

        const idBuscado = Number(partesUrl.query.id);

        const producto = productos.find(
            (p) => p.id === idBuscado
        );

        if (producto) {

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            res.end(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <title>${producto.nombre}</title>
                </head>
                <body>
                    <h1>${producto.nombre}</h1>
                    <p>${producto.descripcion}</p>
                    <p>
                        Precio:
                        $${producto.precio.toLocaleString("es-CO")}
                    </p>
                    <a href="/productos">Volver a productos</a>
                </body>
                </html>
            `);

        } else {

            res.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8"
            });

            res.end(`
                <h1>Producto no encontrado</h1>
                <p>El producto solicitado no existe.</p>
                <a href="/productos">Volver a productos</a>
            `);
        }

    // ---------------------------------
    // BONUS: API JSON
    // ---------------------------------

    } else if (ruta === "/api/productos") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(productos));

    // ---------------------------------
    // ERROR 404
    // ---------------------------------

    } else {

        res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8"
        });

        res.end(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>404 - Página no encontrada</title>
            </head>
            <body>
                <h1>404 - Página no encontrada</h1>
                <p>La ruta que buscas no existe.</p>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);
    }

});

servidor.listen(3000, () => {
    console.log("☕ Cafetería Aroma");
    console.log("Servidor funcionando en http://localhost:3000");
});