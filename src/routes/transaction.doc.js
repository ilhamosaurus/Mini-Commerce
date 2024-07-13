/**
 * @swagger
 * /transaction/topup:
 *  post:
 *    summary: Topup balance
 *    tags:
 *      - Transaction
 *    description: Topup balance
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              amount:
 *                type: number
 *                example: 45000.05
 *            required:
 *              - amount
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Topup successful
 *                balance:
 *                  type: number
 *                  example: 45000.05
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Nilai top up harus dengan angka positif
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
 *                status:
 *                  type: number
 *                  example: 103
 *                message:
 *                  type: string
 *                  example: Failed to topup
 * /transaction/payment:
 *  post:
 *    summary: Make transaction
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Transaction
 *    description: Make transaction
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              kode_produk:
 *                type: string
 *                example: voucher_game
 *              qty:
 *                type: number
 *                example: 1
 *            required:
 *              - service_code
 *              - qty
 *    responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                transaction:
 *                  type: object
 *                  properties:
 *                    invoice:
 *                      type: string
 *                      example: INV20240628-001
 *                    type:
 *                      type: string
 *                      example: Payment
 *                    amount:
 *                      type: number
 *                      example: 100000
 *                    description:
 *                      type: string
 *                      example: Payment for Voucher game (1 pcs) and delivery fee 8000 if your purchase is less than 15000
 *                harga:
 *                  type: number
 *                  example: 100000
 *                delivery:
 *                  type: number
 *                  example: 0
 *                total:
 *                  type: number
 *                  example: 90000
 *                discount:
 *                  type: string
 *                  example: 10%
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Product not found
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
 *                  example: Failed to make transaction
 * /transaction/history:
 *  get:
 *    summary: Get transaction history
 *    tags:
 *      - Transaction
 *    description: Get transaction history and product selling history
 *    parameters:
 *      - in: query
 *        name: pageSize
 *        schema:
 *          type: integer
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: productCode
 *        schema:
 *          type: string
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    currentPage:
 *                      type: number
 *                      example: 1
 *                    total:
 *                      type: number
 *                      example: 10
 *                    data:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          invoice:
 *                            type: string
 *                            example: INV20240628-001
 *                          type:
 *                            type: string
 *                            example: PAYMENT
 *                          amount:
 *                            type: number
 *                            example: 100000
 *                          description:
 *                            type: string
 *                            example: Payment for Voucher game (1 pcs) and delivery fee 8000 if your purchase is less than 15000
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
 *                  example: Failed to get transaction history
 *
 */
