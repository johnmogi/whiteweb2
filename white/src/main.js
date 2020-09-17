import React, { Component } from "react";
import { Button, Form, Table } from "react-bootstrap";

const API = "http://localhost:3000/contacts";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: null,
      name: "",
      mail: "",
      phone: "",
      address: "",
      valid: false,
      ordered: false,
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    fetch(API)
      .then((response) => response.json())
      .then((contacts) => this.setState({ contacts }));
  };

  redraw = () => {
    this.setState({ valid: false });
    let contacts = this.state.contacts;
    this.setState({ contacts: contacts });
  };
  addContact = () => {
    let name = this.state.name;
    let mail = this.state.mail;
    let phone = this.state.phone;
    let address = this.state.address;
    let id = this.state.id;
    if (!name || !mail || !phone || !address) {
      alert("one of the fields is missing");
      return false;
    }
    if(mail.length< 6){
        return alert("mail is too short" )
    }
    else {
      this.setState({ valid: true });
    }
    const senData = `{"id":${id},"name":"${name}","mail":"${mail}","phone":"${phone}","address":"${address}"}`;
    console.log(senData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: senData,
    };
    fetch(API, options)
      .then((response) => response.json())
      .then((contacts) => alert(name + " your info has been added, thanks. "))
      .catch((err) => alert(err.message));
    this.redraw();
  };

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  sortByName = () => {
    let ordered = this.state.ordered;
    let contacts = this.state.contacts;
    if (!ordered) {
      contacts.sort(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
      });
      this.redraw();
      this.setState({ ordered: true });
      return contacts;
    } else {
      contacts.reverse(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
      });
      this.redraw();
      this.setState({ ordered: false });
    }
  };

  sortById = () => {
    let ordered = this.state.ordered;
    let contacts = this.state.contacts;
    if (!ordered) {
      this.setState({ ordered: true });
      contacts.sort(function (b, a) {
        return a.id - b.id;
      });
    } else {
      contacts.reverse(function (b, a) {
        return a.id - b.id;
      });
      this.redraw();
      this.setState({ ordered: false });
    }
  };

  render() {
    return (
      <div className="Main container">
        <Form className="card col-6">
          <h4>הרשמה לשירות</h4>
          <Form.Group controlId="formBasicName">
            <Form.Label>שם</Form.Label>
            <Form.Control
              type="text"
              placeholder="השם שלכם"
              required
              name="name"
              onChange={this.myChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhone">
            <Form.Label>טלפון</Form.Label>
            <Form.Control
              type="text"
              placeholder="הטלפון שלכם "
              required
              name="phone"
              onChange={this.myChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>מייל</Form.Label>
            <Form.Control
              type="email"
              placeholder="כתובת המייל שלכם"
              name="mail"
              required
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/"
              onChange={this.myChangeHandler}
            />
            <Form.Text className="text-muted">לעולם לא נשתף אותה</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>כתובת</Form.Label>
            <Form.Control
              type="text"
              placeholder="כתובת"
              required
              name="address"
              onChange={this.myChangeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={this.addContact}>
            שליחה
          </Button>
        </Form>
        <br />
        <Table striped bordered hover className="col-6">
          <thead>
            <tr>
              <th onClick={this.sortById}>#</th>
              <th onClick={this.sortByName}>שם</th>
              <th onClick={this.sortByName}>טלפון</th>
              <th onClick={this.sortByName}>מייל</th>
              <th onClick={this.sortByName}>כתובת</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.mail}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Main;
