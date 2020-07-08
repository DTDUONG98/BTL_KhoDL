import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
// import SimpleReactCalendar from 'simple-react-calendar'
import './App.css';
const styles = theme =>({
  grid: {
    textAlign: 'center'
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        { title: 'Mặt hàng', field: 'MaMH', type: "String" },
        { title: 'Số lượng đặt', field: 'quantity', type: "String" },
        { title: 'Tổng tiền', field: 'Amount', type: 'Date' },
        { title: 'Số lượng', field: 'soluong', type: 'Date' },
      ],
      data: [
        { MaMH: '1', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
        { MaMH: '2', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
        { MaMH: '3', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
        { MaMH: '4', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
        { MaMH: '5', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
        { MaMH: '6', quantity: 1000094, Amount: 378612893, soluong: 10000094 },
      ]
    }
  }
  render() {
    const { columns, data } = this.state
    const {classes} = this.props
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.grid}>
          {/* <SimpleReactCalendar activeMonth={new Date()} /> */}
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title="Danh sách các khách hàng "
            columns={columns}
            data={data}
          // editable={{
          //     onRowUpdate: (newData, oldData) =>
          //         new Promise((resolve) => {
          //             setTimeout(async () => {
          //                 resolve();
          //                 console.log('AAA')
          //             }, 600);
          //         }),
          //     onRowDelete: (oldData) =>
          //         new Promise((resolve) => {
          //             setTimeout( async () => {
          //                 resolve();
          //                 console.log('BBB')
          //             }, 600);
          //         }),
          // }}
          />
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(App);