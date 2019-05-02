import React from 'react';
import { Card, CardBody, Col, Badge, Table } from 'reactstrap';

import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import SquareEditOutlineIcon from 'mdi-react/SquareEditOutlineIcon';

const iconStyles = {
  marginRight: '10px',
};

const ResourceList = () => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody>
        <Table striped responsive>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Toyota</td>
              <td>V3</td>
              <td>2013</td>
              <td>
                <Badge color="success">Available</Badge>
              </td>
              <td>
                <span style={iconStyles}>
                  <DeleteForeverIcon size="20" color="#ff4861" />
                </span>
                <span>
                  <SquareEditOutlineIcon size="20" color="#555555" />
                </span>
              </td>
            </tr>
            <tr>
              <td>Renault</td>
              <td>Horiz</td>
              <td>2015</td>
              <td>
                <Badge color="success">Available</Badge>
              </td>
              <td>
                <span style={iconStyles}>
                  <DeleteForeverIcon size="20" color="#ff4861" />
                </span>
                <span>
                  <SquareEditOutlineIcon size="20" color="#555555" />
                </span>
              </td>
            </tr>
            <tr>
              <td>Mercedez</td>
              <td>M2</td>
              <td>2018</td>
              <td>
                <Badge color="warning">Booked</Badge>
              </td>
              <td>
                <span style={iconStyles}>
                  <DeleteForeverIcon size="20" color="#ff4861" />
                </span>
                <span>
                  <SquareEditOutlineIcon size="20" color="#555555" />
                </span>
              </td>
            </tr>
            <tr>
              <td>Ford</td>
              <td>Light</td>
              <td>2017</td>
              <td>
                <Badge color="warning">Booked</Badge>
              </td>
              <td>
                <span style={iconStyles}>
                  <DeleteForeverIcon size="20" color="#ff4861" />
                </span>
                <span>
                  <SquareEditOutlineIcon size="20" color="#555555" />
                </span>
              </td>
            </tr>
            <tr>
              <td>Ford</td>
              <td>Highland</td>
              <td>2017</td>
              <td>
                <Badge color="success">Available</Badge>
              </td>
              <td>
                <span style={iconStyles}>
                  <DeleteForeverIcon size="20" color="#ff4861" />
                </span>
                <span>
                  <SquareEditOutlineIcon size="20" color="#555555" />
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  </Col>
);

export default ResourceList;
