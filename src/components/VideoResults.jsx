import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Query } from "react-apollo";
import Card from "./Card";

export default class extends Component {
  componentDidMount() {
    console.log(this.props.query);
  }

  render() {
    const { query } = this.props;
    return (
      <div>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <h2>loading...</h2>;
            }
            if (error) {
              console.log(error);
              return <h2>error!</h2>;
            }
            console.log(data);

            return (
              <Row>
                {data.videos.map((video, key) => {
                  return (
                    <Col lg="3" key={key}>
                      <Card
                        title={video.title}
                        thumbUrl={video.thumbnails.default.url}
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          }}
        </Query>
      </div>
    );
  }
}
