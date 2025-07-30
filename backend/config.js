import dotenv from "dotenv";

dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY =
  "sk_test_51Rpj9NKRrO5KUi1t6IZzvxLF5dIRiUipr3fAYFijtqdVg0tjOxJ39VMrw8Pir9mx0KSUpfaIhQlKfuIzPS0wcSvY00FrmbT1LF";
export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY,
};
