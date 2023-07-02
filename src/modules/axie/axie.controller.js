import AxieService from "./axie.service.js";

export class AxieController {
  async FetchAxiesFromOtherSource(req, res) {
    const axieService = new AxieService();
    const response = await axieService.GetAxiesFromOtherSource();
    if (response) {
      res
        .status(response.status)
        .json({ message: response.message, ...response });
    }
  }

  async getAllAxiesFromDB(req, res) {
    const axieService = new AxieService();
    const response = await axieService.GetAxiesFromDatabase();
    if (response) {
      res
        .status(response.status)
        .json({ message: response.message, ...response });
    }
  }

  async addAxie(req, res) {
    const payload = req.body;
    console.log("%c Line:26 🥟 payload", "color:#fca650", payload);
    const axieService = new AxieService();
    const response = await axieService.AddAxie(payload);
    if (response) {
      res
        .status(response.status)
        .json({ message: response.message, ...response });
    }
  }
}
