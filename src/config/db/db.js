// filepath: d:\event\src\config\db\db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false, 
});

try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;