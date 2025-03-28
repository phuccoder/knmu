import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const UserGiftModel = sequelize.define(
    "UserGifts",
    {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        GiftId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ClassLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CreatedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        ModifiedDate: {
            type: DataTypes.DATE,
        },
        CreatedBy: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ModifiedBy: {
            type: DataTypes.TEXT,
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        tableName: "UserGifts",
        schema: "RandomName",
        timestamps: false,
    }
);

export default UserGiftModel;