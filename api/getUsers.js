export default async function handler(req, res) {
  const response = await fetch("https://api.github.com/repos/ZauzetGithab/Database/contents/users.json", {
    headers: {
      Authorization: "Bearer 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",
      Accept: "application/vnd.github.v3.raw"
    }
  });

  if (!response.ok) {
    return res.status(500).json({ error: "❌ Gagal ambil data dari GitHub" });
  }

  try {
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "❗ Gagal parsing JSON" });
  }
}
