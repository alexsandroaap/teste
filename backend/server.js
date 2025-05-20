import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

mercadopago.configure({
  access_token: "APP_USR-332673202870613-051221-6120ab2e05f61e8a7c40d2d3fa3c6d28-48332656" // Coloque aqui seu token do Mercado Pago
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/criar-pagamento", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Serviço Premium",
          unit_price: 100,
          quantity: 1,
        },
      ],
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente",
      },
      auto_return: "approved",
    };

    const result = await mercadopago.preferences.create(preference);
    res.json({ init_point: result.body.init_point });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Servidor backend rodando na porta 3001"));
