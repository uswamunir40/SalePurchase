import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SaleProductModel from "../sales/salesProducts.js";

const Products = sequelize.define(
  "Products",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

Products.hasMany(SaleProductModel);
SaleProductModel.belongsTo(Products);

export default Products;
