import type { NextApiRequest, NextApiResponse } from "next";
import ImageKit from "imagekit";

// Import environment variables with default values
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY ?? "default_public_key";
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY ?? "default_private_key";
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT ?? "default_url_endpoint";

// Instantiate ImageKit with the specified configuration
const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// API route handler for /api/auth/imagekit
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for GET request method
  if (req.method !== "GET") {
    // Return 405 Method Not Allowed if request method is not GET
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Generate an authentication parameters object for ImageKit
    const authenticationParameters = imagekit.getAuthenticationParameters();

    // Return the authentication parameters as JSON
    res.status(200).json(authenticationParameters);
  } catch (error) {
    // Log any errors that occur
    console.error("Error:", error);

    // Return 500 Internal Server Error if there's an error
    res.status(500).json({ message: "Internal Server Error" });
  }
}