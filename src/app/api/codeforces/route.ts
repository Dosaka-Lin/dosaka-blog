import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle") || "Dosaka";

  try {
    // CF 公开 API: https://codeforces.com/api/user.info?handles=...
    const [userRes, ratingRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`),
    ]);

    if (!userRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Codeforces data" },
        { status: 502 }
      );
    }

    const userData = await userRes.json();
    const ratingData = await ratingRes.json();

    if (userData.status !== "OK") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userData.result[0];
    const contests =
      ratingData.status === "OK"
        ? ratingData.result.slice(-10).map((c: { contestName: string; rank: number; newRating: number; oldRating: number }) => ({
            name: c.contestName,
            rank: c.rank,
            ratingChange: `${c.newRating > c.oldRating ? "+" : ""}${c.newRating - c.oldRating}`,
          }))
        : [];

    return NextResponse.json({
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      contests,
      solvedCount: 0, // CF API doesn't expose this directly
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
