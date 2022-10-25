import React, { Fragment, useState } from "react";
import classes from "./Shipping.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveShippingInfo } from "../../slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../CheckoutSteps";
import AddressAutoComplete from "./AddressAutoComplete";
const Shipping = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(shippingInfo.firstName);
  const [lastName, setLastName] = useState(shippingInfo.lastName);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [mobile, setMobile] = useState(shippingInfo.phoneNo);
  const submitHandler = (event) => {
    event.preventDefault();
    const shippingInfo = {
      firstName,
      lastName,
      address,
      city,
      phoneNo: mobile,
      pincode,
      state,
    };
    dispatch(saveShippingInfo(shippingInfo));
    navigate("/confirm");
  };
  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };
  // const [address, setAddress] = useState(props.address);
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    setAddress(address);
  };
  // const addressChangeHandler = (value) => {
  //   setAddress(event.target.value);
  // };
  const cityChangeHandler = (event) => {
    setCity(event.target.value);
  };
  const stateChangeHandler = (event) => {
    setState(event.target.value);
  };
  const pincodeChangeHandler = (event) => {
    setPincode(event.target.value);
  };
  const mobileNoChangeHandler = (event) => {
    setMobile(event.target.value);
  };

  return (
    <Fragment>
      <CheckoutSteps shipping />

      <Form className={classes.shippingForm} onSubmit={submitHandler}>
        <FloatingLabel
          controlId="floatingSelect"
          label="Country/region"
          className={classes.country}
        >
          <Form.Select aria-label="Floating label select example">
            <option value="India">India</option>
          </Form.Select>
        </FloatingLabel>
        <div className={classes.nameContainer}>
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className={classes.firstName}
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={firstNameChangeHandler}
              value={firstName}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingLastName"
            label="Last Name"
            className={classes.lastName}
          >
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={lastNameChangeHandler}
              value={lastName}
            />
          </FloatingLabel>
        </div>
        <AddressAutoComplete
          address={address}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
        <div className={classes.cityStatePinContainer}>
          <FloatingLabel
            controlId="floatingCity"
            label="City"
            className={classes.city}
          >
            <Form.Control
              type="text"
              placeholder="City"
              onChange={cityChangeHandler}
              value={city}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingState"
            label="State"
            className={classes.state}
          >
            <Form.Select
              aria-label="Floating label select example"
              onChange={stateChangeHandler}
              value={state}
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli">
                Dadar and Nagar Haveli
              </option>
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPincode"
            label="Pincode"
            className={classes.pinCode}
          >
            <Form.Control
              type="Number"
              placeholder="Pincode"
              onChange={pincodeChangeHandler}
              value={pincode}
            />
          </FloatingLabel>
        </div>
        <FloatingLabel
          controlId="floatingMobile"
          label="Mobile Number"
          className={classes.mobileNo}
        >
          <Form.Control
            type="Number"
            placeholder="Mobile Number"
            onChange={mobileNoChangeHandler}
            value={mobile}
          />
        </FloatingLabel>
        <Button variant="success" type="submit" size="lg" className="mt-5">
          Confirm Order
        </Button>
      </Form>
    </Fragment>
  );
};

export default Shipping;
