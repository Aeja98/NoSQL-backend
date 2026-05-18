const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: [true, "companyname is required"],
      trim: true
    },
    jobtitle: {
      type: String,
      required: [true, "jobtitle is required"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "location is required"],
      trim: true
    },
    startdate: {
      type: String,
      required: [true, "startdate is required"]
    },
    enddate: {
      type: String,
      required: [true, "enddate is required"]
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("WorkExperience", workExperienceSchema);