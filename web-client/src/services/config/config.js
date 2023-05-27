let user = JSON.parse(localStorage.getItem("admin") || "{}");

if (localStorage.getItem("role") === "admin") {
  user = JSON.parse(localStorage.getItem("admin") || "{}");
}

const requestConfig = {
  headers: {
    Authorization: "Bearer " + user.accessToken || "",
    "Content-type": "multipart/form-data",
  },
};

export default requestConfig;
