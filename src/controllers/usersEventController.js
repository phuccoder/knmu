import UserEventModel from "../models/userEventModel.js";

/**
 * @swagger
 * tags:
 *   name: UserEvents
 *   description: API for user events
 */

/**
 * @swagger
 * /api/userEvents/getAllUserEvents:
 *   get:
 *     summary: Retrieve a paginated list of user events
 *     description: Retrieves user events with pagination
 *     tags: [UserEvents]
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
 *         description: Number of user events per page
 *     responses:
 *       200:
 *         description: Paginated list of user events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userEvents:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalUserEvents:
 *                   type: integer
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
export const getAllUserEvents = async (req, res) => {
    try {
        // Get page and limit from query parameters, with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Calculate offset
        const offset = (page - 1) * limit;

        // Find total number of user events
        const totalUserEvents = await UserEventModel.count();

        // Calculate total pages
        const totalPages = Math.ceil(totalUserEvents / limit);

        // Find user events with pagination
        const userEvents = await UserEventModel.findAll({
            limit: limit,
            offset: offset,
            order: [["Id", "ASC"]],
        });

        // Respond with paginated results
        res.status(200).json({
            userEvents,
            totalUserEvents,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};