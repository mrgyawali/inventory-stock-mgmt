const axios = require("axios");
const config = require("../config.json");

const shopifyCreds = config.shopify['uk'];

const { apiKey, password, shopifyName } = shopifyCreds;

async function getAllProducts() {
  try {
    const { data: { products } } = await axios.get(
      `https://${apiKey}:${password}@${shopifyName}.myshopify.com/admin/api/2020-10/products.json`
    );
      const mensAndWomensProducts = products.filter(({title}) => title.includes('Women') || title.includes('Men')).map(({ variants }) => variants).flat()
      // console.log(mensAndWomensProducts.length, mensAndWomensProducts)
      return mensAndWomensProducts
  } catch (error) {
    console.log('errr', error)
  }
}

// getAllProducts()
module.exports = getAllProducts