import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle") || "Dosaka";

  try {
    // Luogu 公开 API: https://www.luogu.com.cn/api/user/search?keyword=...
    // 先搜索用户
    const searchRes = await fetch(
      `https://www.luogu.com.cn/api/user/search?keyword=${encodeURIComponent(handle)}`,
      {
        headers: { "User-Agent": "Dosaka-Blog/1.0" },
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const searchData = await searchRes.json();
    const user = searchData.users?.[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 获取用户详情
    const detailRes = await fetch(
      `https://www.luogu.com.cn/api/user/info?uid=${user.uid}`,
      {
        headers: { "User-Agent": "Dosaka-Blog/1.0" },
      }
    );

    const detailData = await detailRes.json();
    const d = detailData.data || {};

    return NextResponse.json({
      handle: user.name || handle,
      solvedCount: d.submittedProblemCount || 0,
      level: d.color || "N/A",
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
