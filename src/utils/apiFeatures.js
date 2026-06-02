export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = Number(this.queryString.page) || 1;
    if (page < 1) page = 1;

    const limit = Number(this.queryString.limit) || 4;
    const skip = (page - 1) * limit;

    this.page = page;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }

  filter() {
    let filterObj = { ...this.queryString };

    const excludedQuery = [
      "page",
      "sort",
      "keyword",
      "fields",
      "limit"
    ];

    excludedQuery.forEach((el) => delete filterObj[el]);

    // Brand
    if (filterObj.brand) {
      filterObj.brand = {
        $in: filterObj.brand.split(",")
      };
    }

    // Category
    if (filterObj.category) {
      filterObj.category = {
        $in: filterObj.category.split(",")
      };
    }

    // Price Range
    if (
      filterObj.minPrice !== undefined ||
      filterObj.maxPrice !== undefined
    ) {
      filterObj.price = {};

      if (
        filterObj.minPrice &&
        !isNaN(filterObj.minPrice)
      ) {
        filterObj.price.$gte = Number(filterObj.minPrice);
      }

      if (
        filterObj.maxPrice &&
        !isNaN(filterObj.maxPrice)
      ) {
        filterObj.price.$lte = Number(filterObj.maxPrice);
      }

      delete filterObj.minPrice;
      delete filterObj.maxPrice;

      // لو مفيش أي شرط سعر اتحط
      if (Object.keys(filterObj.price).length === 0) {
        delete filterObj.price;
      }
    }
    // Rating
    if (filterObj.rating) {
      filterObj.rating = {
        $gte: Number(filterObj.rating)
      };
    }

    // Stock Status
    if (filterObj.stockStatus === "instock") {
      filterObj.stock = { $gt: 0 };
    }

    if (filterObj.stockStatus === "outofstock") {
      filterObj.stock = 0;
    }

    delete filterObj.stockStatus;
console.log(filterObj);
    this.mongooseQuery =
      this.mongooseQuery.find(filterObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          {
            name: {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: this.queryString.keyword,
              $options: "i"
            }
          }
        ],
      });
    }

    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }
}