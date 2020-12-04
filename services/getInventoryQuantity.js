const axios = require("axios");
const config = require("../config.json");

const shopifyCreds = config.shopify['uk'];

const { apiKey, password, shopifyName } = shopifyCreds;

async function getInventoryQuantity(variant_id) {
  try {
    const { data } = await axios.get(
      `https://${apiKey}:${password}@${shopifyName}.myshopify.com/admin/api/2020-04/variants/${variant_id}.json`
    );
    const { inventory_quantity } = data.variant
    console.log({ inventory_quantity })
    return inventory_quantity
  } catch (error) {
    console.log('errr', error)
  }
}

module.exports = getInventoryQuantity