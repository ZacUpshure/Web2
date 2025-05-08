export const requireAdmin = (req, res, next) => {
    if (!req.user?.isAdministrator) {
        res.status(403).json({ message: 'Admin privileges required' });
        return;
    }
    next();
};
//# sourceMappingURL=RequireAdmin.js.map