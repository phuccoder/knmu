import UserModel from "../models/userModel.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - userName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         userName:
 *           type: string
 *           description: The user's username.
 *         avartaImage:
 *           type: string
 *           description: The user's avatar image.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         role:
 *           type: string
 *           description: The user's role.
 *         password:
 *           type: string
 *           description: The user's password.
 *         address:
 *           type: string
 *           description: The user's address.
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         avartaImage: "https://example.com/avatar.jpg"
 *         email: johndoe@example.com
 *         phoneNumber: "123-456-7890"
 *         role: admin
 *         password: "password123"
 *         address: "123 Main St, Anytown, USA"
 */

/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Retrieve a paginated list of users
 *     description: Retrieves users with pagination
 *     tags: [Users]
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
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: Paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalUsers:
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
 * /api/users/totalUsers:
 *   get:
 *     summary: Get total users count
 *     description: Retrieves the total count of users in the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Total users count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   description: Total number of users
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               CharacterId:
 *                 type: integer
 *               CharacterName:
 *                 type: string
 *               ClassLevel:
 *                 type: integer
 *               Streak:
 *                 type: integer
 *               ModifiedBy:
 *                 type: string
 *               IsDeleted:
 *                 type: boolean
 *               UserName:
 *                 type: string
 *               Email:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *               TwoFactorEnabled:
 *                 type: boolean
 *               LockoutEnabled:
 *                 type: boolean
 *               AccessFailedCount:
 *                 type: integer
 *               HasPromotedQuestion:
 *                 type: boolean
 *               RetryDailyQuestion:
 *                 type: integer
 *               LoginProvider:
 *                 type: integer
 *               OwnerReferralCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

export const getAllUsers = async (req, res) => {
  try {
    // Get page and limit from query parameters, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate offset
    const offset = (page - 1) * limit;

    // Find total number of users
    const totalUsers = await UserModel.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Find users with pagination
    const users = await UserModel.findAll({
      limit: limit,
      offset: offset,
      attributes: {
        exclude: ['Password', 'VerificationToken'], // Exclude sensitive information
      },
      order: [['Id', 'ASC']], // Optional: sort by most recently created
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

export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await UserModel.count();

    res.status(200).json({ totalUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cập nhật tất cả các trường hợp lệ
    await user.update({ ...req.body, ModifiedDate: new Date() });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};