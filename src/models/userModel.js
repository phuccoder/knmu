import { DataTypes } from "sequelize";
import sequelize from "../config/db/db.js";

const UserModel = sequelize.define(
  "Users",
  {
    Id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CharacterId: {
      type: DataTypes.INTEGER,
    },
    CharacterName: {
      type: DataTypes.TEXT,
    },
    ClassLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Streak: {
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
    },
    UserName: {
      type: DataTypes.STRING(256),
      unique: true,
    },
    NormalizedUserName: {
      type: DataTypes.STRING(256),
    },
    Email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
    NormalizedEmail: {
      type: DataTypes.STRING(256),
    },
    EmailConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    PasswordHash: {
      type: DataTypes.TEXT,
    },
    SecurityStamp: {
      type: DataTypes.TEXT,
    },
    ConcurrencyStamp: {
      type: DataTypes.TEXT,
    },
    PhoneNumber: {
      type: DataTypes.TEXT,
    },
    PhoneNumberConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    TwoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    LockoutEnd: {
      type: DataTypes.DATE,
    },
    LockoutEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    AccessFailedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HasPromotedQuestion: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    IsDailyQuestionAnsweredCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    IsSkippedClass: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    RetryDailyQuestion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    LoginProvider: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    OwnerReferralCode: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "Users",
    schema: "RandomName",
    timestamps: false,
  }
);

export default UserModel;