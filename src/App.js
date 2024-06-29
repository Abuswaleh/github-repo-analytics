import React from "react";
import { Container, Typography } from "@mui/material";
import RepoList from "./components/RepoList";

function App() {
	return (
    <Container sx={{p:2}}>
		<Container maxWidth="lg" sx={{border: "3px solid lightgray", borderRadius: "5px" }}>
			<Typography variant="h4" align="center" m={1.5}>
				Most Starred Repos
			</Typography>
			<RepoList />
		</Container>
    </Container>
	);
}

export default App;
