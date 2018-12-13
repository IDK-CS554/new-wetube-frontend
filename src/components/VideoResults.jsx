import React, { Component } from "react";
import { Query } from "react-apollo";
import Card from "./Card";

export default class extends Component {
  render() {
    const { videoQuery } = this.props;
    return (
      <div>
        <Query query={videoQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              console.log(data);
              return <h2>loading...</h2>;
            }
            if (error) {
              console.log(error);
              return <h2>error!</h2>;
            }
            console.log(data);
            return <h2>worked!</h2>;
          }}
        </Query>
      </div>
    );
  }
}

// <Row>
//   {[...Array(4)].map((video, key) => {
//     return (
//       <Col lg="3" key={key}>
//         <Card
//           title="oof"
//           thumbUrl="https://onaliternote.files.wordpress.com/2016/11/wp-1480230666843.jpg"
//         />
//       </Col>
//     );
//   })}
// </Row>
