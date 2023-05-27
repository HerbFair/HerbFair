let user = JSON.parse(localStorage.getItem("user") || "{}");
if (localStorage.getItem("role") === "seller") {
  user = JSON.parse(localStorage.getItem("seller") || "{}");
}

const requestConfigJson = {
  headers: {
    Authorization: "Bearer " + user.accessToken || "",
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export default requestConfigJson;
