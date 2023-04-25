import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Collapse,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  clearErrors,
} from "../../../store/features/userSlice";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  collapseContent: {
    padding: "2",
  }
}));

const UserList = () => {
  // Add a new state variable to trigger list updates
  const [listUpdateTrigger, setListUpdateTrigger] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchBackend, setSearchBackend] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const responseMessage = useSelector((state) => state.user.message);
  const errors = useSelector((state) => state.user.errors);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const [searchFields, setSearchFields] = useState({
    userName: "",
    nickName: "",
    mobileNumber: "",
    email: "",
    status: "",
  });
  const [showHiddenPanel, setShowHiddenPanel] = useState(false);

  const toggleHiddenPanel = () => {
    setShowHiddenPanel(!showHiddenPanel);
  };

  const classes = useStyles();

  const initialFetch = useRef(true);

  useEffect(() => {
    if (initialFetch.current || listUpdateTrigger) {
      dispatch(fetchUsers({}));
      initialFetch.current = false;
    }
  }, [dispatch, listUpdateTrigger]);

  const handleBackendSearch = () => {
    setSearchBackend(true);
    dispatch(fetchUsers(searchFields));
  };

  const handleSearchFieldChange = (e) => {
    const { name, value } = e.target;
    console.log("New value:", value);
    setSearchFields({ ...searchFields, [name]: value });
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  const searchUsers = () => {
    return users.filter(
      (user) =>
        user.userName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.nickName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.mobileNumber.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase()) ||
        user.status.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => {
    dispatch(clearErrors());
    setSelectedUser({
      id: "",
      userName: "",
      nickName: "",
      mobileCountryCode: "",
      mobileNumber: "",
      email: "",
      password: "",
      status: "ACTIVE",
    });
    setOpen(true);
  };

  const handleEdit = (user) => {
    dispatch(clearErrors());
    setSelectedUser({ ...user });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setIsProcessing(true);
    try {
      if (selectedUser.id) {
        // Update the user
        await dispatch(
          updateUser({ id: selectedUser.id, updatedUser: selectedUser })
        ).unwrap();
        setListUpdateTrigger(!listUpdateTrigger);
        // dispatch({ type: 'user/setStatusIdle' });
      } else {
        // Add the user
        await dispatch(addUser(selectedUser)).unwrap();
      }
      setOpen(false);
    } catch (error) {
      // Handle errors here if needed
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDetailDialogOpen = (user) => {
    setSelectedUser({ ...user });
    setDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
  };

  // Define a new function to handle the confirmation dialog close event
  const handleConfirmDialogClose = () => {
    setRecordToDelete(null);
    setConfirmDialogOpen(false);
  };

  // Define a new function to handle the record delete event
  const handleRecordDelete = () => {
    dispatch(deleteUser(recordToDelete.id));
    handleConfirmDialogClose();
  };

  // Update the onDelete function to set the recordToDelete state variable and open the confirmation dialog
  const onDelete = (record) => {
    setRecordToDelete(record);
    setConfirmDialogOpen(true);
  };

  const columns = [
    { field: "userName", headerName: "Username", minWidth: 100, flex: 1 },
    { field: "nickName", headerName: "Nickname", minWidth: 100, flex: 1 },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        const mobileCountryCode = params.row.mobileCountryCode;
        const mobileNumber = params.row.mobileNumber;
        return (
          <div>
            {mobileCountryCode && mobileNumber
              ? `+${mobileCountryCode} ${mobileNumber}`
              : ""}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "password", headerName: "Password", minWidth: 100, flex: 1 },
    { field: "status", headerName: "Status", minWidth: 40, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 280,
      flex: 1,
      renderCell: (params) => {
        const onEdit = () => {
          handleEdit(params.row);
        };

        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDetailDialogOpen(params.row)}
              style={{ marginRight: 8 }}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onEdit}
              style={{ marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onDelete(params.row)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 220px)",
          width: "calc(100vw - 32px)",
          padding: "16px",
          marginLeft: "-10px",
          marginTop: "-20px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>User Management</Typography>
        <Grid
          container
          spacing={2}
          className={classes.searchBar}
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <TextField
              label="Search"
              variant="outlined"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item container xs={8} spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Add User
              </Button>
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={toggleHiddenPanel}>
                {showHiddenPanel ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Collapse in={showHiddenPanel}>
          <Grid
            container
            spacing={2}
            className={classes.searchBar}
            justifyContent="space-between"
          >
            <Grid item xs={12} md={4}>
              <TextField
                label="Username"
                name="userName"
                variant="outlined"
                value={searchFields.userName || ""}
                onChange={(e) => handleSearchFieldChange(e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Nickname"
                variant="outlined"
                value={searchFields.nickName || ""}
                onChange={(e) =>
                  setSearchFields({
                    ...searchFields,
                    nickName: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                value={searchFields.mobileNumber || ""}
                onChange={(e) =>
                  setSearchFields({
                    ...searchFields,
                    mobileNumber: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                variant="outlined"
                value={searchFields.email || ""}
                onChange={(e) =>
                  setSearchFields({ ...searchFields, email: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status-select"
                  name="status"
                  value={searchFields.status || ""}
                  label="Status"
                  onChange={(e) => handleSearchFieldChange(e)}
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="FROZEN">Frozon</MenuItem>
                  <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  <MenuItem value="BLOCKED">Blocked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleBackendSearch}
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Collapse>
        <DataGrid
          rows={keyword ? searchUsers(keyword) : users}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSize={pageSize}
          pageSizeOptions={[5, 20, 50, 100]}
          disableSelectionOnClick
          style={{ width: "100%", minWidth: "650px" }}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
      <Dialog
        open={detailDialogOpen}
        onClose={handleDetailDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {/* Add the content to display user details here */}
          <Typography variant="body1">
            ID: {selectedUser ? selectedUser.id : ""}
          </Typography>
          <Typography variant="body1">
            Username: {selectedUser ? selectedUser.userName : ""}
          </Typography>
          <Typography variant="body1">
            Nickname: {selectedUser ? selectedUser.nickName : ""}
          </Typography>
          <Typography variant="body1">
            Mobile Number:{" "}
            {selectedUser
              ? `+${selectedUser.mobileCountryCode} ${selectedUser.mobileNumber}`
              : ""}
          </Typography>
          <Typography variant="body1">
            Email: {selectedUser ? selectedUser.email : ""}
          </Typography>
          <Typography variant="body1">
            Status: {selectedUser ? selectedUser.status : ""}
          </Typography>
          <Typography variant="body1">
            Created Date: {selectedUser ? selectedUser.createdDate : ""}
          </Typography>
          <Typography variant="body1">
            Created By: {selectedUser ? selectedUser.createdBy : ""}
          </Typography>
          <Typography variant="body1">
            Updated Date: {selectedUser ? selectedUser.updatedDate : ""}
          </Typography>
          <Typography variant="body1">
            Updated By: {selectedUser ? selectedUser.updatedBy : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          {/* Add your form fields here, e.g., TextField, Select, etc. */}
          <TextField
            label="Username"
            value={selectedUser ? selectedUser.userName : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, userName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nickname"
            value={selectedUser ? selectedUser.nickName : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, nickName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country Code"
            value={selectedUser ? selectedUser.mobileCountryCode : ""}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                mobileCountryCode: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            value={selectedUser ? selectedUser.mobileNumber : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, mobileNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={selectedUser ? selectedUser.email : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            value={selectedUser ? selectedUser.password : ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status-select"
              name="status"
              value={selectedUser ? selectedUser.status : ""}
              label="Status"
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, status: e.target.value })
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="FROZEN">Frozon</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
              <MenuItem value="BLOCKED">Blocked</MenuItem>
            </Select>
          </FormControl>
          {responseMessage && (
            <Typography
              variant="subtitle1"
              color="error"
              style={{ marginTop: 8 }}
            >
              {responseMessage}
            </Typography>
          )}
          {errors && (
            <div>
              {Object.entries(errors).map(([key, value], index) => (
                <Typography
                  key={`${key}-${index}`}
                  variant="subtitle2"
                  color="error"
                  style={{ marginTop: 2 }}
                >
                  {index + 1}. {value}
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={isProcessing}>
            {isProcessing ? "Processing" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose}>Cancel</Button>
          <Button onClick={handleRecordDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserList;
