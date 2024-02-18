"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [defaultSecret, setDefaultSecret] = useState("");
  const router = useRouter();

  const onLogin = async () => {
    // e.preventDefault();
    const currentEmail1 = localStorage.getItem("email");
    // i will get this email2 from backend
    const currentEmail2 = "abcd@gmail.com";
    setEmail1(currentEmail1);
    setEmail2(currentEmail2);
    const defaultSecrett = "abcd";
    setDefaultSecret(defaultSecrett);
    console.log("here");
    // login the first user
    axios
      .post(`http://localhost:3001/login`, {
        email: currentEmail1,
        secret: defaultSecrett,
      })
      .then((r) => {
        console.log("response data succesfully ", r.data);
        // login the 2nd user
        // setTimeout(() => {
        //   axios
        //     .post(`http://localhost:3001/login`, {
        //       email: currentEmail2,
        //       secret: defaultSecrett,
        //     })
        //     .then((r) => console.log("response data succesfully ", r.data)) // NOTE: over-ride secret
        //     .catch((e) => console.log(JSON.stringify(e.response.data)));
        // }, 3000);
      }) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };
  useEffect(() => {
    onLogin();
  }, []);
  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID={process.env.NEXT_PUBLIC_CHAT_ENGINE_ID}
          userName={email1}
          userSecret={defaultSecret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
