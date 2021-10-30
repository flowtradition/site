import { Telegraf } from "telegraf";
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_MESSAGE_TO;
const bot = new Telegraf(botToken);

export default async function handler(req, res) {
  console.log(req.body);
  const { product, fullName, email, phoneNumber, deliveryAddress, referralCode, selectedOptions } = req.body;
  let options = "";

  for (const option in selectedOptions) {
    options += `\n${option}: <b>${selectedOptions[option]}</b>`;
  }

  const message = `<b>💸 Новый заказ на сайте Flowtraidition.com 💸</b>

Продукт: <b>${product.name}</b>
Цена: <b>${product.price} ${product.currency}</b>
${options}

От: <b>${fullName || ""}</b>
E-mail: <b>${email || ""}</b>
Номер телефона: <b>${phoneNumber || ""}</b>
Откуда пришёл: <b>${referralCode || ""}</b>

Адрес доставки: <b>${deliveryAddress || ""}</b>
`;
  try {
    await bot.telegram.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ name: "John Doe" });
}
