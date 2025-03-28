import UserGiftModel from "../models/userGiftModel.js";
import { Op } from "sequelize";

/**
 * @swagger
 * /api/userGifts/getAllUserGifts:
 *   get:
 *     summary: Retrieve a paginated list of user gifts
 *     description: Retrieves user gifts with pagination.
 *     tags: [UserGifts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of user gifts per page
 *     responses:
 *       200:
 *         description: Paginated list of user gifts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       UserId:
 *                         type: string
 *                       GiftId:
 *                         type: integer
 *                       ClassLevel:
 *                         type: integer
 *                       CreatedDate:
 *                         type: string
 *                         format: date-time
 *                       ModifiedDate:
 *                         type: string
 *                         format: date-time
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const getAllUserGifts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate offset
        const offset = (page - 1) * limit;

        // Find total number of users
        const totalUsers = await UserGiftModel.count();

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limit);

        // Find users with pagination
        const users = await UserGiftModel.findAll({
            limit: limit,
            offset: offset,
            order: [['Id', 'ASC']],
        });

        // Respond with paginated results
        res.status(200).json({
            users,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @swagger
 * /api/userGifts/getTotalUserGifts:
 *   get:
 *     summary: Retrieve the total number of user gifts
 *     description: Retrieves the total number of user gifts.
 *     tags: [UserGifts]
 *     responses:
 *       200:
 *         description: Total number of user gifts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUserGift:
 *                   type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export const getTotalUserGifts = async (req, res) => {
    try {
        const totalUserGift = await UserGiftModel.count();

        res.status(200).json({ totalUserGift });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @swagger
 * /api/userGifts/filter:
 *   get:
 *     summary: Filter, sort, and search user gifts
 *     description: Retrieve user gifts based on dynamic filters, sorting, and searching.
 *     tags: [UserGifts]
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: Filters in the format `field:operator:value` (e.g., `UserId:eq:123,GiftId:gte:5`)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting in the format `field:direction` (e.g., `CreatedDate:desc`)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of user gifts per page
 *     responses:
 *       200:
 *         description: Filtered, sorted, and paginated list of user gifts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userGifts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Id:
 *                         type: integer
 *                       UserId:
 *                         type: string
 *                       GiftId:
 *                         type: integer
 *                       ClassLevel:
 *                         type: integer
 *                       CreatedDate:
 *                         type: string
 *                         format: date-time
 *                       ModifiedDate:
 *                         type: string
 *                         format: date-time
 *                 totalUserGifts:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *       500:
 *         description: Server error
 */
export const getFilteredUserGifts = async (req, res) => {
    try {
        const { filters, sort, page = 1, limit = 10 } = req.query;

        // Parse filters
        const where = {};
        if (filters) {
            const filterArray = filters.split(",");
            filterArray.forEach((filter) => {
                const [field, operator, value] = filter.split(":");
                switch (operator) {
                    case "eq":
                        if (value === "[null]") {
                            where[field] = { [Op.is]: null }; // Handle null values
                        } else {
                            where[field] = value;
                        }
                        break;
                    case "ne":
                        if (value === "[null]") {
                            where[field] = { [Op.not]: null }; // Handle not null values
                        } else {
                            where[field] = { [Op.ne]: value };
                        }
                        break;
                    case "gt":
                        where[field] = { [Op.gt]: value };
                        break;
                    case "lt":
                        where[field] = { [Op.lt]: value };
                        break;
                    case "gte":
                        where[field] = { [Op.gte]: value };
                        break;
                    case "lte":
                        where[field] = { [Op.lte]: value };
                        break;
                    case "like":
                        where[field] = { [Op.like]: `%${value}%` };
                        break;
                    default:
                        break;
                }
            });
        }

        // Parse sorting
        const order = [];
        if (sort) {
            const [field, direction] = sort.split(":");
        }

        // Pagination
        const offset = (page - 1) * limit;

        // Query the database
        const { count: totalUserGifts, rows: userGifts } = await UserGiftModel.findAndCountAll({
            where,
            order,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalUserGifts / limit);

        // Respond with results
        res.status(200).json({
            userGifts,
            totalUserGifts,
            totalPages,
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};