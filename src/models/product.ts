import { DataTypes, Model, Optional } from "sequelize";
import db from ".";


interface ProductAttributes {
  id: number;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number;
  public title!: string;
  public desc!: string;
  public img!: string;
  public categories!: string[];
  public size!: string[];
  public color!: string[];
  public price!: number;
  public inStock!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    sequelize: db.sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
    underscored: false
  }
);

export default Product;
