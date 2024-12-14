const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {generateVerificationToken} = require('../utils/generateVerificationToken.js');
const {generateJWTToken} = require('../utils/generateJWTToken.js');
const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail,sendResetSuccessfulEmail } = require('../resend/email.js');
const crypto = require('crypto');

// Get all users


// Get a user by ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({success: false, message: "User not Found"});
        }     
        res.status(200).json( {...user._doc, password: undefined} )
    } catch(error) {
        console.log('Error checking authentification', error);
        res.status(400).json({success: false, message: error.message});
    }
  }

// Create a new user
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        if(!name || !email || !password) {
            return(res.status(400).json({message: "All Fields Required"}))
        }
        const userExists = await User.findOne({email});
        if (userExists) {
            return(res.status(400).json({message: "User Already Exists"}))
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = generateVerificationToken();
        const user = new User({ 
            name, 
            email, 
            password:hashedPassword, 
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 
        }); // Create a new user instance
        await user.save(); // Save the user to the database
        generateJWTToken(res, user._id); 
        await sendVerificationEmail(user.email, verificationToken);
        res.status(200).json({
            success: true, 
            message: 'User created', 
            user: {
                ...user._doc,
                password:undefined
            } 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(userId); // Delete the user by ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User with ID: ${userId} deleted` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({success:false, error: 'Invalid login credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success:false, error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id }, 'your_jwt_secret');
        const isVerified = user.isVerified; //check if user verified their email
        if(!isVerified) {
            return res.status(400).json({success:false, error: 'Email not verified' });
        }

        generateJWTToken(res,user._id);
        res.status(200).json({success: true, message:"Login successful"});
    } catch (err) {
        console.log("error logging in" , err);
        res.status(400).json({success:false, message: err.memssage });
    }
};

const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt:Date.now()}
        })
        if(!user) {
            return res.status(400).json({message: "Invalid or expired verification code"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        res.status(200).json({success:true, message: "Email verified successfully"});
    } catch(error) {
        console.log("Error Verifying Email");
        res.status(400).json({success: false, message:error.message});
    }
}
const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
}
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({email});  
        if (!user) {
            return res.status(400).json({success: false, message: "User not Found"});
        }     
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpiresAt = Date.now() + 1  * 60 * 60 * 1000;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        res.status(200).json({success: true, message:"Password reset email sent"});
    } catch(error) {
        console.log('Error sending password reset email', error);
        res.status(400).json({success: false, message: error.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const {password} = req.body;
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpiresAt: {$gt: Date.now()}});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired reset token"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;
        await user.save();

        await sendResetSuccessfulEmail(user.email);
        res.status(200).json({success: true, message:"Password reset success email sent"});
    } catch(error) {

        console.log('Error sending reset success email', error);
        res.status(400).json({success: false, message: error.message});
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({success: false, message: "User not Found"});
        }     
        res.status(200).json({success: true, user: {...user._doc, password: undefined}})
    } catch(error) {
        console.log('Error checking authentification', error);
        res.status(400).json({success: false, message: error.message});
    }
}

const isAdmin = async (req, res) => {
    const { userId, adminPassword } = req.body;
  
    try {
      // Check if the admin password is correct
      if (adminPassword !== "AdminPassword") {
        return res.status(403).json({ success: false, message: "Invalid admin password" });
      }
  
      // Fetch user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Update user's isAdmin property
      user.isAdmin = true;
      await user.save();
  
      res.status(200).json({ success: true, message: "User is now an administrator" });
    } catch (error) {
      console.error("Error making user admin:", error);
      res.status(500).json({ success: false, message: "An error occurred" });
    }
  };
  
  
module.exports = { isAdmin, getUser, signup, logout, deleteUser, login, verifyEmail,forgotPassword, resetPassword,checkAuth };