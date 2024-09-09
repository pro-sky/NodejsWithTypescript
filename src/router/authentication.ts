// import express from 'express';
// import { register, login } from '../controllers/authentication';
// export default(router: express.Router ) => {
//     router.post("/auth/register", register);
//     router.post("/auth/login", login);
// };


import express from 'express';
import { register, login } from '../controllers/authentication';

export default (router: express.Router) => {
    /**
     * @swagger
     * tags:
     *   - name: Auth
     *     description: Authentication related operations
     */
    /**
     * @swagger
     * /auth/register:
     *   post:
     *     tags: [Auth]
     *     summary: Register a new user
     *     description: This endpoint allows a new user to register by providing email, password, and username.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *               username:
     *                 type: string
     *                 example: username123
     *     responses:
     *       200:
     *         description: User registered successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 email:
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
     */
    router.post("/auth/register", register);

    /**
     * @swagger
     * /auth/login:
     *   post:
     *     tags: [Auth]
     *     summary: Log in an existing user
     *     description: This endpoint allows an existing user to log in by providing email and password. A session token is returned and stored in a cookie.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: user@example.com
     *               password:
     *                 type: string
     *                 example: password123
     *     responses:
     *       200:
     *         description: User logged in successfully and session token set in cookie
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: string
     *                 email:
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
     */
    router.post("/auth/login", login);
};