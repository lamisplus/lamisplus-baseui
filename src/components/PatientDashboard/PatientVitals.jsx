import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { url } from '../../api'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    chips: {
      fontSize: 11,
      marginRight: 30
    }
  }
}))
const chips = {
  marginLeft: 0
}

export default function PatientVitals (props) {
  const getpatientID = props.getpatientID
  const classes = useStyles()
  const [data, setData] = useState({
    pulse: '',
    height: '',
    systolic: '',
    diastolic: '',
    bodyWeight: ''
  })
  // const newid = data;

  console.log(data.patientId)
  const apistate =
    url +
    'encounters/GENERAL_SERVICE/VITAL_SIGNS_FORM/' +
    getpatientID +
    '/last'
  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apistate)
      setData(result.data.formData)
      console.log(result.data.formData)
    }
    GetData()
  }, [])

  return (
    <div className={classes.root}>
      <Card className={classes.cardroot} style={props.height}>
        <CardContent>
          <Typography className={classes.title} color='primary' gutterBottom>
            Recent Vital Signs
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                Pulse :
                <Chip
                  variant='outlined'
                  size='small'
                  label={data.pulse}
                  style={chips}
                />
              </Typography>
            </Grid>

            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                Weight:{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.bodyWeight}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                RR :{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.respiratoryRate}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                Height:{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.height}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                Temperature:{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.temperature}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                BMI:{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.pulse}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary' gutterBottom>
                Blood Presure :{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.diastolic}
                />
              </Typography>
            </Grid>
            <Grid item xs='6'>
              <Typography color='textPrimary gutterBottom'>
                BMI Sstatus:{' '}
                <Chip
                  variant='outlined'
                  size='small'
                  style={chips}
                  label={data.pulse}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}
