const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("autoIndex", false);

const Cart = require("../modules/carts/cart_model");

const migrateCartVariantIndex = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required to migrate cart indexes");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const collectionExists = await mongoose.connection.db
    .listCollections({ name: Cart.collection.name })
    .hasNext();
  if (!collectionExists) {
    await Cart.createCollection();
  }

  const indexes = await Cart.collection.indexes();
  const oldUniqueIndex = indexes.find(
    (index) =>
      index.unique &&
      Object.keys(index.key).length === 2 &&
      index.key.user === 1 &&
      index.key.product === 1
  );

  await Cart.collection.createIndex(
    { user: 1, product: 1, variantId: 1 },
    { unique: true, name: "user_1_product_1_variantId_1" }
  );
  console.log("Created cart product/variant unique index");

  if (oldUniqueIndex) {
    await Cart.collection.dropIndex(oldUniqueIndex.name);
    console.log(`Removed legacy cart index ${oldUniqueIndex.name}`);
  }
};

migrateCartVariantIndex()
  .catch((error) => {
    console.error("Cart variant index migration failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
