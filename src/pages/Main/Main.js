import React from "react";

import Card from "../../components/Card";

import logo from "../../assets/logo_400x400.jpg";
import * as style from "./Main.styles";

export function Main() {
  return (
    <div style={style.main_content}>
      <img style={style.m0na_logo} src={logo} alt="m0na-bot logo" />
      <Card entity="alesp" title="SÃO PAULO" />
    </div>
  );
}
