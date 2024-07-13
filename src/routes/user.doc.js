/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Get user's detail information
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Information
 *     description: Get user's detail information
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     useername:
 *                       type: string
 *                       example: berkah
 *                     role:
 *                       type: string
 *                       example: MERCHANT
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2022-01-01T00:00:00.000Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token tidak valid atau kadaluawarsa
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to get profile
 * /user/balance:
 *  get:
 *    summary: Get user's balance
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Information
 *    description: Get user's balance
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                account:
 *                  type: object
 *                  properties:
 *                    owner:
 *                      type: string
 *                      example: berkah
 *                    balance:
 *                      type: number
 *                      example: 45000.05
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token tidak valid atau kadaluawarsa
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to update profile
 */
