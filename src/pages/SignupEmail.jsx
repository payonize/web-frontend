import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
  FormHelperText,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Toolbar,
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { UtilsContext } from "../contexts/UtilsContext";
import { signup } from "../utils/AuthFn";
import { countries } from "../utils/Countries";
import Navbar from "../components/Navbar";
import axios from "axios";

const SignupEmail = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [acceptMU, setAcceptMU] = useState(false);
  const [phoneErr, setPhoneErr] = useState(null);
  const [togglePassword, setTogglePassword] = useState("password");
  const [visibilityColor, setVisibilityColor] = useState("817e7e");
  const [defaultCountry, setDefaultCountry] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const { errorMsg, loading } = useContext(UtilsContext);
  const { setErrorMsg } = useContext(UtilsContext);
  const { setLoading } = useContext(UtilsContext);
  const navigate = useNavigate();

  const theme = useTheme();
  console.log(theme);
  const md = useMediaQuery(theme.breakpoints.up("md"));

  console.log(loading);
  console.log({ country });

  const handleClick = async (
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    acceptMU
  ) => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setErrorMsg({ confirmPassword: "Passwords are not the same" });
        setTimeout(() => {
          setErrorMsg({ confirmPassword: null });
        }, 5000);
        throw Error("Passwords are not the same");
      }

      await signup(firstName, lastName, email, phoneNumber, password, acceptMU);
      setLoading(false);
      navigate("/confirm-email");
    } catch (error) {
      setLoading(false);
      if (error.message.includes("email")) {
        setErrorMsg({ email: "This email is already in use" });
        setTimeout(() => {
          setErrorMsg({ email: null });
        }, 5000);
      }

      if (error.message.includes("password")) {
        setErrorMsg({
          password:
            "Password must be at least 8 characters with 1 letter and 1 number",
        });
        setTimeout(() => {
          setErrorMsg({ password: null });
        }, 5000);
      }
    }
  };

  const handleChange = {
    acceptTnC: function (e) {
      setAcceptTnC(e.target.checked);
    },

    acceptMU: function (e) {
      setAcceptMU(e.target.checked);
    },

    changeCountry: function (e) {
      setCountry(e.target.value);
    },

    setPhoneErr: function (length) {
      console.log(length.length);
      if (length.length < 5 || length.length > 14) {
        setPhoneErr("Please enter a valid phone number.");
      } else {
        setPhoneErr(null);
      }
    },
  };

  useMemo(async () => {
    try {
      const { data } = await axios.get("https://ipapi.co/json/");
      setDefaultCountry(data.country_name);
      const name = countries.find((item) => item.name === defaultCountry);
      setCountryCode(name.mobileCode);
      setCountry(defaultCountry);
    } catch (error) {
      return "Request failed";
    }
  }, [defaultCountry]);

  return (
    <Box>
      <Navbar />
      <Toolbar sx={{ mb: 1 }} />
      {md ? (
        <Box
          className="signupParent"
          sx={{
            position: "relative",
            height: "150vh",
            pb: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: "600px",
              width: "80%",
              margin: "0px auto",
              backgroundColor: "#817e7e",
              opacity: 0.9,
              top: "60px",
              pt: 6,
              pl: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ffffff", width: "25%" }}
            >
              Complete your registration to start transacting with Payonize
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              position: "absolute",
              width: "35%",
              top: "5px",
              right: "20%",
              boxShadow: 3,
              borderRadius: 1,
              mx: 2,
              px: 4,
              py: 4,
              mb: 4,
            }}
          >
            <Typography
              className="headingStyle"
              variant="h4"
              sx={{ fontWeight: "bold", pb: 4 }}
            >
              Create Personal Account
            </Typography>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleClick(
                  firstName,
                  lastName,
                  email,
                  phoneNumber,
                  password,
                  confirmPassword,
                  acceptMU
                );
              }}
            >
              <label>First Name</label>
              <TextField
                type="text"
                fullWidth
                required
                size="small"
                sx={{ mt: 1, mb: 2 }}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                inputProps={{
                  minLength: 3,
                }}
              />

              <label>Last Name</label>
              <TextField
                type="text"
                fullWidth
                required
                size="small"
                sx={{ mt: 1, mb: 2 }}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                inputProps={{
                  minLength: 3,
                }}
              />

              <label>Email</label>
              <TextField
                type="email"
                fullWidth
                required
                size="small"
                sx={{ mt: 1 }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormHelperText error sx={{ mb: 2 }}>
                {errorMsg.email}
              </FormHelperText>

              <label>Phone Number</label>

              <Box display={"flex"}>
                <TextField
                  select
                  sx={{ mt: 1, mr: 2 }}
                  value={country}
                  onChange={handleChange.changeCountry}
                  size="small"
                >
                  {countries.map((country) => (
                    <MenuItem value={country.name} key={country.name}>
                      {country.mobileCode}: {country.code}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  fullWidth
                  required
                  size="small"
                  sx={{ mt: 1 }}
                  onChange={(e) => {
                    const digits = e.target.valueAsNumber;
                    setPhoneNumber(`${countryCode}${digits}`);
                    handleChange.setPhoneErr(e.target.value);
                    console.log(phoneNumber);
                  }}
                  onMouseOut={(e) => {}}
                />
              </Box>
              <FormHelperText error sx={{ mb: 2 }}>
                {phoneErr}
              </FormHelperText>

              <label>Password</label>
              <TextField
                type={togglePassword}
                fullWidth
                required
                size="small"
                sx={{ mt: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        if (togglePassword === "password") {
                          setTogglePassword("text");
                          setVisibilityColor("54adf3");
                        } else {
                          setTogglePassword("password");
                          setVisibilityColor("817e7e");
                        }
                      }}
                    >
                      <VisibilityOffIcon
                        sx={{ color: `#${visibilityColor}` }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormHelperText error sx={{ mb: 2 }}>
                {errorMsg.password}
              </FormHelperText>

              <label>Confirm Password</label>
              <TextField
                type="password"
                fullWidth
                required
                size="small"
                sx={{ mt: 1 }}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormHelperText error sx={{ mb: 2 }}>
                {errorMsg.confirmPassword}
              </FormHelperText>

              <FormControlLabel
                label="I have read and agreed to Payonize Terms of Service and Privacy Policy"
                control={
                  <Checkbox
                    checked={acceptTnC}
                    onChange={handleChange.acceptTnC}
                  />
                }
              />

              <FormControlLabel
                label="I agree to receive marketing updates from Payonize"
                control={
                  <Checkbox
                    checked={acceptMU}
                    onChange={handleChange.acceptMU}
                  />
                }
              />

              <Button
                className="buttonStyle"
                type="submit"
                variant="contained"
                fullWidth
                disabled={acceptTnC === false || loading || phoneErr !== null}
                sx={{
                  py: 1.5,
                  px: 3,
                  mt: 2,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  color: "#000000",
                  background: "#54adf3",
                  ":hover": {
                    background: "#54adf3",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={"1.5rem"} sx={{ color: "#ffffff" }} />
                ) : (
                  "Create Personal Account"
                )}
              </Button>
            </form>

            <Typography sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#54adf3" }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ py: 2, px: 4 }}>
          <Typography
            className="headingStyle"
            variant="h4"
            sx={{ fontWeight: "bold", pb: 4 }}
          >
            Create Personal Account
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword,
                acceptMU
              );
            }}
          >
            <label>First Name</label>
            <TextField
              type="text"
              fullWidth
              required
              size="small"
              sx={{ mt: 1, mb: 2 }}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              inputProps={{
                minLength: 3,
              }}
            />

            <label>Last Name</label>
            <TextField
              type="text"
              fullWidth
              required
              size="small"
              sx={{ mt: 1, mb: 2 }}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              inputProps={{
                minLength: 3,
              }}
            />

            <label>Email</label>
            <TextField
              type="email"
              fullWidth
              required
              size="small"
              sx={{ mt: 1 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <FormHelperText error sx={{ mb: 2 }}>
              {errorMsg.email}
            </FormHelperText>

            <label>Phone Number</label>

            <Box display={"flex"}>
              <TextField
                select
                sx={{ mt: 1, mr: 2 }}
                value={country}
                onChange={handleChange.changeCountry}
                size="small"
              >
                {countries.map((country) => (
                  <MenuItem value={country.name} key={country.name}>
                    {country.mobileCode}: {country.code}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                type="number"
                fullWidth
                required
                size="small"
                sx={{ mt: 1 }}
                onChange={(e) => {
                  const digits = e.target.valueAsNumber;
                  setPhoneNumber(`${countryCode}${digits}`);
                  handleChange.setPhoneErr(e.target.value);
                  console.log(phoneNumber);
                }}
                onMouseOut={(e) => {}}
              />
            </Box>
            <FormHelperText error sx={{ mb: 2 }}>
              {phoneErr}
            </FormHelperText>

            <label>Password</label>
            <TextField
              type={togglePassword}
              fullWidth
              required
              size="small"
              sx={{ mt: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      if (togglePassword === "password") {
                        setTogglePassword("text");
                        setVisibilityColor("54adf3");
                      } else {
                        setTogglePassword("password");
                        setVisibilityColor("817e7e");
                      }
                    }}
                  >
                    <VisibilityOffIcon sx={{ color: `#${visibilityColor}` }} />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText error sx={{ mb: 2 }}>
              {errorMsg.password}
            </FormHelperText>

            <label>Confirm Password</label>
            <TextField
              type="password"
              fullWidth
              required
              size="small"
              sx={{ mt: 1 }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormHelperText error sx={{ mb: 2 }}>
              {errorMsg.confirmPassword}
            </FormHelperText>

            <FormControlLabel
              label="I have read and agreed to Payonize Terms of Service and Privacy Policy"
              control={
                <Checkbox
                  checked={acceptTnC}
                  onChange={handleChange.acceptTnC}
                />
              }
            />

            <FormControlLabel
              label="I agree to receive marketing updates from Payonize"
              control={
                <Checkbox checked={acceptMU} onChange={handleChange.acceptMU} />
              }
            />

            <Button
              className="buttonStyle"
              type="submit"
              variant="contained"
              fullWidth
              disabled={acceptTnC === false || loading || phoneErr !== null}
              sx={{
                py: 1.5,
                px: 3,
                mt: 2,
                fontWeight: "bold",
                textTransform: "capitalize",
                color: "#000000",
                background: "#54adf3",
                ":hover": {
                  background: "#54adf3",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={"1.5rem"} sx={{ color: "#ffffff" }} />
              ) : (
                "Create Personal Account"
              )}
            </Button>
          </form>

          <Typography sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#54adf3" }}>
              Log In
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SignupEmail;
