import React, { useState, useContext, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import { Context } from 'utils/provider.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [state, setState] = useContext(Context);
  const [username, setUsername] = useState(state.user.username);
  const [email, setEmail] = useState(state.user.email);
  const [country, setCountry] = useState(state.user.country);
  const [city, setCity] = useState(state.user.city);
  const [phone, setPhone] = useState(state.user.phone);
  const notifySuccess = () =>
    toast.success('¡Perfil actualizado correctamente!');
  const notifyError = () => toast.error('Algo ha salido mal...');

  const handleUpdateProfile = async () => {
    const newProfile = {
      username,
      email,
      country,
      city,
      phone: parseInt(phone),
    };
    // Remove undefined properties
    Object.keys(newProfile).forEach((key) =>
      newProfile[key] === undefined ? delete newProfile[key] : {}
    );
    // Parsing phone to number instead of string
    if (isNaN(newProfile.phone)) delete newProfile.phone;
    console.log(newProfile);


    try {
      const response = await axios.put('/students', newProfile, {
        headers: {
          'x-access-token': state.token,
        },
      });
      if (response.data.success) {
        console.log(newProfile)
        setState({ ...state, user: { ...state.user,...newProfile } });
        notifySuccess();
      } else {
        notifyError();
      }
    } catch (error) {
      notifyError();
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
              <p className={classes.cardCategoryWhite}>
                ¿Necesitas actualizar tus datos? Hazlo aquí
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombres"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: state.user.firstname,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Apellidos"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: state.user.lastname,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombre de usuario"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: username,
                      onChange: (e) => setUsername(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Correo electrónico"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: email,
                      onChange: (e) => setEmail(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Pais"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: country,
                      onChange: (e) => setCountry(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Ciudad"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: city,
                      onChange: (e) => setCity(e.target.value),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Teléfono"
                    id="cellphone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      defaultValue: phone,
                      onChange: (e) => setPhone(e.target.value),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleUpdateProfile}>
                Actualizar Perfil
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  src={
                    'https://pbs.twimg.com/profile_images/1349563706900942849/gFVOVxwi_400x400.jpg'
                  }
                  alt="..."
                />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>ESTUDIANTE</h6>
              <h4 className={classes.cardTitle}>Miguel Nieto Arias</h4>
              <p className={classes.description}>
                Programa: Ingeniería de Sistemas Departamento de Ingeniería de
                Sistemas Semestre: 7
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
