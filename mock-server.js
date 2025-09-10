import jsonServer from "json-server";
import jwt from "jsonwebtoken";

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const MOCKED_SECRET = "your_secret_key";

app.db = router.db;
app.use(jsonServer.bodyParser);
app.post("/auth/login", (req, res) => {
  const body = req.body;

  const user = app.db
    .get("users")
    .find({ email: body.email, password: body.password })
    .value();

  if (user) {
    const access_token = jwt.sign(
      {
        email: user.email,
        sub: user.id,
      },
      MOCKED_SECRET,
      { expiresIn: "1h" }
    );
      
    res.status(201).json({ access_token });
  } else {
      res.status(401).json({ message: "Not Authorized" });
  }
});

app.use(router);
app.listen(3000);
