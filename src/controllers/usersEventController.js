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

/**
 * @swagger
 * /api/userEvents/totalUserEvents:
 *   get:
 *     summary: Retrieve the total number of user events
 *     description: Retrieves the total number of user events
 *     tags: [UserEvents]
 *     responses:
 *       200:
 *         description: Total number of user events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUserEvents:
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

/**
 * @swagger
 * /api/userEvents/{id}:
 *   put:
 *     summary: Update a user event by ID
 *     description: Updates a user event's details by its ID.
 *     tags: [UserEvents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ReferralCode:
 *                 type: string
 *               TotalReferral:
 *                 type: integer
 *               CurrentRouteId:
 *                 type: integer
 *               CurrentRouteIndex:
 *                 type: integer
 *               IsFinishedEvent:
 *                 type: boolean
 *               IsUsedSkippedClass:
 *                 type: boolean
 *               IsDeleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: UserEvent updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userEvent:
 *                   type: object
 *       404:
 *         description: UserEvent not found
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

export const getTotalUserEvents = async (req, res) => {
    try {
        const totalUserEvents = await UserEventModel.count();

        res.status(200).json({ totalUserEvents });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateUserEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the UserEvent by Id
        const userEvent = await UserEventModel.findByPk(id);

        if (!userEvent) {
            return res.status(404).json({ message: "UserEvent not found" });
        }

        // Update the UserEvent with the provided data
        await userEvent.update({ ...updateData, ModifiedDate: new Date() });

        res.status(200).json({ message: "UserEvent updated successfully", userEvent });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};