import ProductDAO from "../dao/products.dao.js";

const productsController = {};

export const getAll = (req, res) => {
    ProductDAO.getAll()
        .then(products => {
            res.render('../src/views/index.ejs', { products }); // Aquí se pasa un objeto con la propiedad 'products'
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

export const getOne = (req, res) => {
    const barcode = req.params.barcode;
    ProductDAO.getOne(barcode)
        .then(product => {
            if (product) {
                res.render("../src/views/edit.ejs", {  product   });
            } else {
                res.json({
                    status: "Product not found"
                });
            }
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

export const insertOne = (req, res) => {
    ProductDAO.insertOne(req.body)
        .then(result => res.redirect('/products/catalogo')) // Redireccionar a la ruta de productos
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}



export const deleteOne = (req, res) => {
    const barcode = req.params.barcode;

    ProductDAO.deleteOne(barcode)
        .then(result => {
            if (result) {
                res.redirect(`/products/edicion`);
            } else {
                res.json({
                    status: "Product not found"
                });
            }
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
};

export const updateOne = (req, res) => {
    const barcode = req.params.barcode;
    const updatedProduct = req.body;
    ProductDAO.updateOne(barcode, updatedProduct)
        .then(result => {
            if (result) {
                res.redirect("/products/edicion");
            } else {
                res.status(404).json({
                    status: "Product not found"
                });
            }
        })
        .catch(err => res.status(500).json({
            status: "Server error"
        }));
};

export const mostrarPaginaInicio = async (req, res) => {
    try {
        const products = await ProductDAO.getAll();
        res.render('../src/views/index.ejs', { products });
    } catch (error) {
        res.json({ status: "Server unavailable" });
    }
};

export const mostrarPaginaCatalogo = async (req, res) => {
    try {
        const products = await ProductDAO.getAll();
        res.render('../src/views/catalogo.ejs', { products });
    } catch (error) {
        res.json({ status: "Server unavailable" });
    }
};

export const mostrarPaginaEdicion = async (req, res) => {
    try {
        const products = await ProductDAO.getAll();
        res.render('../src/views/edicion.ejs', { products });
    } catch (error) {
        res.json({ status: "Server unavailable" });
    }
};
