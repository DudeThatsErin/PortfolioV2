import { execSync } from "child_process";

export async function getSnapshot(type: string) {
  switch (type) {
    case "pm2:logs":
      try {
        const out = execSync("pm2 logs --lines 50 --nostream", {
          encoding: "utf-8",
        });

        return {
          type,
          data: out.split("\n"),
        };
      } catch (e) {
        return {
          type,
          data: [
            `Error reading logs: ${
              e instanceof Error ? e.message : "Unknown error"
            }`,
          ],
        };
      }

    case "pm2:processes":
      try {
        const out = execSync("pm2 jlist", {
          encoding: "utf-8",
        });

        return {
          type,
          data: JSON.parse(out),
        };
      } catch {
        return {
          type,
          data: [],
        };
      }

    default:
      return {
        type,
        data: [],
      };
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Always returns a string
  const type = searchParams.get("type") ?? "pm2:processes";

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      // Initial snapshot
      send(await getSnapshot(type));

      const interval = setInterval(async () => {
        send(await getSnapshot(type));
      }, 2000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}