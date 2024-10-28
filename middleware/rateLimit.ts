// middleware/rateLimit.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server"; // Import NextRequest
import RateLimit from "next-rate-limit";

// Configure rate limiting
const limiter = RateLimit({
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
  interval: 60 * 1000, // 1 minute
});

export const rateLimitMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const nextRequest: NextRequest = req as unknown as NextRequest; // Cast req to NextRequest
    const isRateLimited = await limiter.checkNext(nextRequest, 100); // Allow max 100 requests for the check
    if (isRateLimited) {
      res
        .status(429)
        .json({ error: "Too many requests. Please try again later." });
      return true; // Rate limited
    }
    return false; // Not rate limited
  } catch (error) {
    console.error("Rate limiting error:", error);
    res.status(500).json({ error: "Internal server error" });
    return true; // Treat errors as rate limited for safety
  }
};
