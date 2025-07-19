export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // masukin di Vercel Environment
  const REPO_OWNER = 'ZauzetGithab';
  const REPO_NAME = 'XzetVictus';
  const FILE_PATH = 'users.json';

  try {
    const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    if (!r.ok) return res.status(500).json({ error: 'Gagal ambil data' });
    const data = await r.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    res.status(200).json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
