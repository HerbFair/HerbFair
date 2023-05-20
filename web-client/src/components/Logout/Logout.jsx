const logout = () => {
  localStorage.removeItem("seller");
  localStorage.removeItem("role");
  window.location.href = "/";
};

const Logout = () => {
  logout();
  return <div />;
};

export default Logout;
