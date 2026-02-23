import { NextRequest, NextResponse } from "next/server";

const getBackendBaseUrl = () => {
  const backendUrl =
    process.env.BACKEND_API_URL?.trim() ||
    process.env.INTERNAL_BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_API_URL?.trim() ||
    "http://localhost:5000";

  return backendUrl.replace(/\/+$/, "");
};

type RouteContext = {
  params: Promise<{ section: string }>;
};

const forwardRequest = async (
  request: NextRequest,
  section: string,
  method: "GET" | "POST"
) => {
  const backendBaseUrl = getBackendBaseUrl();
  const backendUrl = `${backendBaseUrl}/api/entries/${section}`;

  if (method === "GET") {
    const response = await fetch(backendUrl, { cache: "no-store" });
    const payload = await response.text();

    return new NextResponse(payload, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
      },
    });
  }

  const formData = await request.formData();
  const response = await fetch(backendUrl, {
    method: "POST",
    body: formData,
  });
  const payload = await response.text();

  return new NextResponse(payload, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { section } = await context.params;

  try {
    return await forwardRequest(_request, section, "GET");
  } catch {
    return NextResponse.json(
      { error: "Failed to reach backend service." },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { section } = await context.params;

  try {
    return await forwardRequest(request, section, "POST");
  } catch {
    return NextResponse.json(
      { error: "Failed to reach backend service." },
      { status: 502 }
    );
  }
}
