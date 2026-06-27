const addressService = require("./address_service");

// Add Address
const addAddress = async (
  req,
  res
) => {
  try {
    const address =
      await addressService.addAddress(
        req.user.id,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Address added successfully",
      data: address,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Addresses
const getAddresses = async (
  req,
  res
) => { 
  try {
    const addresses =
      await addressService.getAddresses(
        req.user.id
      );

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Address

const updateAddress = async (
  req,
  res
) => {
  try {
    const address =
      await addressService.updateAddress(
        req.user.id,
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Address updated successfully",
      data: address,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Address

const deleteAddress = async (
  req,
  res
) => {
  try {
    const result =
      await addressService.deleteAddress(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Set Default Address

const setDefaultAddress = async (
  req,
  res
) => {
  try {
    const address =
      await addressService.setDefaultAddress(
        req.user.id,
        req.params.id
      );

    res.status(200).json({
      success: true,
      message:
        "Default address updated",
      data: address,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};