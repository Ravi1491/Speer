import * as searchService from "../services/search";
import logger from "../utils/logger";

export async function searchNotes(req, res) {
  const { q: query } = req.query;

  try {
    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Invalid search query" });
    }

    const matchingNotes = await searchService.searchNotes(req.user.id, query);

    res.json({ notes: matchingNotes });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
