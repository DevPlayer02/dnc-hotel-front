type DecryptToken = {
    id: number;
    name: string;
    exp: number;
}

export const decryptToken = (accessToken: string): DecryptToken => {
  const userData = accessToken.split(".")[1];
  const userPayloadString = Buffer.from(userData, "base64").toString();
  const { sub: id, name, exp } = JSON.parse(userPayloadString);

  return { id, name, exp };
};
