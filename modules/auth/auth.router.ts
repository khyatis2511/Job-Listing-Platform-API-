import { Router } from "express"
import authController from "./auth.controller";

const applyAuthRoutes = (app: Router) => {
    app.post('/register', authController.register)
    // app.post('/register', authController.register)

    return app;
}

export default applyAuthRoutes;