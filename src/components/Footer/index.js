import React from "react";

const Footer = () => (
  <footer
    className="p-3 text-center"
    style={{ fontSize: "12px", color: "#999" }}
  >
    <div className="logo" />
    <p>
      © ShogiBattles.com - {new Date().getFullYear()}. All rights reserved.{" "}
    </p>
  </footer>
);

export default Footer;
