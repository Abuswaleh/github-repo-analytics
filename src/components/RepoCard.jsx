import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ReactComponent as IssueIcon } from "../icons/issue.svg";
import { ReactComponent as StartIcon } from "../icons/star.svg";
import {
	Card,
	CardContent,
	Typography,
	Avatar,
	Grid,
	IconButton,
} from "@mui/material";
import RepoDetails from "./RepoDetails";

const RepoCard = ({ repo, selectedRepo, handleSelectRepo }) => {
	const isSelected = selectedRepo === repo.id;

	const pushedAt = () => {
		const pushedAt = new Date(repo.pushed_at);
		const options = {
			day: "2-digit",
			month: "short",
			// year: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		};
		return pushedAt.toLocaleDateString("en-US", options);
	}

	return (
		<Card
			sx={{ width: "100%", marginBottom: 2, backgroundColor: "#f6f6f6" }}
		>
			<CardContent>
				<Grid container spacing={2}>
					<Grid item>
						<Avatar
							variant="rounded"
							src={repo.owner.avatar_url}
							alt={repo.owner.login}
							sx={{
								width: { xs: 80, sm: 120 },
								height: { xs: 80, sm: 120 },
								border: "3px solid lightgray",
							}}
						/>
					</Grid>
					<Grid item xs>
						<Typography variant="h4">{repo.name}</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							sx={{
								display: "-webkit-box",
								overflow: "hidden",
								textOverflow: "ellipsis",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								marginBottom: "5px",
							}}
						>
							{repo.description}
						</Typography>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Typography
									variant="body2"
									sx={{
										borderRadius: "3px",
										border: "3px solid lightgray",
										display: "flex",
										gap: 1,
										alignItems: "center",
										p: 0.7,
									}}
								>
									<StartIcon />
									{repo.stargazers_count}
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									variant="body2"
									sx={{
										borderRadius: "3px",
										border: "3px solid lightgray",
										display: "flex",
										gap: 1,
										alignItems: "center",
										p: 0.7,
									}}
								>
									<IssueIcon />
									{repo.open_issues_count}
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">
									Last pushed {pushedAt} by {repo.owner.login}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item sx={{ display: "flex", alignItems: "center" }}>
						<IconButton onClick={() => handleSelectRepo(repo.id)}>
							<ArrowForwardIosRoundedIcon
								sx={{
									fontSize: "2rem",
									transform: isSelected
										? "rotate(90deg)"
										: "none",
								}}
							/>
						</IconButton>
					</Grid>
					{isSelected && (
						<RepoDetails
							owner={repo.owner.login}
							repo={repo.name}
						/>
					)}
				</Grid>
			</CardContent>
		</Card>
	);
};

export default RepoCard;
