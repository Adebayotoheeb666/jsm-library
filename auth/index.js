export function auth(req, res, next) {
  // Implement your authentication logic here
  // For example, check if the user is authenticated
  const isAuthenticated = req.session && req.session.user; // Check if session exists and user is present

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
