const { DateTime } = require("luxon");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});
AuthorSchema.virtual("name").get(function () {
  return this.family_name + "," + this.first_name;
});

AuthorSchema.virtual("lifespan").get(function () {
  return this.date_of_death.getYear() - this.date_of_birth.getYear();
});

AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});
AuthorSchema.virtual("lifespan_formatted").get(function () {
  const birth = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
  const death = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
  return `${birth} - ${death}`;
});

module.exports = mongoose.model("Author", AuthorSchema);