import React, { useContext } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import useFormFields from '../hooks/useFormFields';
import { UserContext } from '../contexts/UserProvider';
import {
  UPDATE_USER,
  STUDENT,
  MERGE_STUDENT,
  ADD_TRAIT_STUDENT_TRAITS,
  UPDATE_STUDENT,
  UPDATE_TRAIT_STUDENT_TRAITS
} from '../utils/gqlQueries';
import BasicInfo from '../components/BasicInfo';
import Preferences from '../components/Preferences';

/* Create custom styling for RegistrationPage */
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '75%'
  },
  buttonLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '25%',
    paddingRight: '25%'
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  button: {
    margin: theme.spacing(2),
    width: theme.spacing(5)
  },
  instructions: {
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  }
}));

/* List of steps to iterate through in order to complete registration */
function getSteps() {
  return ['Basic Info', 'Interests and Preferences', 'Submit'];
}

/* List of step instructions */
function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Tell us who you are!';
    case 1:
      return 'Are you...';
    case 2:
      return "You're all done!";
    default:
      return 'Unknown step';
  }
}

/* Default fields for user preferences */
const defaultFormFields = {
  schedule: 50,
  cleanliness: 50,
  participation: 50,
  studious: 50
};

/* Page to edit profile options extends registration page */
export function EditPage() {
  const [user, setUser] = useContext(UserContext);
  const { data, error, loading } = useQuery(STUDENT, {
    variables: { sid: user.sid.toString() }
  });

  /* Check for complete profile */
  if (!user.isComplete) return <Redirect to='/register' />;

  /* Handle GraphQL server responses */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return <p>Not found</p>;

  /* Return RegistrationPage with special (editing) props */
  return (
    <RegistrationPage
      formFields={{
        gender: data.Student[0].gender,
        age: data.Student[0].age,
        hostel: data.Student[0].hostel,
        schedule: user.schedule,
        cleanliness: user.cleanliness,
        participation: user.participation,
        studious: user.studious
      }}
      isEditing={true}
    />
  );
}

export function RegistrationPage(props) {
  /* Define custom styles for RegistrationPage */
  const classes = useStyles();

  /* Define registration steps */
  const steps = getSteps();

  /* Implement GraphQL hooks from gqlQueries.js */
  const [UpdateUser] = useMutation(UPDATE_USER);
  const [MergeStudent] = useMutation(MERGE_STUDENT);
  const [AddTraitStudentTraits] = useMutation(ADD_TRAIT_STUDENT_TRAITS);
  const [UpdateStudent] = useMutation(UPDATE_STUDENT);
  const [UpdateTraitStudentTraits] = useMutation(UPDATE_TRAIT_STUDENT_TRAITS);

  /* Access userContext */
  const [user, setUser] = useContext(UserContext);

  /* Validate field inputs using React state */
  const [missingField, setMissingField] = React.useState(false);

  /* Set active step of process to 0 using React state */
  const [activeStep, setActiveStep] = React.useState(0);

  /* Check for completion using redirect state */
  const [redirect, setRedirect] = React.useState(
    user.isComplete && !props.isEditing
  );

  /* Implement custom useFormFields hook to handle user selections during Registration/Editing */
  const [fieldsFilled, updateFields] = useFormFields(
    props.formFields ? props.formFields : defaultFormFields
  );

  /* Handle required updates of Neo4j nodes and edges for EditPage */
  const UpdateNeo4jNode = props.isEditing ? UpdateStudent : MergeStudent;
  const UpdateNeo4jEdge = props.isEditing
    ? UpdateTraitStudentTraits
    : AddTraitStudentTraits;

  /* Render appropriate form pages upon click of next-button */
  const handleNext = () => {
    if (
      activeStep !== 0 ||
      (fieldsFilled.hostel && fieldsFilled.age && fieldsFilled.gender)
    ) {
      setMissingField(false);
      return setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      setMissingField(true);
    }
  };

  /* Render appropriate form pages upon click of back-button */
  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);

  /* Handle async operation of submitting all selected preferences to GraphQL server upon finish */
  /* Every GraphQL call uses parameterized queries for security purposes */
  const handleSubmit = () => {
    UpdateUser({
      variables: {
        sid: user.sid,
        hostel: fieldsFilled.hostel,
        schedule: fieldsFilled.schedule,
        cleanliness: fieldsFilled.cleanliness,
        participation: fieldsFilled.participation,
        studious: fieldsFilled.studious
      }
    })
      .then(async () => {
        await UpdateNeo4jNode({
          variables: {
            sid: user.sid,
            hostel: fieldsFilled.hostel,
            age: fieldsFilled.age,
            gender: fieldsFilled.gender
          }
        });
        Object.keys(fieldsFilled).map(async key => {
          if (key !== 'gender' && key !== 'age' && key !== 'hostel')
            await UpdateNeo4jEdge({
              variables: {
                from: { sid: user.sid },
                to: { name: `${key}` },
                data: { strength: fieldsFilled[key] }
              }
            });
        });
      })
      .then(async () => {
        setRedirect(true);
      });
  };

  if (redirect === true) {
    /* Update userContext for entire application upon new submission of updated preferences */
    setUser({ ...user, update: true });

    /* Redirect back to Home */
    return <Redirect to='/' />;
  }

  /* Render stepper and BasicInfo.js or Preferences.js components depending on current step */
  return (
    <div className={classes.root}>
      <Stepper classes={{ root: classes.stepper }} activeStep={activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        <div className={classes.instructions}>
          <Typography variant='h5'>{getStepContent(activeStep)}</Typography>
        </div>
        {activeStep === 0 && (
          <BasicInfo
            value={fieldsFilled}
            onChange={updateFields}
            child={
              missingField && (
                <Alert severity='error'>Some field are missing.</Alert>
              )
            }
          />
        )}
        {activeStep === 1 && (
          <Preferences value={fieldsFilled} onChange={updateFields} />
        )}
        <div className={classes.buttonLayout}>
          <Button
            variant='contained'
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
