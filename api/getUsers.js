export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.GITHUB_OWNER;
  const REPO_NAME = process.env.GITHUB_REPO;
  const USERS_FILE = "users.json";

  try {
    const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${USERS_FILE}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    if (!r.ok) return res.status(500).json({ error: 'Gagal ambil data user dari GitHub' });

    const data = await r.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
