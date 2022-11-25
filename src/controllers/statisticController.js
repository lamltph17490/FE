import Product from "../models/product";

const StatisticController = {
  async dashboard(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json({ totalProduct: products.reduce((a, b) => a + b.quantity, 0) })
    } catch (e) {
      console.error(e);
      res.status(500)
    }
  }
}

export default StatisticController;
