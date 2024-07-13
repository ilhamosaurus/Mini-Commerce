/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: Register new user
 *    tags:
 *      - Auth
 *    description: User registration with unique username, role and password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: berkah
 *              password:
 *                type: string
 *                example: berkah
 *              role:
 *                type: string
 *                enum:
 *                  - client
 *                  - merchant
 *            required:
 *              - email
 *              - password
 *              - role
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
 *                  example: Registrasi successfully, please login.
 *      409:
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: username already exists
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to register
 *
 * /auth/login:
 *  post:
 *    summary: Login user
 *    tags:
 *      - Auth
 *    description: User login with unique username and password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: berkah
 *              password:
 *                type: string
 *                example: berkah
 *            required:
 *              - email
 *              - password
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                access_token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjYyYzY0MjUwNzUxOTIzNCIsImlhdCI6MTY0MjM5NzUzN30.TnNpXkUZ6F0pZVX5nNn0Yt5X7YR9jCj7l2kM0mHqXo
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email atau password tidak sesuai
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: invalid password
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to login
 */
