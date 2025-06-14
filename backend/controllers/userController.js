const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PendingUser = require('../models/pendingUser');
const nodemailer=require('nodemailer')


// Signup

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Strong password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password should have at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and minimum 8 characters"
      });
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Remove any existing pending user for same email
    const existingPending = await PendingUser.findOne({ email });
    if (existingPending) {
      await PendingUser.deleteOne({ email });
    }

    //  Create new pending user with hashed password and OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60000); // 5 minutes

    const pendingUser = new PendingUser({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires
    });
    await pendingUser.save();

    //  Send OTP via Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Hello ${name},\n\nYour OTP is: ${otp}. Please use it within 5 minutes.\n\nThank you!`
    };

    await transporter.sendMail(mailOptions)
      .then(() => console.log(`OTP email sent to ${email}`))
      .catch((err) => {
        console.error("Error sending OTP mail:", err);
        return res.status(500).json({
          message: "Failed to send OTP Email",
          error: err.message
        });
      });

   
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    };

    res.cookie("email", email, cookieOptions);

    res.status(200).json({ message: "OTP Sent Successfully! Check Email" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error", error: error.message });
  }
};




// OTP Verify & User Register
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const pendingUser = await PendingUser.findOne({ email });
        if (!pendingUser) return res.status(400).json({ message: ' ! NOT Pending User !' });

        if (pendingUser.otp !== otp) return res.status(400).json({ message: 'OTP Wrong!' });

        if (pendingUser.otpExpires < new Date()) {
            await PendingUser.deleteOne({ email });
            return res.status(400).json({ message: 'OTP Expired. Please try again.' });
        }

        const newUser = new User({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password
        });

        await newUser.save();
        await PendingUser.deleteOne({ email });

        res.status(201).json({ message: 'User Registered Successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Email or Password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Email or Password' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Ideally, use env variable!
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login Successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
//Profile
exports.getProfile = (req, res) => {
    res.status(200).json({ 
      message: `Welcome, ${req.user.email}!`, 
      user: req.user 
    });
  };


  