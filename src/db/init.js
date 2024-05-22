import SalesModel from "../model/sales/index.js";
import Products from "../model/products/products.js";
import SaleProductModel from "../model/sales/salesProducts.js";


const syncDb = async () => {
    await Products.sync({ alter: true, force: false });
    await SaleProductModel.sync({ alter: true, force: false });
    await SalesModel.sync({ alter: true, force: false });
    
    
}

export default syncDb;