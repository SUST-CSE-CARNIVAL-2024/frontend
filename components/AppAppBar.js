import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import Link from "next/link";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
  padding: "10px",
};

function AppAppBar({ mode, toggleColorMode }) {
  const [formData, setFormData] = React.useState({
    ques1: "",
    ques2: "",
    ques3: "",
    ques4: "",
    mentorQues1: "",
    mentorQues2: "",
    mentor: "",
  });
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = (e) => {
    localStorage.removeItem("email");
  };

  const handleChatFormSubmit = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    const user = localStorage.getItem("email");
    setUser(user);
  }, [user]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", maxWidth: 740, paddingTop: "200px" }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ paddingLeft: "100px", color: "blue" }}
            >
              YOU ARE ONE STEP AWAY
            </Typography>
          </Box>
          <Box width="100%">
            <form onSubmit={handleChatFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Questionnaire</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="How have you been feeling emotionally lately?"
                    name="ques1"
                    value={formData.ques1}
                    onChange={(e) => {
                      setFormData({ ...formData, ques1: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <Typography variant="h6">
                        {" "}
                        Are you willing to serve as a Mentor?
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-label="mentor"
                      name="mentor"
                      value={formData.mentor}
                      onChange={(e) => {
                        setFormData({ ...formData, mentor: e.target.value });
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="YES"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="NO"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {formData.mentor === "yes" && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Why are you interested in mentoring?"
                      name="mentorQues1"
                      value={formData.mentorQues1}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mentorQues1: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                )}
                {formData.mentor === "yes" && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Share any previous experience as a mentor?"
                      name="mentorQues2"
                      value={formData.mentorQues2}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          mentorQues2: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="How would you rate your overall stress level?"
                    name="ques2"
                    value={formData.ques2}
                    onChange={(e) => {
                      setFormData({ ...formData, ques2: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Do you find yourself losing interest in activities you once enjoyed?"
                    name="ques3"
                    value={formData.ques3}
                    onChange={(e) => {
                      setFormData({ ...formData, ques3: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Have you had any thoughts of harming yourself or others?"
                    name="ques4"
                    value={formData.ques4}
                    onChange={(e) => {
                      setFormData({ ...formData, ques4: e.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Typography variant="subtitle" color="text.primary">
                <h1 style={logoStyle}>SOUL_BUET</h1>
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography variant="body2" color="text.primary">
                    Forums
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    onClick={handleOpen}
                  >
                    Chat
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {!user && (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/material-ui/getting-started/templates/sign-in/"
                  target="_blank"
                >
                  Sign in
                </Button>
              )}
              {!user && (
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  href="/signup"
                  // onClick={handleSignUp}
                  target="_blank"
                >
                  Sign Up
                </Button>
              )}
              {user && (
                <Avatar
                  onClick={handleSignOut}
                  sx={{ bgcolor: deepPurple[500] }}
                >
                  {user.substring(0, 2)}
                </Avatar>
              )}
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                // onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right">
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem>Forums</MenuItem>
                  <MenuItem onClick={handleOpen}>Chat</MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;