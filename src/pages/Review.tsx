import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/creatorAvatar.png";
import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

function Review() {
  return (
    <div className="profile">
      <img src={avatarImage} alt="" className="profile-image" />
      <h1 className="profile-text">Stockmate 股伴</h1>
      <h2 className="profile-text">你的最佳投資助手</h2>
      <h4 className="profile-text">大三專題第四組</h4>
      <div className="profile-links">
        <a href="https://github.com/Rusty-Helix">
          <FaGithub />
        </a>
        <a href="https://github.com/Rusty-Helix">
          <FaYoutube />
        </a>
        <a href="https://github.com/Rusty-Helix">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

export default Wrapper(Review);