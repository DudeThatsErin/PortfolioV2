import { NextResponse } from 'next/server';

// Discord webhook attached to the ban-appeal channel (1432530586320244886).
// Set these in .env.local:
//   DISCORD_APPEAL_WEBHOOK_URL=https://discord.com/api/webhooks/.../...
//   DISCORD_OWNER_ID=<your discord user id to be pinged>
const WEBHOOK_URL = process.env.DISCORD_APPEAL_WEBHOOK_URL;
const OWNER_ID = process.env.DISCORD_OWNER_ID;

const DISCORD_ID_REGEX = /^\d{17,20}$/;

function trim(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  if (!WEBHOOK_URL) {
    console.error('[appeal] DISCORD_APPEAL_WEBHOOK_URL is not configured.');
    return NextResponse.json(
      { error: 'The appeal system is not configured yet. Please contact a moderator.' },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const username = trim(body.username, 100);
  const userId = trim(body.userId, 20);
  const reason = trim(body.reason, 1024);
  const why = trim(body.why, 1024);
  const extra = trim(body.extra, 1024);

  if (!username || !userId || !reason || !why) {
    return NextResponse.json(
      { error: 'Please fill out all required fields.' },
      { status: 400 },
    );
  }

  if (!DISCORD_ID_REGEX.test(userId)) {
    return NextResponse.json(
      { error: 'That does not look like a valid Discord User ID (it should be 17-20 digits).' },
      { status: 400 },
    );
  }

  const embed = {
    title: 'New Ban Appeal',
    color: 0xc0395a,
    fields: [
      { name: 'Discord Username', value: username, inline: true },
      { name: 'Discord User ID', value: `\`${userId}\` (<@${userId}>)`, inline: true },
      { name: '1. Why did you get muted/banned?', value: reason, inline: false },
      { name: '2. Why do you believe your appeal should be accepted?', value: why, inline: false },
      {
        name: '3. Is there anything else you would like for us to know?',
        value: extra || '*No additional information provided.*',
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
  };

  const content = OWNER_ID
    ? `<@${OWNER_ID}> A new ban appeal has been submitted.`
    : 'A new ban appeal has been submitted.';

  // Only allow pinging the owner; never mass-ping from user-supplied content.
  const allowed_mentions = OWNER_ID
    ? { parse: [], users: [OWNER_ID] }
    : { parse: [] };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'r/CodingHelp Appeals',
        content,
        embeds: [embed],
        allowed_mentions,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[appeal] Discord webhook failed:', res.status, text);
      return NextResponse.json(
        { error: 'Failed to deliver your appeal. Please try again later.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[appeal] Error posting to Discord webhook:', err);
    return NextResponse.json(
      { error: 'Failed to deliver your appeal. Please try again later.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
