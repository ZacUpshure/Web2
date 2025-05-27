// middleware funktion
export const requireAdmin = (req, res, next) => {
    // prüft ob der anfragende user das isAdministrator feld vorhanden hat true oder false.
    if (!req.user?.isAdministrator) { // ? damit kein fehler geworfen wird wenn req.user nicht existiert.
        res.status(403).json({ message: 'Admin privileges required' });
        return;
    }
    next(); // bei erfolg, wird die nächste middleware aufgerufen.
};
//# sourceMappingURL=RequireAdmin.js.map