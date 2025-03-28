import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const secretKey = process.env.SECRET_KEY;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
}

export function generateToken(user) {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign({ userId: user._id.toString(), role: user.role }, secretKey, { expiresIn: "1h" });
}

export function isAdmin(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  next();
}

export function isUser(req, res, next) {
  if (req.user.role !== "USER" && req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  next();
}

export function isManager(req, res, next) {
  if (req.user.role !== "MANAGER" && req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  next();
}

export function isShipper(req, res, next) {
  if (req.user.role !== "SHIPPER" && req.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }
  next();
}

export function isUserOrManager(req, res, next) {
  const allowedRoles = ["USER", "MANAGER"];
  if (!allowedRoles.includes(req.user.role)) {
    return res.sendStatus(403);
  }
  next();
} 

export function isManagerOrAdmin(req, res, next) {
  const allowedRoles = ["MANAGER", "ADMIN"];
  if (!allowedRoles.includes(req.user.role)) {
    return res.sendStatus(403);
  }
  next();
}

export function isUserOrAdmin(req, res, next) {
  const allowedRoles = ["USER", "ADMIN"];
  if (!allowedRoles.includes(req.user.role)) {
    return res.sendStatus(403);
  }
  next();
}