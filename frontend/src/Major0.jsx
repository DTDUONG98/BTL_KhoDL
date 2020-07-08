import React, { Component } from 'react'
import MaterialTable from 'material-table'
import { Grid, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import _ from 'lodash'
const styles = theme => ({
  grid: {
    textAlign: 'center',
    padding: 30,
  },
  button: {
    borderRadius: 10,
    marginRight: 20,
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChangeTypeOfTime = this.handleChangeTypeOfTime.bind(this)
    this.state = {
      columns: [
        { title: 'Mặt hàng', field: 'Ma_MH', type: "String" },
        { title: 'Số lượng đặt', field: 'SoLuongDat', type: "String" },
        { title: 'Tổng tiền', field: 'TongTien', type: 'Date' },
        { title: 'Số lượng', field: 'SoLuong', type: 'Date' },
      ],
      data: [

      ]
    }
  }
  async handleChangeTypeOfTime(element){
    let TypeOfTime = element.currentTarget.value
    console.log('TypeOfTime', TypeOfTime)
    let dataReceive = await (axios.post('http://localhost:3000', {
      TypeOfTime: TypeOfTime
    }))
    let data = _.get(dataReceive, 'data', [])
    console.log(`data ${TypeOfTime}`, data)
    this.setState({
      data: data
    })
  }
  render() {
    const { columns, data } = this.state
    const { classes } = this.props
    return (
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.grid}>
          <Button
            variant="contained"
            value="Nam"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.handleChangeTypeOfTime}
          >
            SELECT theo Năm
              </Button>
          <Button
            variant="contained"
            value="Thang"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.handleChangeTypeOfTime}
          >
            SELECT theo Tháng
              </Button>
          <Button
            variant="contained"
            value="Ngay"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.handleChangeTypeOfTime}
          >
            SELECT theo Ngày
              </Button>
        </Grid>
        <Grid item xs={12}>
          <MaterialTable
            title="Tính Measure theo Mat Hang, Hierachies theo thời gian"
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