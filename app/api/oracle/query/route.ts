import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { queryOracle } from "@/lib/oracle/engine";
import { OracleRequest } from "@/lib/oracle/types";
import { rateLimit, rateLimitResponse, LIMITS } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    // Per-user rate limit on Marco queries — controls Claude API cost.
    const userId = (session.user as { id?: string }).id;
    if (userId) {
      const limit = await rateLimit({
        key: `marco:${userId}`,
        ...LIMITS.marcoQuery,
      });
      if (!limit.ok) return rateLimitResponse(limit);
    }

    const body: OracleRequest = await request.json();

    if (!body.query || body.query.trim().length === 0) {
      return NextResponse.json(
        { error: "Query cannot be empty." },
        { status: 400 }
      );
    }

    if (body.query.length > 2000) {
      return NextResponse.json(
        { error: "Query too long. Maximum 2000 characters." },
        { status: 400 }
      );
    }

    const result = await queryOracle(session.user.id, body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Oracle query error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
