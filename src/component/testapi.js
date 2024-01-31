import React from "react";
import axios from "axios";

export default class List extends React.Component {
  state = {
    obj: {}
  }

  componentDidMount() {
    axios.get(`https://service.s-tech.info/vote/listTeam`)
      .then(res => {
        const obj = res.data;
        this.setState({ obj });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { obj } = this.state;
    return (
      <ul>
        <li>Service: {obj.service}</li>
        <li>Developer: {obj.dev}</li>
        <li>Other Info: {obj.ddd}</li>
      </ul>
    )
  }
}