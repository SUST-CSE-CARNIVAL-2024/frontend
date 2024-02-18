"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { ViewDay } from "@mui/icons-material";

const QuestionnaireForm = () => {
  const [signUpdata, setSignUpData] = useState(null);
  const [formData, setFormData] = useState({
    ques1: "",
    ques2: "",
    ques3: "",
    ques4: "",
    ques5: "",
    mentorQues1: "",
    mentorQues2: "",
    mentorQues3: "",
    mentorQues4: "",
    mentorQues5: "",
    mentorQues6: "",
    mentorQues7: "",
    mentorQues8: "",

    mentor: "",
  });
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    let mentorForm = [];
    let clientForm = [];
    if (formData.mentor === "yes") {
      mentorForm = [
        "I've been utilizing Cognitive Behavioral Therapy (CBT) and Interpersonal Therapy (IPT) for over 10 years to treat clients with depression. I also stay updated with the latest research to integrate evidence-based practices, such as mindfulness-based cognitive therapy, into my treatment plans.",
        "I typically use a combination of CBT and exposure therapy to treat clients with anxiety. I also incorporate relaxation techniques and stress management strategies to help clients manage their symptoms.",
        "I use a variety of stress reduction techniques, such as deep breathing exercises, progressive muscle relaxation, and guided imagery. I also help clients identify and challenge negative thought patterns that contribute to their stress.",
        "I help clients enhance their contentment by focusing on gratitude, self-compassion, and savoring positive experiences. I also encourage clients to engage in activities that bring them joy and fulfillment.",
        "I use a variety of evidence-based methods to promote happiness, such as positive psychology interventions, behavioral activation, and cognitive restructuring. I also help clients identify and leverage their strengths to increase their overall happiness.",
        "I help clients manage their anger by teaching them effective communication skills, assertiveness training, and anger management techniques. I also help clients identify and address the underlying causes of their anger.",
        "I use a combination of cognitive-behavioral and mindfulness-based approaches to alleviate fatigue in my clients. I also help clients identify and address lifestyle factors that may be contributing to their fatigue.",
        "I maintain neutrality and objectivity in my practice by staying informed about cultural and social issues that may impact my clients. I also engage in regular supervision and consultation to ensure that my biases do not interfere with the therapeutic process.",
      ];
    } else {
      clientForm = [
        "Lately, I've been feeling a mix of emotions, fluctuating between feeling content and moments of anxiety due to various personal and professional challenges.",
        "My typical daily mood tends to be fairly stable, with a general sense of optimism, though I occasionally experience stress-related dips.",
        "Yes, I've noticed some changes in my sleep patterns, including difficulty falling asleep and waking up a few times during the night, which seems to be linked to my current stress levels.",
        "I would rate my overall stress level as moderate. While I manage to cope with most day-to-day tasks, there are moments when stress becomes more pronounced.",
        "Specific situations causing me distress include looming work deadlines and personal commitments. Balancing these responsibilities has been particularly challenging lately.",
      ];
    }
    // Do something with the form data, like submit to a server or perform client-side validation
    //if the formdata mentor is false, then set the mentorQues1 and mentorQues2 to empty string
    // if (formData.mentor === "no") {
    //   setFormData({ ...formData, mentorQues1: "", mentorQues2: "" });
    // }
    // console.log("form data is", formData);
    //here signup request will be sent to the server
    //redirect to the home page
    //get the data from the redux about the sign up
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const resultFromSignUp = { email, password };
    setSignUpData(resultFromSignUp);
    // console.log("data from signup page ", resultFromSignUp);
    //send the sign up data and questionaire data to the server
    axios
      .post("http://localhost:3002/auth/signup", {
        email: email,
        password: password,
        role: formData.mentor === "yes" ? "mentor" : "client",
        questionnaires: formData.mentor === "yes" ? mentorForm : clientForm,
      })
      .then((res) => {
        console.log("response from the server ", res);
        localStorage.setItem("token", res.data.token);
      })
      .catch((e) => {
        console.log("error from the server ", e.response.data);
      });
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
