const { Router } = require("express");
const router = Router();
const stripe = require("stripe")("sk_test_snfQiNuW8ZbYxFEx4sy8B3BE002EgW559X");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/checkout", async (req, res) => {
  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  });
  const order = await stripe.charges.create({
    amount: "399",
    currency: "usd",
    customer: customer.id,
    description: "Ebook",
  });
  console.log(order.id);
  //Final Sucess View
  res.render("download");
});

module.exports = router;
