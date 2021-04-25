import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../Config/Config";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useHistory } from "react-router-dom";
import { ProductsContext } from "../Global/ProductsContext";
import Rating from "@material-ui/lab/Rating";
import {
  Collapse,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  Popover,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from "@material-ui/core";

function Orders({ userId, user, avatar }) {
  const [orders, setOrders] = useState([]);
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(-1);
  const [checked, setChecked] = useState([]);

  const steps = [
    'Confirmed',
    'Shipped',
    'Delivered',
  ];

  const stepActive = {
    confirmed: 1, 
    shipped: 2, 
    delivered: 3, 
  }

  const handleOrderDetail = (id) => {
    let temp = checked;
    temp = temp.map(item => item.id === id ? ({id:id, checked:!item.checked}): item)
    setChecked(temp);
  };

  const handleClickRating = (event, id) => {
    setOpenedPopoverId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRating = () => {
    setAnchorEl(null);
    setOpenedPopoverId(-1);
  };

  const handleSendComment = (products) => {
    console.log(products);
    products.forEach(async (item) => {
      const temp = await db.collection("Products").doc(item).get();
      db.collection("Products")
        .doc(item)
        .set(
          {
            rating: [
              ...temp.data().rating,
              {
                avatar: avatar ? avatar : "",
                comment,
                stars,
                time: firebase.firestore.Timestamp.fromDate(new Date()),
                userId,
                userName: user,
              },
            ],
          },
          { merge: true }
        )
        .then(() => console.log("Successfully written"))
        .catch((err) => console.log(err));
    });
    handleCloseRating();
    setComment("");
    setStars(1);
  };

  const getDoc = async () => {
    const doc = await db.collection("Buyer-info " + userId).get();
    const snapshot = doc.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    setOrders([...snapshot]);
    const collapses = snapshot.map(item => ({
        id: item.id,
        checked: false
    }));
    setChecked(collapses);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
    getDoc();
  }, []);

  const history = useHistory();
  const OrderComponent = ({ title, value }) => {
    return (
      <div className="d-flex flex-column">
        <div className="text-muted">{title}</div>
        <div
          style={{ fontWeight: "bold" }}
          className={title == "Status" ? statusColor[value] : ""}
        >
          {value}{" "}
        </div>
      </div>
    );
  };
  const statusColor = {
    confirmed: "text-warning",
    shipped: "text-primary",
    delivered: "text-danger",
  };
  return (
    <div style={{ height: "100%" }}>
      <Navbar user={user} userId={userId} avatar={avatar} />
      <h1>Orders</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-sm-12">
            <div className="bg-white rounded-start">
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold" }}>
                  Orders status
                </h5>
                <div className="mt-4">
                  <h6 className="card-title" style={{ fontWeight: "bold" }}>
                    Order confirmed
                  </h6>
                  <div>
                    Once your order is confirmed, it will soon be picked,
                    packed, and shipped!
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="card-title" style={{ fontWeight: "bold" }}>
                    Order shipped
                  </h6>
                  <div>
                    Your order has been completed and has been shipped out. It
                    is now on its way to you.
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="card-title" style={{ fontWeight: "bold" }}>
                    Order delivered
                  </h6>
                  <div>
                    Your order has been collected and signed for by either
                    yourself or the customer
                  </div>
                </div>
                <div className="mt-4">
                  <h6 className="card-title" style={{ fontWeight: "bold" }}>
                    Order canceled
                  </h6>
                  <div>
                    Investors may cancel standing orders, such as a limit or
                    stop order, for any reason so long as the order has not been
                    filled yet.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            {orders.map((item, index) => (
              <div
                key={index}
                className="mb-5"
                style={{ maxWidth: "510px", width: "100%" }}
              >
                <span style={{ fontWeight: "bold" }}>Order #</span>
                <span>{" " + item.id.split("_")[1]}</span>
                <div
                  key={item.id}
                  className="border border-2 rounded bg-white"
                  style={{ maxWidth: "500px", width: "100%" }}
                >
                  <div className="d-flex d-flex justify-content-between align-items-center p-3">
                    <OrderComponent
                      title={"Date"}
                      value={new Date(
                        parseInt(item.id.split("_")[1])
                      ).toDateString()}
                    />
                    <OrderComponent
                      title={"Total"}
                      value={item.data.BuyerPayment}
                    />
                    <OrderComponent title={"Status"} value={item.data.status} />
                    <i
                      onClick={() => handleOrderDetail(item.id)}
                      className="fa fa-angle-right"
                      style={{
                        fontSize: "30px",
                        transition: "transform .4s ease-in-out",
                        transform: checked.length > 0 && checked.filter(element => element.id === item.id)[0].checked ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    ></i>
                  </div>
                  <Collapse in={checked.length > 0 && checked.filter(element => element.id === item.id)[0].checked}>
                    <Paper elevation={2} className={""}>
                      <Stepper activeStep={stepActive[item.data.status]} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <Divider />
                    </Paper>
                  </Collapse>
                  {item.data.status === "delivered" && (
                    <div className="border-top p-2 bg-light">
                      <button
                        onClick={(e) => handleClickRating(e, index)}
                        style={{
                          border: "none",
                          outline: "none",
                          backgroundColor: "transparent",
                          fontWeight: "bold",
                        }}
                        className="text-primary"
                      >
                        <i className="fa fa-heart"></i> Review and Rating
                      </button>
                      <Popover
                        open={openedPopoverId === index}
                        anchorEl={anchorEl}
                        onClose={handleCloseRating}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <div className="p-3" style={{}}>
                          <div
                            className="d-flex flex-column justify-content-center align-items-center"
                            style={{ fontWeight: "bold" }}
                          >
                            How many stars do you rate this product?
                            <Rating
                              name="simple-controlled"
                              value={stars}
                              onChange={(event, newValue) => {
                                setStars(newValue);
                              }}
                            />
                          </div>
                          <TextField
                            id="filled-multiline-flexible"
                            label="Write comment"
                            multiline
                            rowsMax={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            variant="filled"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    style={{ outline: "none" }}
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                      handleSendComment(item.data.products)
                                    }
                                  >
                                    Send
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </Popover>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
