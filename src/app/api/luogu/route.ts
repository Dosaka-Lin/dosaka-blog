import { NextRequest, NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle") || "Dosaka";

  try {
    // Luogu user search API (公开可用)
    const searchRes = await fetch(
      `https://www.luogu.com.cn/api/user/search?keyword=${encodeURIComponent(handle)}`,
      {
        headers: { "User-Agent": "Dosaka-Blog/1.0" },
      }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ error: "Search failed" }, { status: 502 });
    }

    const searchData = await searchRes.json();
    const user = searchData.users?.[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 搜索接口返回的基本信息
    return NextResponse.json({
      handle: user.name || handle,
      uid: user.uid,
      level: user.color || "N/A",
      avatar: user.avatar || "",
      badge: user.badge || null,
      ccfLevel: user.ccfLevel || 0,
      solvedCount: 0, // 详情接口有反爬保护，暂时无法获取
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
