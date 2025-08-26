import jwt from "jsonwebtoken";
const JWT_KEY = process.env.JWT_SECRET_KEY;
const validateUser = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
        res.status(404).json({
            error: "jwt token not found",
        });
        return;
    }
    const token = jwtToken.split(" ")[1];
    try {
        const decoded = jwt.verify(token || " ", JWT_KEY || "MY SUPER SECRET KEY");
        req.user = decoded;
        next();
    }
    catch (error) {
        res.json({
            error: "user not authorized",
        });
    }
};
export default validateUser;
//# sourceMappingURL=auth.js.map