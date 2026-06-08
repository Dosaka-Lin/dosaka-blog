import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle") || "Dosaka";

  // 牛客没有公开 API，返回占位数据
  // 后续可通过服务端爬虫获取
  return NextResponse.json({
    handle,
    practiceCount: 0,
    contestCount: 0,
    rating: 0,
    note: "牛客暂无公开 API，请前往牛客主页查看",
  });
}
