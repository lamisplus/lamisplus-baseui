import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { FaPencilAlt } from 'react-icons/fa'

import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { url } from '../../api'
import AddVitalsPage from 'components/Vitals/AddVitalsPage'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 11
  }
}))(TableCell)
const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow)

export default function DataTableList (props) {
  const classes = useStyles()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  //Get list of Visit/checkin patients API
  const [data, setData] = useState([])
  const apipatient = url + 'patients'
  useEffect(() => {
    const GetData = async () => {
      const result = await axios(apipatient)
      setData(result.data)
    }
    GetData()
  }, [])
  //get the user that need to be checked in
  const [patientrow, setpatientValue] = useState()
  const getUsermodal = patientrow => {
    // setuservalue(user);
    setModal(!modal)
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='caption table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align='center'>Pulse(bpm)</StyledTableCell>
            <StyledTableCell align='center'>Respiratory(bpm)</StyledTableCell>
            <StyledTableCell align='center'>Temperature(c)</StyledTableCell>
            <StyledTableCell align='center'>Blood Pressure</StyledTableCell>
            <StyledTableCell align='center'>Weight(kg)</StyledTableCell>
            <StyledTableCell align='center'>Height(cm)</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <StyledTableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.calories}</TableCell>
              <TableCell align='center'>{row.fat}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>
                <Tooltip title='Edit Vitals'>
                  <IconButton
                    aria-label='Collect Sample'
                    onClick={() => {
                      getUsermodal(setpatientValue(row.firstName))
                    }}
                  >
                    <FaPencilAlt size={20} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </StyledTableRow>
          ))}
          <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>Add New Vitals</ModalHeader>
            <ModalBody></ModalBody>
          </Modal>
          <Modal isOpen={modal} size='lg'>
            <ModalHeader toggle={toggle}>Edit Patient Vitals</ModalHeader>
            <ModalBody>
              <AddVitalsPage patient={patientrow} />
            </ModalBody>
          </Modal>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
