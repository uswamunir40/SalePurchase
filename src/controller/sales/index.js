import SalesModel from "../../model/sales/index.js";
import SaleProductModel from "../../model/sales/salesProducts.js";
import Products from "../../model/products/products.js"


const salesController = {

    getAll: async (req, res) => {
        try {
            const sales = await SalesModel.findAll({
                order: [["createdAt", "DESC"]],
                limit: 5
            });
            res.status(200).json({ message: "Sales are: ", sales });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getSingle: async (req, res) => {

        try {
            const { id } = req.params;

            const sale = await SalesModel.findByPk(id, {
                include: [{
                    model: SaleProductModel,
                    include: [{
                        model: Products,
                        attributes: ['productName']
                    }]
                }]
            });

            if (!sale) {
                return res.status(404).json({ message: `Sale not found of this ${id} id.` })
            }
            res.status(200).json({ message: "Sales are: ", sale });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }

    },
    getSingleSaleProduct: async (req, res) => {

        try {
            const { id } = req.params;

            const sale = await SaleProductModel.findByPk(id, {
                include: [Products]
            })
            if (!sale) {
                return res.status(404).json({ message: `Sale not found of this ${id} id.` })
            }
            res.status(200).json({ message: "Sales are: ", sale });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }

    },

  

    createSales: async (req, res) => {
        try {
            const payload = req.body;
            const sale = new SalesModel();
            const salesProduct = [];

            const totalAmount = payload.salesProducts.reduce((sum, product) => {
                return sum + (product.rate * product.productQuantity);
            }, 0);
            sale.totalAmount = totalAmount;
            await sale.save();

            console.log("request", payload);



            
            for (let index = 0; index < payload.salesProducts.length; index++) {
                const ele = payload.salesProducts[index];

                const product = await Products.findByPk(ele.ProductId);
                if (ele.productQuantity > ele.stock) {
                    return res.status(400).json({
                        message: "The product " + product.name + " has in-sufficient stock",
                    });
                }

                salesProduct.push({
                    ...ele,
                    SaleId: sale.id,
                });
                
            }



            await SaleProductModel.bulkCreate(salesProduct);

            res.status(200).json({ message: "sale created", sale });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }



    },



}







export default salesController;
