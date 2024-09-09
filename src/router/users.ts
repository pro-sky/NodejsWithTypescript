import express from 'express';
import { getAllUser, deleteUser,updateUser } from '../controllers/users';
import { isAuthenticated ,isOwner} from '../middlewares';
// export default(router: express.Router ) => {
//     router.get("/users",isAuthenticated, getAllUser);
//     router.delete("/users/:id",isAuthenticated,isOwner,deleteUser);
//     router.patch("/users/:id",isAuthenticated,isOwner,updateUser);

// };

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   - name: User
     *     description: User related Api
     */
    /**
     * @swagger
     * /users:
     *   get:
     *     tags: [User]
     *     summary: Get all users
     *     description: Retrieve a list of all registered users. Requires a valid session token in cookies.
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                   username:
     *                     type: string
     *                   email:
     *                     type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    router.get("/users", isAuthenticated, getAllUser);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     tags: [User]
     *     summary: Delete a user by ID
     *     description: Remove a user from the system by their unique ID. Requires a valid session token in cookies.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the user to delete
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: User deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);

    /**
     * @swagger
     * /users/{id}:
     *   patch:
     *     tags: [User]
     *     summary: Update a user's username
     *     description: Update the username of an existing user by their unique ID. Requires a valid session token in cookies.
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the user to update
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 example: newUsername
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 username:
     *                   type: string
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *       403:
     *         description: Username cannot be empty
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};