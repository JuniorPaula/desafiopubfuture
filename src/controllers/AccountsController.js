class AccountsController {
  index(req, res) {
    res.json({
      ok: true,
    });
  }
}

export default new AccountsController();
