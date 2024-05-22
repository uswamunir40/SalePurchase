import { Router } from "express";
import saleProductsController from "../../controller/saleProducts/index.js";

const saleProductsRouter = Router();
// saleProductsRouter.get("/saleProducts", saleProductsController.getsaleProducts);
saleProductsRouter.get("/saleProduct/:id", saleProductsController.getSingleSaleProduct);




export default saleProductsRouter;