/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: merchant
 *         schema:
 *           type: string
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       kode:
 *                         type: string
 *                         example: VOUCHER_GAME
 *                       name:
 *                         type: string
 *                         example: Voucher Game
 *                       price:
 *                         type: number
 *                         example: 100000
 *                       weight:
 *                         type: number
 *                         example: 1
 *                       description:
 *                         type: string
 *                         example: Voucher game senilai 100.000
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get products
 *   post:
 *     summary: Create new product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     description: Create new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: voucher_game
 *               name:
 *                 type: string
 *                 example: Voucher Game
 *               price:
 *                 type: number
 *                 example: 100000
 *               weight:
 *                 type: number
 *                 example: 1
 *               description:
 *                 type: string
 *                 example: Voucher game senilai 100.000
 *             required:
 *               - code
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     code:
 *                       type: string
 *                       example: voucher_game
 *                     name:
 *                       type: string
 *                       example: Voucher Game
 *                     price:
 *                       type: number
 *                       example: 100000
 *                     weight:
 *                       type: number
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: Voucher game senilai 100.000
 *                     createdAt:
 *                       type: string
 *                       example: 2022-01-01T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
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
 *                   example: Token tidak valid atau kadaluwarsa
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Product with code voucher_game already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create product
 * /product/{code}:
 *  get:
 *    summary: Get product by code
 *    tags:
 *      - Product
 *    description: Get product by code
 *    parameters:
 *      - in: path
 *        name: code
 *        schema:
 *          type: string
 *        required: true
 *        description: Product code
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 1
 *                    code:
 *                      type: string
 *                      example: voucher_game
 *                    name:
 *                      type: string
 *                      example: Voucher Game
 *                    price:
 *                      type: number
 *                      example: 100000
 *                    weight:
 *                      type: number
 *                      example: 1
 *                    description:
 *                      type: string
 *                      example: Voucher game senilai 100.000
 *                    createdAt:
 *                      type: string
 *                      example: 2022-01-01T00:00:00.000Z
 *                    updatedAt:
 *                      type: string
 *                      example: 2022-01-01T00:00:00.000Z
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Product not found
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Failed to get product
 *  patch:
 *    summary: Update product
 *    tags:
 *      - Product
 *    security:
 *      - bearerAuth: []
 *    description: Update product
 *    parameters:
 *      - in: path
 *        name: code
 *        schema:
 *          type: string
 *          required: true
 *        description: Product code
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Voucher Game
 *              price:
 *                type: number
 *                example: 100000
 *              weight:
 *                type: number
 *                example: 1
 *              description:
 *                type: string
 *                example: Voucher game senilai 100.000
 *            required:
 *              - name
 *              - price
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                product:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: number
 *                      example: 1
 *                    code:
 *                      type: string
 *                      example: voucher_game
 *                    name:
 *                      type: string
 *                      example: Voucher Game
 *                    price:
 *                      type: number
 *                      example: 100000
 *                    weight:
 *                      type: number
 *                      example: 1
 *                    description:
 *                      type: string
 *                      example: Voucher game senilai 100.000
 *                    createdAt:
 *                      type: string
 *                      example: 2022-01-01T00:00:00.000Z
 *                    updatedAt:
 *                      type: string
 *                      example: 2022-01-01T00:00:00.000Z
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Product not found
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Unauthorized
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Failed to update product
 *  delete:
 *    summary: Delete product
 *    tags:
 *      - Product
 *    security:
 *      - bearerAuth: []
 *    description: Delete product
 *    parameters:
 *      - in: path
 *        name: code
 *        schema:
 *          type: string
 *          required: true
 *        description: Product code
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Product deleted
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Product not found
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Unauthorized
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Failed to delete product
 */
