import SalesModel from "../../model/sales/index.js";
import SaleProductModel from "../../model/sales/salesProducts.js";
import Products from "../../model/products/products.js"


const saleProductsController = {
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

}

export default saleProductsController;


