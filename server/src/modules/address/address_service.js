const Address = require("./address_model");

// Add New Address

const addAddress = async (
  userId,
  data
) => {
  if (data.isDefault) {
    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );
  }

  return await Address.create({
    ...data,
    user: userId,
  });
};  

// Get User Addresses

const getAddresses = async (
  userId
) => {
  return await Address.find({
    user: userId,
  }).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

// Update Address

const updateAddress = async (
  userId,
  addressId,
  data
) => {
  const address =
    await Address.findOne({
      _id: addressId,
      user: userId,
    });

  if (!address) {
    throw new Error(
      "Address not found"
    );
  }

  if (data.isDefault) {
    await Address.updateMany(
      { user: userId },
      { isDefault: false }
    );
  }

  return await Address.findByIdAndUpdate(
    addressId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete Address

const deleteAddress = async (
  userId,
  addressId
) => {
  const address =
    await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

  if (!address) {
    throw new Error(
      "Address not found"
    );
  }

  return {
    message:
      "Address deleted successfully",
  };
};

// Set Default Address

const setDefaultAddress = async (
  userId,
  addressId
) => {
  const address =
    await Address.findOne({
      _id: addressId,
      user: userId,
    });

  if (!address) {
    throw new Error(
      "Address not found"
    );
  }

  await Address.updateMany(
    { user: userId },
    { isDefault: false }
  );

  address.isDefault = true;

  await address.save();

  return address;
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};