import { NextRequest, NextResponse } from "next/server";
import { calculateClosingCosts } from "../../../utils/calculations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = calculateClosingCosts(body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate closing costs" },
      { status: 500 }
    );
  }
}
