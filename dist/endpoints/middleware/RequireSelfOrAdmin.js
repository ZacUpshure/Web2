export const requireSelfOrAdmin = (req, res, next) => {
    const requesterID = req.user?.userID;
    const targetID = req.params.userID;
    if (requesterID === targetID || req.user?.isAdministrator) {
        return next();
    }
    res.status(403).json({ message: 'Forbidden – Not your resource or not an admin' });
};
//# sourceMappingURL=RequireSelfOrAdmin.js.map