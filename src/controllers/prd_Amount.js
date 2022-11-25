import ProductAmount from "../models/prd_amount";
export const create = async (req, res) => {
  try {
    const amount = await new ProductAmount(req.body).save();
    res.json(amount);
  } catch (error) {
    res.status(400).json({
      message: "khong them duoc du lieu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const amount = await ProductAmount.find().populate("prd_id").populate("size_id").populate("color").exec();
    res.json(amount);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const read = async (req, res) => {
  try {
    const amount = await ProductAmount.findOne({ _id: req.params.id }).exec();
    res.json(amount);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const amount = await ProductAmount.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(amount);
  } catch (error) {
    res.status(400).json({
      message: "khong xoa",
    });
  }
};

export const update = async (req, res) => {
  try {
    const amount = await ProductAmount.findByIdAndUpdate({ _id: req.params.id },req.body,{new:true}).exec();
    res.json(amount);
  } catch (error) {
    res.status(400).json({
      message: "khoong update dc",
    });
  }
};
