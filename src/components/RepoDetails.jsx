import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Grid, MenuItem, Select, CircularProgress, Typography } from "@mui/material";
import { fetchRepoDetailsRequest } from "../redux/slices/repodetailsSlice";

const RepoDetails = ({ owner, repo }) => {
	const dispatch = useDispatch();
	const { repoDetails, loading, error } = useSelector((state) => state.repoDetails);
	const [view, setView] = useState("commits");

	useEffect(() => {
		dispatch(fetchRepoDetailsRequest({ owner, repo }));
	}, [owner, repo, dispatch]);

	if (error) {
		return (
			<Grid container item xs={12} spacing={2} >
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 2,
						width: "100%",
					}}
				>
					<Typography
							variant="body2"
							color="textSecondary"
							sx={{
                margin: "5px"
							}}
						>
							{error}
						</Typography>
				</Box>
			</Grid>
		);
	}

  if (loading) {
		return (
			<Grid container item xs={12} spacing={2}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 2,
						width: "100%",
					}}
				>
					<CircularProgress />
				</Box>
			</Grid>
		);
	}

	const getTotalSeriesData = (contributors) => {
		// console.log("contributors: "contributors)

		if (!contributors) return [];
		let aggregatedContributions = {};
		contributors.forEach((contributor) => {
			contributor.weeks.forEach((week) => {
				let weekKey = week.w.toString();
				if (!aggregatedContributions[weekKey]) {
					aggregatedContributions[weekKey] = {
						w: week.w,
						a: 0,
						d: 0,
						c: 0,
					};
				}
				aggregatedContributions[weekKey].a += week.a;
				aggregatedContributions[weekKey].d += week.d;
				aggregatedContributions[weekKey].c += week.c;
			});
		});

		return Object.values(aggregatedContributions);
	};

	const totalChangesOptions = {
		chart: {
			type: "line",
			height: 250,
		},
		title: {
			text: "Total Changes",
		},
		xAxis: {
			type: "datetime",
			title: {
				text: "Week",
			},
		},
		yAxis: {
			title: {
				text: "Changes",
			},
		},
		series: [
			{
				name: "Total Changes",
				data: getTotalSeriesData(repoDetails).map(
					(week) => ({
						x: new Date(week.w * 1000).getTime(),
						y:
							view === "commits"
								? week.c
								: view === "additions"
								? week.a
								: week.d,
					})
				),
			},
		],
	};

	const contributorChangesOptions = {
		chart: {
			type: "line",
			height: 400,
		},
		title: {
			text: "Contributor Changes",
		},
		xAxis: {
			type: "datetime",
			title: {
				text: "Week",
			},
		},
		yAxis: {
			title: {
				text: "Changes",
			},
		},
		series: repoDetails.map((contributor) => ({
			name: contributor.author.login,
			data: contributor.weeks.map((week) => ({
				x: new Date(week.w * 1000).getTime(),
				y:
					view === "commits"
						? week.c
						: view === "additions"
						? week.a
						: week.d,
			})),
		})),
	};

	return (
		<Grid item container xs={12} spacing={2}>
			<Grid item xs={12} sx={{ textAlign: "right" }}>
				<Select value={view} onChange={(e) => setView(e.target.value)}>
					<MenuItem value="commits">Commits</MenuItem>
					<MenuItem value="additions">Additions</MenuItem>
					<MenuItem value="deletions">Deletions</MenuItem>
				</Select>
			</Grid>
			<Grid item xs={12} className="chart-container">
				<HighchartsReact
					highcharts={Highcharts}
					options={totalChangesOptions}
				/>
			</Grid>
			<Grid item xs={12} className="chart-container">
				<HighchartsReact
					highcharts={Highcharts}
					options={contributorChangesOptions}
				/>
			</Grid>
		</Grid>
	);
};

export default RepoDetails;
