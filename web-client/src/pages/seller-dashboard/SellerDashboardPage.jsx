import { Box, Tabs, createStyles, Container } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const useStyles = createStyles((theme) => ({
  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },

  panel: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

const SellerDashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { tabValue } = useParams();
  if (!localStorage.getItem("seller")) {
    window.location.href = "/seller/login";
  }

  const tabs = ["Dashboard", "Products", "Orders", "Settings"];

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.toLowerCase()} key={tab.toLowerCase()}>
      {tab}
    </Tabs.Tab>
  ));

  return (
    <Box>
      <DashboardHeader />
      <Container mt={-38}>
        <Tabs
          defaultValue="dashboard"
          value={tabValue || "dashboard"}
          onTabChange={(value) => navigate(`/seller/dashboard/${value}`)}
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
            panel: classes.panel,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
          <Tabs.Panel value="dashboard">
            <h1>Dashboard</h1>
          </Tabs.Panel>
          <Tabs.Panel value="products">
            <h1>Products</h1>
          </Tabs.Panel>
          <Tabs.Panel value="orders">
            <h1>Orders</h1>
          </Tabs.Panel>
          <Tabs.Panel value="settings">
            <h1>Settings</h1>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
};

export default SellerDashboard;
