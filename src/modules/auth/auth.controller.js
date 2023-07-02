import AuthService from "./auth.service.js";

export class AuthController {
  async Register(req, res) {
    const payload = req.body;
    const authService = new AuthService();
    const response = await authService.AddUser(payload);
    if (response) {
      res
        .status(response.status)
        .json({ message: response.message, ...response });
    }
  }

  async Login(req, res) {
    const payload = req.body;
    const authService = new AuthService();
    const response = await authService.UserLogin(payload);

    if (response) {
      res
        .status(response.status)
        .json({ message: response.message, ...response });
    }
  }
}
