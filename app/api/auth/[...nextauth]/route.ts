// app/api/auth/imagekit/route.ts
import { NextResponse } from "next/server";
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

// Handle GET requests
export async function GET() {
  try {
    // Generate an authentication parameters object for ImageKit
    const authenticationParameters = imagekit.getAuthenticationParameters();

    // Return the authentication parameters as JSON
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    // Log any errors that occur
    console.error("Error:", error);

    // Return 500 Internal Server Error if there's an error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}