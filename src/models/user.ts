import { Model, DataTypes } from 'sequelize';
import db from '.';

// Define your user model
interface IUserAttributes {
    id: number;
    userName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
    public id!: number;
    public userName!: string;
    public email!: string;
    public password!: string;
    public isAdmin!: boolean;

    // Define any additional properties or methods here
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: db.sequelize, // Your Sequelize instance
    modelName: 'User', // The name of your model
    tableName: 'users', // The name of your table
    timestamps: true,
    underscored: false
});

export default User;
