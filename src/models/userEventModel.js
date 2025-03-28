import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const UserEventModel = sequelize.define(
    "UserEvents",
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
        ReferralCode: {
            type: DataTypes.TEXT,
        },
        TotalReferral: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CurrentRouteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        CurrentRouteIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        IsFinishedEvent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        IsUsedSkippedClass: {
            type: DataTypes.BOOLEAN,
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
        },
    },
    {
        tableName: "UserEvents",
        schema: "RandomName",
        timestamps: false,
    }
);

export default UserEventModel;