import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

/* Custom container component for Preference selection component */
const InfoContainer = withStyles({
  root: {
    justifyContent: 'center',
    padding: '3vh',
    backgroundColor: '#e1e3dd',
    borderRadius: '25px',
    width: '70%'
  }
})(Container);

/* Custom styles for Preference selection component */
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: '70%',
    marginBottom: theme.spacing(1),
    display: 'block'
  },
  formControlText: {
    width: '80%',
    margin: theme.spacing(2)
  },
  formLabel: {
    color: '#000',
    '&.Mui-focused': {
      color: '#000'
    }
  }
}));

/* Mappings between values and descriptors */
const levels = [
  {
    value: 0,
    label: 'No Way'
  },
  {
    value: 25,
    label: ''
  },
  {
    value: 50,
    label: 'Sometimes'
  },
  {
    value: 75,
    label: ''
  },
  {
    value: 100,
    label: 'Definitely'
  }
];

function valuetext(value) {
  return `${value}`;
}

/* Preferences component can be passed initial and changed values and onChange function */
/* onChange allows for updated values to be passed to parent form in RegistrationPage.js */
export default function RadioButtonsGroup({ value, onChange }) {
  const classes = useStyles();

  /* Render custom form with slider for each preference */
  /* Pass every change to parent form */
  return (
    <InfoContainer maxWidth='xl'>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          A Night Owl?
        </FormLabel>
        <Slider
          defaultValue={value.schedule}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'schedule', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          A Neat Freak?
        </FormLabel>
        <Slider
          defaultValue={value.cleanliness}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'cleanliness', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          An Active Community Member?
        </FormLabel>
        <Slider
          defaultValue={value.participation}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'participation', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          A Hard-Working Student?
        </FormLabel>
        <Slider
          defaultValue={value.studious}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'studious', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
    </InfoContainer>
  );
}
