import React, { useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CssVarsProvider } from "@mui/joy/styles";
import { Container } from "@mui/joy";
import Home from "./components/Home/Home";
import Call from "./components/Call/Call";
import useCallStates from "./hooks/useCallStates";
import Navbar from "./components/NavBar/NavBar";
import madoTheme from "./madoTheme";
import { SnackbarProvider } from "notistack";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  scrollLink: {
    textDecoration: 'none',
    color: 'blue',
    cursor: 'pointer',
    margin: '20px 0',
  }
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const aboutUsRef = useRef<HTMLDivElement>(null);


  const { callEnded, joinedRoom } = useCallStates();

  return (
    <CssVarsProvider theme={madoTheme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        preventDuplicate
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Container className={classes.wrapper}>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Home />} />
              
              <Route
                path="/call/:roomId"
                element={
                  joinedRoom && !callEnded ? (
                    <Call />
                  ) : (
                    <Navigate replace to="/" />
                  )
                }
              />
            </Routes>
           
          </Container>
        </BrowserRouter>
      </SnackbarProvider>
    </CssVarsProvider>
  );
};

export default App;
