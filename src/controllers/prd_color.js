import Prd_color from "../models/prd_color";
export const create = async (req, res) => {
  try {
    const Prd_colorname = await new Prd_color(req.body).save();
    console.log(Prd_colorname);
    res.json(Prd_colorname);
  } catch (error) {
    res.status(400).json({
      message: "khong them duoc du lieu",
    });
  }
};
export const list = async (req, res) => {
  try {
    const getPrd_color = await Prd_color.find();
    res.json(getPrd_color);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const read = async (req, res) => {
  try {
    const prd_color = await Prd_color.findOne({ _id: req.params.id }).exec();
    res.json(prd_color);
  } catch (error) {
    res.status(400).json({
      message: "khong hien thi",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const removePrd_color = await Prd_color.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(removePrd_color);
  } catch (error) {
    res.status(400).json({
      message: "khong xoa",
    });
  }
};
export const update = async (request, response) => {
  try {
    const color = await Prd_color.findOneAndUpdate({ _id: request.params.id },request.body,{ new: true }).exec();
    response.json(color);
  } catch (error) {
    response.status(400).json({ message: 'Không sửa được data' });
  }
};
