import React, { useContext, useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { Context } from 'utils/provider.js';
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  const [state, setState] = useContext(Context);
  console.log(state);

  const table = {
    head: [
      'Hora',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ],
    data: [
      ['6:30', '', '', '', '', '', ''],
      ['7:30', '', '', '', '', '', ''],
      ['8:30', '', '', '', '', '', ''],
      ['9:30', '', '', '', '', '', ''],
      ['10:30', '', '', '', '', '', ''],
      ['11:30', '', '', '', '', '', ''],
      ['12:30', '', '', '', '', '', ''],
      ['13:30', '', '', '', '', '', ''],
      ['14:30', '', '', '', '', '', ''],
      ['15:30', '', '', '', '', '', ''],
      ['16:30', '', '', '', '', '', ''],
      ['17:30', '', '', '', '', '', ''],
      ['18:30', '', '', '', '', '', ''],
      ['19:30', '', '', '', '', '', ''],
      ['20:30', '', '', '', '', '', ''],
    ],
  };

  state.user.courses.forEach((courseStudent) => {
    const courseName = courseStudent.course.name;
    //console.log("courseName", courseName)
    courseStudent.course.schedule.forEach((scheduleDay) => {
      const j = table.head.indexOf(scheduleDay.day);
      const i1 = parseInt((scheduleDay.start_time - 30) / 100) - 6;
      const i2 = parseInt((scheduleDay.end_time - 30) / 100) - 7;
      for (let index = i1; index <= i2; index++) {
        table.data[index][j] = courseName;
      }
      console.log(courseName, [i1, i2], j)
      
    });
  });
  const [tableData, useTableData] = useState(table);
  /* [
      ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
      ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
      ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
      ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
      ['Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
      ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
    ] */
  console.log(state);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Mi Horario</h4>
            <p className={classes.cardCategoryWhite}>
              ¿Tarde para la clase? Check it 😉
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={tableData.head}
              tableData={tableData.data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
