import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Box,
  FormHelperText,
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

import { UtilsContext } from "../contexts/UtilsContext";
import { login } from "../utils/AuthFn";
import { googleLogin } from "../utils/AuthFn";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [togglePassword, setTogglePassword] = useState("password");
  const [visibilityColor, setVisibilityColor] = useState("817e7e");

  const { loading } = useContext(UtilsContext);
  const { errorMsg } = useContext(UtilsContext);
  const { setErrorMsg } = useContext(UtilsContext);
  const { setLoading } = useContext(UtilsContext);
  const navigate = useNavigate();

  const handleClick = {
    login: async (email, password) => {
      try {
        setLoading(true);
        await login(email, password);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        setErrorMsg({ passwordLogin: "Incorrect email or password" });
        setTimeout(() => {
          setErrorMsg({ passwordLogin: null });
        }, 5000);
      }
    },

    googleLogin: async () => {
      await googleLogin();
    },
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ px: 2 }}
        alignItems="center"
        direction="row-reverse"
      >
        <Grid item xs={12} md={4} sx={{ mr: { md: 15 }, p: { md: 5 } }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", pb: 4 }}>
            Payonize Login
          </Typography>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick.login(email, password);
            }}
          >
            <label>Email</label>
            <TextField
              type="email"
              fullWidth
              required
              size="small"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ mb: 2 }}
            />

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
              {errorMsg.passwordLogin}
            </FormHelperText>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.5,
                px: 3,
                mt: 1,
                mb: 1,
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
                "Login"
              )}
            </Button>
          </form>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              my: 2,
            }}
          >
            <Box
              sx={{
                background: "#817e7e",
                height: "1px",
                flex: 1,
              }}
            ></Box>
            <Box sx={{ px: 2 }}>or</Box>
            <Box
              sx={{
                background: "#817e7e",
                height: "1px",
                flex: 1,
              }}
            ></Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              px: 3,
              mt: 1,
              textTransform: "capitalize",
              background: "#b4b2b2",
              color: "#000000",
              ":hover": {
                background: "#b4b2b2",
              },
            }}
            onClick={async () => {
              await handleClick.googleLogin();
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <GoogleIcon sx={{ mr: 1 }} /> <span>Continue with Google</span>
            </Box>
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              px: 3,
              mt: 3,
              textTransform: "capitalize",
              background: "#b4b2b2",
              color: "#000000",
              ":hover": {
                background: "#b4b2b2",
              },
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <AppleIcon sx={{ mr: 1 }} /> <span>Continue with Apple</span>
            </Box>
          </Button>

          <Typography sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "#54adf3" }}>
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
