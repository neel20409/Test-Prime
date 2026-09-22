export const dynamic = "force-static";

export async function GET() {
  return new Response("google-site-verification: googleae932ab363d7543c.html\n", {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
