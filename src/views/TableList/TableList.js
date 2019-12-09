import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import { TableCell, TableHead, Checkbox, TableRow } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);
const classes = useStyles;
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      tableData: [
        {
          company_id: "",
          location: "",
          date_time: "",
          num_bad: "",
          num_neutral: "",
          num_good: "",
          retweet_count: "",
          favorite_count: "",
          replies_count: ""
        }
      ]
    };
  }

  //get users
  getCompanies = () => {
    axios
      .get(" https://pertinent-results-api-wa.azurewebsites.net/results/all", {
        responseType: "json"
      })
      .then(response => {
        console.log(response, "companies");
        const companies = response.data;
        this.setState({ companies });
        this.setState({ tableData: response.data });
        console.log("Table Data:", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

    renderTableHeader() {
      return (
        <table>
          <thead>
			  <tr>
			<th>Id</th>
            <th>Location</th>
            <th>Date/Time</th>
            <th>Bad</th>
            <th>Neurtral</th>
            <th>Good</th>
            <th>Retweet Count</th>
            <th>Favourite Count</th>
            <th>Replies Count</th>
			  </tr>
          </thead>  
			
       
        </table>
      );
    }

  renderTableleData() {
    return this.state.companies.map((companies, index) => {
      //const {company_id, location, date_time, num_bad, num_neutral, num_good, retweet_count, favorite_count, replies_count} = company;
      return (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Location</th>
              <th>Date/Time</th>
              <th>Bad</th>
              <th>Neurtral</th>
              <th>Good</th>
              <th>Retweet Count</th>
              <th>Favourite Count</th>
              <th>Replies Count</th>
            </tr>
          </thead>
          <tbody>
            <tr key={companies.company_id}>
              <td>{companies.company_id}</td>
              <td>{companies.location}</td>
              <td>{companies.date_time}</td>
              <td>{companies.num_bad}</td>
              <td>{companies.num_neutral}</td>
              <td>{companies.num_good}</td>
              <td>{companies.retweet_count}</td>
              <td>{companies.favorite_count}</td>
              <td>{companies.replies_count}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  }

  componentDidMount() {
    this.getCompanies();
  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Pertinent Result</h4>
            </CardHeader>
            <CardBody>
           {this.renderTableHeader()}
                {this.renderTableleData()}
             
              {/* <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Company ID",
                  "Location",
                  "Date/Time",
                  "Bad",
                  "Nuetral",
                  "Good",
                  "Retweet Count",
                  "Favorite count",
                  "Replies count"
                ]}
                tableData={[this.renderTableleData()]}

                //   ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                //   ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                //   ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                //   [
                //     "Doris Greene",
                //     "Malawi",
                //     "Feldkirchen in Kärnten",
                //     "$63,542"
                //   ],
                //   ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
export default TableList;
