export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'ZauzetGithab';
  const REPO_NAME = 'XzetVictus';
  const FILE_PATH = 'users.json';

  try {
    const r = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3.raw' }
    });
    if (!r.ok) return res.status(500).json({ error: 'Gagal ambil data' });
    const users = await r.json();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
      }
