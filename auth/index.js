export function auth(req, res, next) {
  // Implement your authentication logic here
  // For example, check if the user is authenticated
  const isAuthenticated = true; // Replace with actual authentication check

  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
