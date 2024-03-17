class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const name = queryObj.name; // Skip regex for name, don't want to replace matches in name with regex
		const excludedFields = ["page", "sort", "limit", "fields", "name"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt|ne|in)\b/g, // Add more MongoDB operators here as needed
			(match) => `$${match}`
		);

		// Add case insensitive partial match for name
		if (name) {
			this.query = this.query.find({
				name: { $regex: name, $options: "i" },
			});
		}

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}
		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}
		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}

	count() {
		return this.query.countDocuments();
	}
}

module.exports = APIFeatures;
