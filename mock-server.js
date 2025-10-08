import jsonServer from "json-server";
import jwt from "jsonwebtoken";

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const MOCKED_SECRET = "your_secret_key";

app.db = router.db;
app.use(jsonServer.bodyParser);

const basePath = "";

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

app.post("/auth/register", (req, res) => {
  const body = req.body;

  const users = app.get('users').value();
  const id = users.length ? Math.max(...users.map(user => user.id)) : 1
    
  app.get('users').push({
    ...body,
    id: id + 1,
    avatar: null,
    createdAt: new Date().toISOString()
  }).write();

  return res.status(201).jsonp(newUser)
})

app.post('/auth/forgot-password', (req, res) => {
    res.status(201).send('A verification code has been sent to fabio@teste.com')
})

app.patch('/auth/reset-password', (req, res) => {
    console.log('I’m here \n\n\n\n\n')
    res.status(201).send({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIm5hbWUiOiJGZWxpY2lhIFRlc3RlIiwiaWF0IjoxNzIyMDE3NTA3LCJleHAiOjE3MjIxMDM5MDcsImF1ZCI6InVzZXJzIiwiaXNzIjoiZG5jX2hvdGVsIn0.WQw1JuFsnBLrgX6q1Dg-vxCux_gVSB5-gdv3SBpg2v0",
      })
})

app.post('/users/avatar', (req, res) => {
  res.status(200).jsonp({
    "id": 1,
    "email": "xoh@teste.com",
    "name": "Xoh",
    "role": "ADMIN",
    "avatar": "dfgsgdskldfnmsglk.jpg",
    "createdAt": "2023-11-20T13:45:30.000Z"
  })
})

app.get('/hotels', (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.limit) || 10;

  const hotels = app.db.get('hotels').value();

  const total = hotels.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedHotels = hotels.slice(start, end);

  res.status(200).jsonp({
    total,
    page: page,
    per_page: perPage,
    data: paginatedHotels,
  })
});

app.post('/reservations', (req, res) => { 
  res.status(201).jsonp({
    id: 1,
    userId: 2,
    hotelId: 2,
    checkIn: "2025-10-10T03:00:00.000Z",
    checkOut: "2025-10-16T03:00:00.000Z",
    total: -420,
    status: "PENDING",
    createdAt: "2025-10-06T22:21:01.892Z",
    updatedAt: "2025-10-06T22:21:01.892Z"
  })
})

app.get('/reservations/user', (req, res) => {
  const reservations = app.db.get('reservations').value();
  res.status(200).jsonp(reservations)
})

app.use(router);
app.listen(3000);
