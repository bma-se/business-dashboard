import React, { Component } from "react";
import axios from "axios";
import { request } from "http";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Input from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput";
import { TextField } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);
// const classes = useStyles();

class PostCompany extends Component {
  constructor(props) {
    super(props);

    //init state
    this.state = {
      companytitle: "",
      keywords: []
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  //onchange hadler function
  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // submit handler
  submitHandler(event) {
    event.preventDefault();
    console.log(this.state);
    console.log(this.state.companytitle);
    axios
      .post("https://bmacompanydbwa.azurewebsites.net/companies", {
        companytitle: this.state.companytitle,
        keywords: []
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { companytitle, keywords } = this.state;
    const classes = useStyles;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Boundaries</h4>
                <p className={classes.cardCategoryWhite}>
                  Specify boundaries as needed
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      label="Company Title"
                      onChange={this.changeHandler}
                      labelProps={companytitle}
                      inputProps={{
                        name:"companytitle",
                        id:"companytitle"
                      }}
                      name={companytitle}
                      id={companytitle}
                      value={this.state.companytitle}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
					
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      type="text"
                      label="Keywords"
                      id="keywords"
                      value={this.state.keywords}
                      onChange={this.changeHandler}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
					
					
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={this.submitHandler} color="primary">
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        {/* <form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="companyTitle"
							id="companyTitle"
							value={companyTitle}
							onChange={this.changeHandler}
						></input>
					</div>
					<div>
						<input
							type="text"
							name="companyName"
							id="companyName"
							value={companyName}
							onChange={this.changeHandler}
						></input>
					</div>
					<div>
						<button type="submit">Submit </button>
					</div>
				</form> */}
      </div>
    );
  }
}
export default PostCompany;
