import { Avatar, Divider } from "@mui/material";
import Image from "next/image";
import React from "react";
import ProfileCard from "./ProfileCard";

export default function Profile() {
  return (
    <section className="text-gray-600 body-font flex justify-center items-center min-w-max">
      <div className="container lg:min-w-lg lg:w-full min-w-full md:w-1/2 w-5/6 mb-10 md:mb-0 bg-green-700 flex-grow">
        <ProfileCard />
      </div>
    </section>
  );
}
