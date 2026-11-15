export default function handler(req, res) {
  res.status(200).json({
    owner: "ACCOUNT_B",
    resource: "VICTIM_CANARY",
    secret: "victim-project-canary-2026"
  });
}
