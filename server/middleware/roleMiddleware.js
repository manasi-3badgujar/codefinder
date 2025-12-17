export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // ✅ SUPPORT BOTH role & usertype
    const userRole = req.user.role || req.user.usertype;

    if (userRole !== role) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};
