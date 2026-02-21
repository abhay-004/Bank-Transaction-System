const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
      unique: [true, "Email already exists"],
    },

    name: {
      type: String,
      required: [true, "Name is required for creating a user"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required for creating a user"],
      min: [6, "Password must be at least 6 characters long"],
      max: [12, "Password must be at most 12 characters long"],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};



module.exports = mongoose.model("User", userSchema);
