import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RepoCard from "./RepoCard";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import { clearErrorMessage, fetchReposRequest } from "../redux/slices/repoSlice"; 
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import CloseIcon from "@mui/icons-material/Close";

const RepoList = () => {
  const dispatch = useDispatch();
  const { repos, loading, period, page, error } = useSelector(
    (state) => state.repos
  );
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    dispatch(fetchReposRequest({ period, page: 1 }));
  }, [dispatch, period]);

  const handleChangePeriod = (e) => {
    const days = e?.target?.value || 30;
    dispatch(fetchReposRequest({ period: days, page: 1 }));
  };

  const loadMoreRepos = () => {
    dispatch(fetchReposRequest({ period, page: page + 1 }));
  };

  useInfiniteScroll(loadMoreRepos, loading);

  const handleCloseSnackbar = () => {
    dispatch(clearErrorMessage());
  };

  const handleSelectRepo = (repoId) => {
    setSelectedRepo(repoId === selectedRepo ? null : repoId);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select the period to view most starred repositories:
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="select-period-label">Period</InputLabel>
          <Select
            labelId="select-period-label"
            id="select-period"
            value={period}
            onChange={handleChangePeriod}
            label="Period"
          >
            <MenuItem value={7}>1 Week</MenuItem>
            <MenuItem value={14}>2 Weeks</MenuItem>
            <MenuItem value={30}>1 Month</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            selectedRepo={selectedRepo}
            handleSelectRepo={handleSelectRepo}
          />
        ))}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      {/* Snackbar for displaying error */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          message={`Error: ${error}`}
          action={
            <IconButton size="small" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </>
  );
};

export default RepoList;
