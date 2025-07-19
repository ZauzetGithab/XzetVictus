export default async function handler(req, res) {
  const { GITHUB_TOKEN, REPO_OWNER, REPO_NAME } = process.env;
  const FILE = "users.json";

  try {
    const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const data = await r.json();
    const content = Buffer.from(data.content, "base64").toString("utf8");
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil data user" });
  }
}
