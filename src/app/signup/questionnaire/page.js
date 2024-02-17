"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useStateValue } from "../../../../components/StateProvider";

const QuestionnaireForm = () => {
  const [signUpdata, setSignUpData] = useState(null);
  const [formData, setFormData] = useState({
    ques1: "",
    ques2: "",
    ques3: "",
    ques4: "",
    mentorQues1: "",
    mentorQues2: "",
    mentor: "",
  });
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, like submit to a server or perform client-side validation
    //if the formdata mentor is false, then set the mentorQues1 and mentorQues2 to empty string
    if (formData.mentor === "no") {
      setFormData({ ...formData, mentorQues1: "", mentorQues2: "" });
    }
    console.log("form data is", formData);
    //here signup request will be sent to the server
    //redirect to the home page
    //get the data from the redux about the sign up
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const resultFromSignUp = { email, password };
    setSignUpData(resultFromSignUp);
    console.log("data from signup page ", resultFromSignUp);
    //send the sign up data and questionaire data to the server
    //clean the password
    localStorage.removeItem("password");
    router.push("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box sx={{ width: "100%", maxWidth: 740, paddingTop: "200px" }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ paddingLeft: "100px", color: "blue" }}
        >
          YOU ARE ONE STEP AWAY
        </Typography>
      </Box>
      <Box width="50%">
        <form onSubmit={handleSubmit}>
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
                  <FormControlLabel value="no" control={<Radio />} label="NO" />
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
                    setFormData({ ...formData, mentorQues1: e.target.value });
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
                    setFormData({ ...formData, mentorQues2: e.target.value });
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
    </Box>
  );
};

export default QuestionnaireForm;
