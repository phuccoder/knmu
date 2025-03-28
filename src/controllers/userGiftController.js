import UserGiftModel from "../models/userGiftModel.js";

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
 *                 totalUsers:
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
        const totalUsers = await UserGiftModel.count();

        res.status(200).json({ totalUsers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}