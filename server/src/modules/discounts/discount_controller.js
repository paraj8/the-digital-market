const discountService = require("./discount_service");

const handleError = (res, error, status = 400) =>
  res.status(status).json({ success: false, message: error.message });

const createDiscount = async (req, res) => {
  try {
    const discount = await discountService.createDiscount(req.body);
    return res.status(201).json({
      success: true,
      message: "Discount created successfully",
      data: discount,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const getDiscounts = async (_req, res) => {
  try {
    const discounts = await discountService.getDiscounts();
    return res.status(200).json({ success: true, data: discounts });
  } catch (error) {
    return handleError(res, error, 500);
  }
};

const getAvailableDiscounts = async (_req, res) => {
  try {
    const discounts = await discountService.getAvailableDiscounts();
    return res.status(200).json({ success: true, data: discounts });
  } catch (error) {
    return handleError(res, error, 500);
  }
};

const getDiscountById = async (req, res) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id);
    return res.status(200).json({ success: true, data: discount });
  } catch (error) {
    return handleError(res, error, error.message === "Discount not found" ? 404 : 400);
  }
};

const updateDiscount = async (req, res) => {
  try {
    const discount = await discountService.updateDiscount(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
      data: discount,
    });
  } catch (error) {
    return handleError(res, error, error.message === "Discount not found" ? 404 : 400);
  }
};

const deleteDiscount = async (req, res) => {
  try {
    const result = await discountService.deleteDiscount(req.params.id);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return handleError(res, error, error.message === "Discount not found" ? 404 : 400);
  }
};

module.exports = {
  createDiscount,
  getDiscounts,
  getAvailableDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
};
