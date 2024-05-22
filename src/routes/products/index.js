import { Router } from "express";
import productsController from "../../controller/products/index.js";

const productsRouter = Router();

productsRouter.post("/products", productsController.createproducts);
productsRouter.get("/products", productsController.getProducts);
productsRouter.get("/product/:id", productsController.getSingleProduct);
productsRouter.put("/product/:id", productsController.update);
productsRouter.delete("/product/:id", productsController.delete);



export default productsRouter;