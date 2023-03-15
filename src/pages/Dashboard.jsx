import { Box, Grid, Toolbar } from "@mui/material";
import { useState } from "react";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardMenu from "../components/DashboardMenu";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import DbColumn1 from "../components/DbColumn1";
import DbColumn2 from "../components/DbColumn2";
import DbColumn3 from "../components/DbColumn3";
import MobileDashboard from "../components/MobileDashboard";
import MobileDashboardMenu from "../components/MobileDashboardMenu";

const pages = [
  {
    name: "Dashboard",
    icon: <DashboardCustomizeIcon />,
    link: "/dashboard",
  },
  {
    name: "Transaction",
    icon: <PaymentsIcon />,
    link: "/transactions",
  },
  {
    name: "Wallet",
    icon: <AccountBalanceWalletIcon />,
    link: "/wallets",
  },
  {
    name: "My Cards",
    icon: <CreditCardIcon />,
    link: "/cards",
  },
  {
    name: "Help",
    icon: <ContactSupportIcon />,
    link: "/help",
  },
];

const utils = [
  {
    name: "Light mode",
    icon: <ToggleOffOutlinedIcon />,
  },
  {
    name: "Setting",
    icon: <SettingsIcon />,
  },
  {
    name: "Log out",
    icon: <LogoutIcon />,
  },
];

const Dashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box sx={{ background: "#0000000" }}>
      <DashboardMenu openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Sidebar pages={pages} utils={utils} />
      <MobileSidebar
        pages={pages}
        utils={utils}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Box
        sx={{
          ml: {
            xs: 0,
            md: "250px",
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            px: 4,
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            sx={{
              mt: 8,
            }}
          >
            <Grid item lg={2.8} md={5.6} xs={11}>
              <Box>
                <DbColumn1 />
              </Box>
            </Grid>
            <Grid item lg={5.6} md={5.6} xs={11}>
              <DbColumn2 />
            </Grid>
            <Grid item lg={2.8} md={5.6} xs={11}>
              <DbColumn3 />
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            px: 4,
            mt: 10,
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Box>
            <MobileDashboard />
            <Toolbar />
            <MobileDashboardMenu />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
