import { Course } from "../modals/course.modal.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../modals/purchase.modal.js";

export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;
  //console.log(title, description, price);

  try {
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ errors: "No image uploaded" });
    }

    const image = req.files.image;

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file format, only PNG and JPG are allowed",
      });
    }

    // Cloudinary upload
    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloud_response || cloud_response.error) {
      return res
        .status(400)
        .json({ errors: "Error uploading file to Cloudinary" });
    }

    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.secure_url,
      },
      creatorId: adminId,
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;
  try {
    const courseSearch = await Course.findById(courseId);
    if (!courseSearch) {
      return res.status(404).json({ error: "Course not found" });
    }
    const course = await Course.findOneAndUpdate(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    );
    if (!course) {
      return res
        .status(404)
        .json({ errors: "can't update, created by another admin" });
    }
    res.status(201).json({ message: "Course updated succesfully" });
  } catch (error) {
    console.log("Error in updating", error);
    res.status(500).json({ errors: "Error in course updating" });
  }
};

export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res
        .status(404)
        .json({ errors: "cannot delete, Course created by other admin" });
    }
    res.status(200).json({ message: "Course deleted succesfully" });
  } catch (error) {
    res.status(500).json({ errors: "Error in course deleting" });
    console.log("Error in course deleting", error);
  }
};
export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(201).json({ courses });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting courses" });
    console.log("Error to get courses", error);
  }
};
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ errors: "Error in getting course details" });
    console.log("Error in course details", error);
  }
};

import Stripe from "stripe";
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY);
console.log(config.STRIPE_SECRET_KEY);
export const buyCourses = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ errors: "Course not found" });
    }
    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ errors: "Already purchased the course" });
    }

    //stripe payment code
    const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
    });

    const newPurchase = await Purchase({ userId, courseId });
    await newPurchase.save();
    res.status(201).json({
      message: "Course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ errors: "Error in course buying" });
    console.log("Error in course buying", error);
  }
};
