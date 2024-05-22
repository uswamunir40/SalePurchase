import { Router } from "express";
import salesController from "../../controller/sales/index.js";

const salesRouter = Router();
salesRouter.get("/sales", salesController.getAll);
salesRouter.get("/sale/:id", salesController.getSingle);
// salesRouter.get("/saleProduct/:id", salesController.getSingleSaleProduct);
salesRouter.post("/sales", salesController.createSales);
// salesRouter.put("/saleProduct/:id", salesController.update);




export default salesRouter;