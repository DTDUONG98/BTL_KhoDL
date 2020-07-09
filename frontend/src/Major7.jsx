import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MaterialTable from 'material-table'
import { IconButton, Tooltip, CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, Container, Grid, Link, Button } from '@material-ui/core';
import { Major1, Major2, Major3, Major4, Major5, Major6, Major7, Major8, Major9 } from './Component/ListItem'
import axios from 'axios'
import _ from 'lodash'
const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        backgroundColor: '#D6E2F3',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    grid: {
        textAlign: 'center',
        padding: 30,
    },
    button: {
        borderRadius: 10,
        marginRight: 20,
    }
});
class Tap7 extends Component {
    constructor(props) {
        super(props)
        this.handleChangeTypeOfTime = this.handleChangeTypeOfTime.bind(this)
        this.state = {
            open: true,
            columns: [
                { title: 'Mặt hàng', field: 'Ma_MH', type: "String" },
                { title: 'Số lượng', field: 'SoLuong', type: "String" }
            ],
            data: [

            ]
        }
    }
    handleDrawerOpen = () => {
        this.setState({
            open: true
        })
    };
    handleDrawerClose = () => {
        this.setState({
            open: false
        })
    };
    handleToMajor1 = (element) => {
        this.props.history.push('/')
    }
    handleToMajor2 = element => {
        this.props.history.push('/Major2/Major2')
    }
    handleToMajor3 = element => {
        this.props.history.push('/Major3/Major3')
    }
    handleToMajor4 = element => {
        this.props.history.push('/Major4/Major4')
    }
    handleToMajor5 = element => {
        this.props.history.push('/Major5/Major5')
    }
    handleToMajor6 = element => {
        this.props.history.push('/Major6/Major6')
    }
    handleToMajor7 = element => {
        window.location.reload()
    }
    handleToMajor8 = element => {
        this.props.history.push('/Major8/Major8')
    }
    handleToMajor9 = element => {
        this.props.history.push('/Major9/Major9')
    }

    async handleChangeTypeOfTime(element) {
        let TypeOfTime = element.currentTarget.value
        console.log('TypeOfTime', TypeOfTime)
        let dataReceive = await (axios.post('http://localhost:3000/7', {
            TypeOfTime: TypeOfTime
        }))
        let data = _.get(dataReceive, 'data', [])
        console.log(`data ${TypeOfTime}`, data)
        this.setState({
            data: data
        })
    }
    render() {
        const { open, columns, data } = this.state
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Nghiệp vụ 7
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List onClick={this.handleToMajor1}>{Major1}</List>
                    <List onClick={this.handleToMajor2}>{Major2}</List>
                    <List onClick={this.handleToMajor3}>{Major3}</List>
                    <List onClick={this.handleToMajor4}>{Major4}</List>
                    <List onClick={this.handleToMajor5}>{Major5}</List>
                    <List onClick={this.handleToMajor6}>{Major6}</List>
                    <List onClick={this.handleToMajor7}>{Major7}</List>
                    <List onClick={this.handleToMajor8}>{Major8}</List>
                    <List onClick={this.handleToMajor9}>{Major9}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                    </Container>
                </main>
            </div>
        );
    }
}
export default withStyles(styles)(Tap7);