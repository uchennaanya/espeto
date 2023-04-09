import { Model, DataTypes, Optional } from 'sequelize';
import db from '.';

interface OrderAttributes {
  id: number;
  userId: string;
  products: string;
  amount: number;
  address: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;


}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: string;
  public products!: string;
  public amount!: number;
  public address!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db.sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: false
  },
);

export default Order;
