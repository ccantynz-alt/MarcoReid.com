import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordAiFeedback } from "@/lib/flywheel";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { queryId, rating, helpful, accurate, comment } =
      await request.json();

    if (!queryId || !rating) {
      return NextResponse.json(
        { error: "Query ID and rating are required." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Save feedback
    const feedback = await prisma.marcoFeedback.create({
      data: {
        queryId,
        userId,
        rating,
        helpful,
        accurate,
        comment,
      },
    });

    // Update query pattern average rating (flywheel learning)
    const query = await prisma.marcoQuery.findUnique({
      where: { id: queryId },
      select: { query: true, domain: true },
    });

    if (query) {
      const normalised = query.query.toLowerCase().trim().substring(0, 200);
      const allFeedback = await prisma.marcoFeedback.findMany({
        where: {
          query: {
            query: { startsWith: normalised.substring(0, 50) },
          },
        },
        select: { rating: true },
      });

      const avgRating =
        allFeedback.reduce((sum, f) => sum + f.rating, 0) /
        allFeedback.length;

      await prisma.queryPattern.updateMany({
        where: { pattern: normalised, domain: query.domain },
        data: { avgRating },
      });
    }

    // Feed the platform flywheel.
    await recordAiFeedback(userId, queryId, feedback.id, rating, {
      helpful: helpful ?? null,
      accurate: accurate ?? null,
    });

    return NextResponse.json({
      message: "Feedback recorded. Thank you.",
      feedbackId: feedback.id,
    });
  } catch (error) {
    console.error("Marco feedback error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
