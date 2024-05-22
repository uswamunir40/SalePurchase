import Products from "../../model/products/products.js"

const productsController = {
    getProducts: async (req, res) => {
        try {
            const product = await Products.findAll({
                // where: {
                //     stock: "SE"
                // },
                // order: [["createdAt", "DESC"]],
                // limit: 2
            })
            res.status(200).json({ data: product });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getSingleProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Products.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ data: product });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    createproducts: async (req, res) => {
        try {
            const payload = req.body;
            const product = new Products();
            product.productName = payload.productName,
            product.stock = payload.stock,
            product.price = payload.price

            await product.save();


            res.status(200).json({ message: "product created : ", data: product });
            console.log("product created", payload);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            const Product = await Products.findByPk(id);
            if (!Product) {
                res.status(404).json({ message: "Product not found" });
            }
            if (payload.productName) {
                Product.productName = payload.productName
            }

            if (payload.stock) {
                Product.stock = payload.stock
            }
            if (payload.price) {
                Product.price = payload.price
            }

            await Product.save();



            console.log("updatedData is ", payload);
            res.status(200).json({ message: "Product updated", data: Product });


        }

        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },


    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const product = await Products.findByPk(id);
            if (!product) {
                res.status(404).json({ message: "product not found" });
            }

            await product.destroy();


            console.log(`Product with id ${id} is deleted `);
            res.status(200).json({ message: `Product with id ${id} is deleted `, product });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
}

export default productsController;
