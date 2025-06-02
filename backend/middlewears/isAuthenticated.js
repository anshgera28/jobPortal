import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login.",
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // Add user ID to request object
        req.id = decoded.userId;
        next();

    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired. Please login again.",
                success: false
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please login again.",
                success: false
            });
        }

        return res.status(500).json({
            message: "Authentication failed",
            success: false,
            error: error.message
        });
    }
};

export default isAuthenticated;
