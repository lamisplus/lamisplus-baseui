import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { TiWarningOutline } from 'react-icons/ti'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import {
//     FormGroup,
//     } from 'reactstrap';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import MatButton from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { FormGroup, Input, Label, Alert } from 'reactstrap'

import { url } from '../../../api'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto'
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  root2: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(7),
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 12
    },
    pos: {
      fontSize: 11
    },
    cardContent: {
      padding: 2
    },
    cardroot: {
      margin: theme.spacing(1),
      height: 250 + 'px !important'
    }
  }
}))

function not (a, b) {
  return a.filter(value => b.indexOf(value) === -1)
}

function intersection (a, b) {
  return a.filter(value => b.indexOf(value) !== -1)
}

export default function ConsultationPage (props) {
  const { getpatient } = props.getpatientdetails

  const PatientID = getpatient.row.patientId
  const visitId = getpatient.row.id
  const saveTestUrl =
    url + 'encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM/' + PatientID

  const classes = useStyles()

  const [checked, setChecked] = React.useState([])
  const [testGroups, setTestGroup] = React.useState([])
  //const [tests, setTests] = React.useState([]);
  const [left, setLeft] = React.useState([])
  const [right, setRight] = React.useState([])
  const [showLoading, setShowLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  useEffect(() => {
    async function fetchTestGroup () {
      console.log('fetching test group')
      try {
        const response = await fetch(
          url + 'encounters/laboratory/labtest-group'
        )
        const body = await response.json()
        console.log(body)
        setTestGroup(
          body.map(({ category, id }) => ({ label: category, value: id }))
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchTestGroup()
  }, [])

  const getTestByTestGroup = e => {
    const testGroupId = e.target.value
    async function fetchTests () {
      const response = await fetch(
        url + 'encounters/laboratory/' + testGroupId + '/labtest'
      )
      const testLists = await response.json()
      setLeft(testLists)
    }
    fetchTests()
  }
  const saveTestOrder = e => {
    e.preventDefault()
    setShowLoading(true)
    setSuccessMessage('')
    const data = {
      formData: right,
      patientId: PatientID,
      visitId: visitId,
      formName: 'LABTEST_ORDER_FORM',
      serviceName: 'GENERAL_SERVICE'
    }
    axios
      .post(saveTestUrl, data)
      .then(result => {
        setShowLoading(false)
        setRight([])
        setLeft([])
        setSuccessMessage('Test Order Successfully Saved!')
        toast.success(' Successful!')
      })
      .catch(error => {
        console.log(error)
        setSuccessMessage('An error occurred, could not save request!')
        setShowLoading(false)
      })
  }
  const customList = items => (
    <Paper className={classes.paper}>
      <List dense component='div' role='list'>
        {items.map(value => {
          const labelId = `transfer-list-item-${value.id}-label`

          return (
            <ListItem
              key={value}
              role='listitem'
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.description} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )

  return (
    <form className={classes.form} onSubmit={saveTestOrder}>
      {/* The input search field  */}
      <Grid container spacing={2}>
        <Grid item xs='12'>
          <Card className={classes.cardroot}>
            <CardContent>
              <Typography
                className={classes.title}
                color='primary'
                gutterBottom
              >
                Test Order
              </Typography>
              {successMessage ? (
                <Alert color='primary'>
                  <TiWarningOutline size='25' className=' text-dark' />
                  {successMessage}
                </Alert>
              ) : (
                ''
              )}
              <br />
              <Grid
                container
                spacing={2}
                justify='center'
                alignItems='center'
                className={classes.root}
              >
                <FormGroup>
                  <Label for='testGroup'>Please Select Test Order</Label>
                  <Input
                    type='select'
                    name='testGroup'
                    onChange={getTestByTestGroup}
                  >
                    <option value=''>Select Test Group</option>
                    {testGroups.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Grid>
              <br />
              <Grid
                container
                spacing={2}
                justify='center'
                alignItems='center'
                className={classes.root}
              >
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                  <Grid container direction='column' alignItems='center'>
                    <Button
                      variant='outlined'
                      size='small'
                      className={classes.button}
                      onClick={handleAllRight}
                      disabled={left.length === 0}
                      aria-label='move all right'
                    >
                      ≫
                    </Button>
                    <Button
                      variant='outlined'
                      size='small'
                      className={classes.button}
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label='move selected right'
                    >
                      &gt;
                    </Button>
                    <Button
                      variant='outlined'
                      size='small'
                      className={classes.button}
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label='move selected left'
                    >
                      &lt;
                    </Button>
                    <Button
                      variant='outlined'
                      size='small'
                      className={classes.button}
                      onClick={handleAllLeft}
                      disabled={right.length === 0}
                      aria-label='move all left'
                    >
                      ≪
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
              </Grid>
              <br />
              <Grid
                container
                spacing={2}
                justify='center'
                alignItems='center'
                className={classes.root}
              >
                <MatButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  Save &nbsp;
                  {showLoading ? (
                    <Spinner animation='border' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </Spinner>
                  ) : (
                    ''
                  )}
                </MatButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <br />
      </Grid>
    </form>
  )
}
