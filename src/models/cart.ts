import { Model, DataTypes } from 'sequelize';
import db from '.';


interface ICart {
  userId: string;
  products: IProducts[];
  amount: number;
  address: string;
  status: boolean;
}

interface IProducts {
  productId: string;
  quantity: number;
}

class Cart extends Model<ICart> implements ICart {
  public userId!: string;
  public products!: IProducts[];
  public amount!: number;
  public address!: string;
  public status!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db.sequelize,
    tableName: 'cart',
    modelName: 'Cart',
    timestamps: true,
    underscored: false
  }
);

export default Cart;
