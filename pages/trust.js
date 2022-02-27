import React from "react";
import axios from "axios";
const trust = () => {
  const cdata = axios
    .get("https://trust.market/collection")
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(cdata);
  return <div>trust</div>;
};

export default trust;
