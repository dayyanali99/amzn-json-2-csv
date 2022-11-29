function convertToObjsWithCustomFields(obj, siteName) {
  let productsArr = [];

  for (const product of obj.products) {
    const tempObj = {};
    tempObj["ASIN"] = product.asin;
    tempObj["Name"] = product.title.displayString;
    tempObj["Link"] = product.links.viewOnAmazon.url;
    tempObj["Product Category"] = product.productCategory.productType;

    tempObj["Product Images"] = "";
    for (const image of product.productImages?.images) {
      const imgRes = image.hiRes || image.lowRes;
      tempObj["Product Images"] +=
        imgRes.url.toString() + " ;" || imgRes.url.toString() + " ;";
    }
    tempObj["Min Price"] =
      product.marketplaceOfferSummary.newOfferSummary?.minPrice.displayString;
    tempObj["Max Price"] =
      product.marketplaceOfferSummary.newOfferSummary?.maxPrice.displayString;
    tempObj["Sitename"] = siteName;
    tempObj["Parent Category"] =
      product.bindingInformation?.binding?.displayString;
    tempObj["Feature Bullets"] = "";
    for (const featureBullet of product.featureBullets?.featureBullets) {
      tempObj["Feature Bullets"] += featureBullet.toString() + " ;";
    }
    tempObj["Number of Variants"] =
      product.swatchImages?.dimensions[0].dimensionValues.length || 1;
    tempObj["Customer Reviews"] =
      product.customerReviewsSummary?.rating.displayString;

    productsArr.push(tempObj);
  }

  return productsArr;
}

module.exports = convertToObjsWithCustomFields;
