export default class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    pagination() {

        let page =
            this.queryString.page * 1 || 1;

        if (page <= 0) page = 1;

        let limit = 4;

        let skip =
            (page - 1) * limit;

        this.page = page;

        this.mongooseQuery
            .skip(skip)
            .limit(limit);

        return this;
    }

    filter() {

   let filterObj = { ...this.queryString };

    let excludedQuery = [
        "page",
        "sort",
        "keyword",
        "fields"
    ];

    excludedQuery.forEach((q) => {
        delete filterObj[q];
    });

    // remove empty category
    if (!filterObj.category) {
        delete filterObj.category;
    }

    filterObj =
        JSON.stringify(filterObj);

    filterObj =
        filterObj.replace(
            /\bgt|gte|lt|lte\b/g,
            (match) => `$${match}`
        );

    filterObj =
        JSON.parse(filterObj);

    this.mongooseQuery =
        this.mongooseQuery.find(filterObj);

    return this;

    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery.sort(sortBy);
        }
        return this
    }
    search() {

        if (this.queryString.keyword) {

            this.mongooseQuery =
                this.mongooseQuery.find({

                    $or: [

                        {
                            name: {
                                $regex: this.queryString.keyword,
                                $options: "i"
                            }
                        },

                        {
                            description: {
                                $regex: this.queryString.keyword,
                                $options: "i"
                            }
                        }

                    ]

                });

        }

        return this;
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery.select(fields);
        }
        return this;
    }











}