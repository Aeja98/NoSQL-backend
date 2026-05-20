const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const WorkExperience = require("../models/workExperience");

// Helper function for validating work experience input
function validateWorkExperience(data) {
  const errors = [];

  const requiredFields = [
    "companyname",
    "jobtitle",
    "location",
    "startdate",
    "enddate",
    "description"
  ];

  requiredFields.forEach((field) => {
    if (!data[field] || data[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return errors;
}

// Helper function for checking valid MongoDB id
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET all work experiences
router.get("/", async (req, res) => {
  try {
    const workExperiences = await WorkExperience.find().sort({ startdate: -1 });

    res.json(workExperiences);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Could not fetch work experiences"
    });
  }
});

// GET one work experience by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      error: "Invalid id"
    });
  }

  try {
    const workExperience = await WorkExperience.findById(id);

    if (!workExperience) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json(workExperience);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      error: "Could not fetch work experience"
    });
  }
});

// POST new work experience
router.post("/", async (req, res) => {
  const {
    companyname,
    jobtitle,
    location,
    startdate,
    enddate,
    description
  } = req.body;

  const validationErrors = validateWorkExperience(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      messages: validationErrors
    });
  }

  try {
    const newWorkExperience = await WorkExperience.create({
      companyname: companyname.trim(),
      jobtitle: jobtitle.trim(),
      location: location.trim(),
      startdate,
      enddate,
      description: description.trim()
    });

    res.status(201).json({
      message: "Work experience added",
      workExperience: newWorkExperience
    });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({
      error: "Could not add work experience"
    });
  }
});

// PUT update work experience
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      error: "Invalid id"
    });
  }

  const {
    companyname,
    jobtitle,
    location,
    startdate,
    enddate,
    description
  } = req.body;

  const validationErrors = validateWorkExperience(req.body);

  if (validationErrors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      messages: validationErrors
    });
  }

  try {
    const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(
      id,
      {
        companyname: companyname.trim(),
        jobtitle: jobtitle.trim(),
        location: location.trim(),
        startdate,
        enddate,
        description: description.trim()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedWorkExperience) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json({
      message: "Work experience updated",
      workExperience: updatedWorkExperience
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: "Could not update work experience"
    });
  }
});

// DELETE work experience
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({
      error: "Invalid id"
    });
  }

  try {
    const deletedWorkExperience = await WorkExperience.findByIdAndDelete(id);

    if (!deletedWorkExperience) {
      return res.status(404).json({
        error: "Work experience not found"
      });
    }

    res.json({
      message: "Work experience deleted"
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      error: "Could not delete work experience"
    });
  }
});

module.exports = router;