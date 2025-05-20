import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

mercadopago.configure({
  access_token: "process.env.ACCESS_TOKEN" // Coloque aqui seu token do Mercado Pago
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

