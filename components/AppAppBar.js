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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "axios";
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
import { useRouter } from "next/navigation";
import { Store } from "react-notifications-component";

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
  const notification = {
    title: "Your Request is in progress",
    message: "Someones will receive your request soon",
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
  };
  const [formData, setFormData] = React.useState({
    assistance: "",
    current_situation: "",
    assistance_details: "",
  });
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  //state to capture the far user email
  const [farUser, setFarUser] = React.useState("");

  const openNotifications = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    //get the notifications
    axios
      .get("http://localhost:3002/user/get_Notification", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log("response is ", response);
        localStorage.setItem("preSessionId", response.data[0].preChatSessionId);
        localStorage.setItem("opposite_email", response.data[0].opposit_email);
        setFarUser(response.data.email);
        //set the notification here
        Store.addNotification({
          ...notification,
          // onClick: handleNotificationClick,
          title: `Someone wants to connect with you`,
          dismiss: {
            duration: 2000,
            pauseOnHover: true,
          },
          touchSlidingExit: {
            swipe: {
              duration: 2000,
              timingFunction: "ease-out",
              delay: 0,
            },
            fade: {
              duration: 2000,
              timingFunction: "ease-out",
              delay: 0,
            },
          },
        });
        // send confirm message
        // axios.post(
        //   "http://localhost:3002/user/confirm_Chat",
        //   {
        //     preSessionId: localStorage.getItem("preSessionId"),
        //   },
        //   {
        //     headers: {
        //       Authorization: "Bearer " + token,
        //     },
        //   }
        // );
        //now route to the chat page
        setTimeout(() => {
          router.push("/chat");
        }, 3000);
      });
  };

  const handleSignOut = (e) => {
    localStorage.removeItem("email");
  };

  const handleChatFormSubmit = (e) => {
    e.preventDefault();
  };
  const handleCreateSession = (e) => {
    e.preventDefault();
    console.log("fron handleCreateSession");
    let questionAnswers = [
      "client",
      "Lately, I've been feeling a mix of emotions, fluctuating between feeling content and moments of anxiety due to various personal and professional challenges.",
      "My typical daily mood tends to be fairly stable, with a general sense of optimism, though I occasionally experience stress-related dips.",
      "Yes, I've noticed some changes in my sleep patterns, including difficulty falling asleep and waking up a few times during the night, which seems to be linked to my current stress levels.",
      "I would rate my overall stress level as moderate. While I manage to cope with most day-to-day tasks, there are moments when stress becomes more pronounced.",
      "Specific situations causing me distress include looming work deadlines and personal commitments. Balancing these responsibilities has been particularly challenging lately.",
    ];
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3002/user/request_Chat",
        {
          questionnaires: questionAnswers,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log("response is ", response);
        // localStorage.setItem("preSessionId",response.data.preSessionId);
        setOpen(false);
        //set the notification here
        Store.addNotification({
          ...notification,
          title: `Your Request is in progress`,
          dismiss: {
            duration: 3000,
            pauseOnHover: true,
          },
          touchSlidingExit: {
            swipe: {
              duration: 2000,
              timingFunction: "ease-out",
              delay: 0,
            },
            fade: {
              duration: 2000,
              timingFunction: "ease-out",
              delay: 0,
            },
          },
        });
      })
      .catch((error) => {
        // Handle error
      });
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
          <Box sx={{ width: "100%", maxWidth: 740 }}>
            <Typography variant="h3" gutterBottom sx={{ color: "blue" }}>
              Say something about you
            </Typography>
          </Box>
          <Box width="100%">
            <form onSubmit={handleChatFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      <Typography variant="h6">
                        {" "}
                        Whom do you want to talk with?
                      </Typography>
                    </FormLabel>
                    <RadioGroup
                      aria-label="assistance"
                      name="assistance"
                      value={formData.assistance}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          assistance: e.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="mentor"
                        control={<Radio />}
                        label="A Mentor"
                      />
                      <FormControlLabel
                        value="user"
                        control={<Radio />}
                        label="A Listener"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Kindly explain your current situation you are going through"
                    name="current_situation"
                    value={formData.current_situation}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        current_situation: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="What kind of assistance do you expect from your chatmate?"
                    name="assistance_details"
                    value={formData.assistance_details}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        assistance_details: e.target.value,
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    onClick={handleCreateSession}
                    variant="outlined"
                    color="primary"
                    type="submit"
                  >
                    Create Session
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
                <MenuItem
                  onClick={openNotifications}
                  sx={{ py: "6px", px: "12px" }}
                >
                  {/* <Typography variant="body2" color="text.primary"> */}
                  <NotificationsActiveIcon />
                  {/* </Typography> */}
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
                  href="/signin"
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
                      href="/signin"
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
