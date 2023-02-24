import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: "#ffffff", boxShadow: "none" }}>
      <Toolbar>
        <img src="logo.png" alt="logo" style={{ width: 175, height: 90 }} />

        <Stack direction="row" sx={{ marginLeft: "auto" }}>
          <Button
            size="large"
            sx={{ borderRadius: 0, borderRight: 1, color: "#000000" }}
          >
            <LanguageIcon fontSize="small" />
          </Button>
          <Button size="large" sx={{ color: "#817e7e" }}>
            <DarkModeIcon fontSize="small" />
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
