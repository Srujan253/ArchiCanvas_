import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Palette,
  Building2,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    Interested: "",
    bio: "",
  });
  const [userType, setUserType] = useState("artist"); // 'artist' or 'buyer'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const specializations = [
    "Painter",
    "Sculptor",
    "Architect",
    "Digital Artist",
    "Photographer",
    "Mixed Media",
    "Installation Artist",
    "Graphic Designer",
    "Illustrator",
    "Other",
  ];
    const Interested = [
    "Painting",
    "Sculptor",
    "Architecture",
    "Digital Art",
    "Photograph",
    "Mixed Media",
    "Installation Art",
    "Graphic Design",
    "Illustrate",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      let submitData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        type: userType,
      };
      if (userType === "artist") {
        submitData.specialization = formData.specialization;
        submitData.bio = formData.bio;
      }
      await register(submitData);
      toast.success("Registration successful! Please wait for admin approval.");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="text-3xl font-serif font-bold text-gradient">
              ArchiCanvas
            </span>
          </Link>
        </div>

        {/* Registration Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-8 border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-base-content mb-2">
              Join as {userType === "artist" ? "an Artist" : "a Buyer"}
            </h1>
            <p className="text-base-content/70">
              {userType === "artist"
                ? "Create your artist profile and start sharing your work"
                : "Sign up as a buyer to explore and purchase art"}
            </p>
          </div>

          {/* Toggle for Buyer/Artist */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`px-4 py-2 rounded-l-lg border border-base-300 ${
                userType === "artist"
                  ? "bg-primary-100 text-primary-700 font-bold"
                  : "bg-base-100 text-base-content/70"
              }`}
              onClick={() => setUserType("artist")}
            >
              Artist
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-r-lg border border-base-300 ${
                userType === "buyer"
                  ? "bg-primary-100 text-primary-700 font-bold"
                  : "bg-base-100 text-base-content/70"
              }`}
              onClick={() => setUserType("buyer")}
            >
              Buyer
            </button>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>
           {userType === "buyer" && (
  <div>
    <label
      htmlFor="specialization"
      className="block text-sm font-medium text-base-content mb-2"
    >
      Interested In
    </label>
    <div className="relative">
      <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
      <select
        id="specialization"
        name="Interested"
        value={formData.Interested}
        onChange={handleChange}
        required={true}
        className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content"
      >
        <option value="">Select your Interested Topic</option>
        {Interested.map((inter) => (
          <option key={inter} value={inter}>
            {inter}
          </option>
        ))}
      </select>
    </div>
  </div>
)}

            {userType === "artist" && (
              <>
                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-base-content mb-2"
                  >
                    Specialization
                  </label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                    <select
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required={userType === "artist"}
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content"
                    >
                      <option value="">Select your specialization</option>
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-base-content mb-2"
                  >
                    Bio
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-base-content/40" />
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50 resize-none"
                      placeholder="Tell us about yourself and your artistic journey..."
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  className="w-full pl-10 pr-12 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Create a password (min. 8 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content/60"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-base-content mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-base-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-base-100 text-base-content placeholder-base-content/50"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content/60"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loading loading-spinner loading-sm mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Info Box */}
          {userType === "artist" && (
            <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-info mt-0.5" />
                <div className="text-sm text-info">
                  <p className="font-medium mb-1">Account Approval Required</p>
                  <p>
                    Your account will be reviewed by our admin team. You'll
                    receive an email notification once approved.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-base-content/70 hover:text-base-content transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
