export default async function handler(req, res) {
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
  const FILE = "users.json";

  if (req.method !== "POST") return res.status(405).end();

  const { action, username, password, expired } = req.body;

  try {
    const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const data = await r.json();
    const content = Buffer.from(data.content, "base64").toString("utf8");
    let users = JSON.parse(content);

    if (action === "create") {
      users.push({ username, password, role: "user", expired });
    } else if (action === "delete") {
      users = users.filter(u => u.username !== username);
    }

    const updated = Buffer.from(JSON.stringify(users, null, 2)).toString("base64");

    await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE}`, {
      method: "PUT",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update users.json",
        content: updated,
        sha: data.sha
      })
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Gagal update users.json" });
  }
}
