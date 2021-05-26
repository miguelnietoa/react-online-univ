import React, { useContext, useEffect, useState } from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import GradeIcon from '@material-ui/icons/Grade';
import Poll from '@material-ui/icons/Poll';
import DateRange from '@material-ui/icons/DateRange';
import Update from '@material-ui/icons/Update';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import axios from 'axios';

import {
  subjectAccAvg,
  calcSubjectAccAvg,
  calcAvgEvolution,
} from 'variables/charts.js';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { Context } from 'utils/provider.js';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [state, setState] = useContext(Context);
  const [avgEvolution,setAvgEvolution] = useState({});

  const getStudentStatus = () => {
    const acc_avg = state.user.acc_avg;
    if (acc_avg <= 3.24) {
      return 'Periodo de prueba';
    } else if (acc_avg < 3.95) {
      return 'Normal';
    } else {
      return 'Distinguido';
    }
  };

  const fetchEnrollments = async (studentId) => {
    const response = await axios.get(`/enrollments/${studentId}`);
    setAvgEvolution(calcAvgEvolution(response.data));
    return response.data;
  };

  calcSubjectAccAvg(state.user.courses);

  useEffect(() => {
    fetchEnrollments(state.user._id).then((enrollments) => {
      let { user } = state;
      user.enrollments = enrollments;
      setState({...state, user });
      
    });
  }, []);

  useEffect(() => {
    
  }, [state])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <GradeIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Estado</p>
              <h3 className={classes.cardTitle}>{getStudentStatus()}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Hasta Semestre 2020-30
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Poll />
              </CardIcon>
              <p className={classes.cardCategory}>Prom. acum.</p>
              <h3 className={classes.cardTitle}>{state.user.acc_avg}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Hasta Semestre 2020-30
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={avgEvolution.data}
                type="Line"
                options={avgEvolution.options}
                listener={avgEvolution.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Evolución del promedio semestral
              </h4>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={subjectAccAvg.data}
                type="Bar"
                options={subjectAccAvg.options}
                responsiveOptions={subjectAccAvg.responsiveOptions}
                listener={subjectAccAvg.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>
                Promedio acumulado por materia
              </h4>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cursos matriculados</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['ID', 'Name', 'Salary', 'Country']}
                tableData={[
                  ['1', 'Dakota Rice', '$36,738', 'Niger'],
                  ['2', 'Minerva Hooper', '$23,789', 'Curaçao'],
                  ['3', 'Sage Rodriguez', '$56,142', 'Netherlands'],
                  ['4', 'Philip Chaney', '$38,735', 'Korea, South'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
