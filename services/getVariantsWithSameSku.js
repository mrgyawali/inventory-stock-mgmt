const allProductsWithVariants = require('./getAllProducts')

async function getVariantsWithSameSku(sku) {
  const allVariants = await allProductsWithVariants()
  const variantsWithSameSku = allVariants.filter(variant => variant.sku === sku)
  return variantsWithSameSku
}

module.exports = getVariantsWithSameSku