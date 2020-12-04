const router = require('express').Router()

const allProductsWithVariants = require('../services/getAllProducts')

router.post('/', async (req,res) => {

  // console.log('line_items',req.body.line_items)
  const { line_items } = req.body
  const numbersOfPorductsOrdered = line_items.reduce((final, cv) => final + cv.quantity ,0)
  const skuAndProductIdOfTheProductsOrdered = line_items.map(({ quantity, sku, product_id, variant_id }) => {
    return {
      quantity,
      sku,
      product_id,
      variant_id
    }
  })

  console.log({skuAndProductIdOfTheProductsOrdered})

  const variantsWithSameSkus = await Promise.all(
    skuAndProductIdOfTheProductsOrdered.map(async({sku}) => {
      const allVariants = await allProductsWithVariants()
      const variantsWithSameSku = allVariants.filter(variant => variant.sku === sku)
      return variantsWithSameSku
  }))

  console.log('hello there',variantsWithSameSkus)
})



//line_items
//  [
//   {
//     id: 866550311766439000,
//     variant_id: 35699002114207,
//     title: "Men's Rebel White",
//     quantity: 1,
//     sku: '6430076280558',
//     variant_title: null,
//     vendor: null,
//     fulfillment_service: 'manual',
//     product_id: 5536717570207,
//     requires_shipping: true,
//     taxable: true,
//     gift_card: false,
//     name: "Men's Rebel White",
//     variant_inventory_management: 'shopify',
//     properties: [],
//     product_exists: true,
//     fulfillable_quantity: 1,
//     grams: 1100,
//     price: '99.00',
//     total_discount: '0.00',
//     fulfillment_status: null,
//     price_set: { shop_money: [Object], presentment_money: [Object] },
//     total_discount_set: { shop_money: [Object], presentment_money: [Object] },
//     discount_allocations: [],
//     duties: [],
//     admin_graphql_api_id: 'gid://shopify/LineItem/866550311766439020',
//     tax_lines: []
//   },
//   {
//     id: 141249953214522980,
//     variant_id: 35699031081119,
//     title: "Women's Stealth Black",
//     quantity: 1,
//     sku: '6430076280664',
//     variant_title: null,
//     vendor: null,
//     fulfillment_service: 'manual',
//     product_id: 5536720519327,
//     requires_shipping: true,
//     taxable: true,
//     gift_card: false,
//     name: "Women's Stealth Black",
//     variant_inventory_management: 'shopify',
//     properties: [],
//     product_exists: true,
//     fulfillable_quantity: 1,
//     grams: 1100,
//     price: '99.00',
//     total_discount: '5.00',
//     fulfillment_status: null,
//     price_set: { shop_money: [Object], presentment_money: [Object] },
//     total_discount_set: { shop_money: [Object], presentment_money: [Object] },
//     discount_allocations: [ [Object] ],
//     duties: [],
//     admin_graphql_api_id: 'gid://shopify/LineItem/141249953214522974',
//     tax_lines: []
//   }
// ]

module.exports = router
