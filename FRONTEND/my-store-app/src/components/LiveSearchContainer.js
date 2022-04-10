import {
  Dialog,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  form: {
    right: 150,
    position: "absolute",
    zIndex: 999,
    width: "100%",
    backgroundColor: "#ffffff",
    // boxShadow: '1px 0px 5px #1b00ff',
    borderBottom: "1px solid #999999",
    borderRight: "1px solid #999999",
    borderLeft: "1px solid #999999",
    // borderRadius: '10px 10px 10px 10px'
  },
  title: {
    backgroundColor: "#f5f5f5",
    padding: 3,
    border: "1px solid #ffffff",
    borderRadius: "10px 10px 0px 0px",
    borderBottom: "1px solid #f0f0f0",
  },
  titlebottom: {
    marginTop: 10,
    padding: 3,
    borderTop: "1px solid #f0f0f0",
    border: "1px solid #ffffff",
    borderRadius: "0px 0px 10px 10px",
    backgroundColor: "#f5f5f5",
  },
  container: {
    backgroundColor: "#ffffff",
  },
  boximg: {
    marginTop: 10,
    textAlign: "center",
  },
  boxcontent: {
    paddingTop: 10,
  },
  img: {
    width: 100,
  },
  name: {
    textDecoration: "none",
    color: "#333333",
    fontSize: "20px",
    fontWeight: "bold",
    "&:hover": {
      color: "#288AD6 !important",
    },
  },
  price: {
    color: "#bf081f",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
    "&:hover": {
      color: "#E74847",
    },
  },
}));

function LiveSearchContainer(props) {
  const classes = useStyles();
  // const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const { data } = props;
  const data01 = data.slice(0, 3);
  console.log("du lieu nhan duoc:", data);
  const [open, setOpen] = useState(false);
  const [isLeave, setIsLeave] = useState(false);

  return (
    <div >
        <Grid container className={classes.form}>
          <Grid item xs={12} className={classes.title}>
            <Typography align="center" variant="h6" color="#666">
              Sản phẩm gợi ý
            </Typography>
          </Grid>

          <Grid container item xs={12} className={classes.container}>
            {data01.map((item) => {
              return (
                <>
                  <Grid xs={3} className={classes.boximg}>
                    <Link to={`/sanpham/${item.mshh}`}>
                      <img className={classes.img} src={`/${item.hinh}`} alt="" />
                    </Link>
                  </Grid>

                  <Grid xs={9} className={classes.boxcontent}>
                    <Grid>
                      <Link className={classes.name} to={`/sanpham/${item.mshh}`}>
                        {item.tenhh}
                      </Link>
                    </Grid>
                    <Grid>
                      <Typography>
                        <div>
                          <h5 className={classes.price}>
                            {item.gia.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h5>
                        </div>
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </Grid>

          <Grid container item xs={12} className={classes.container}></Grid>
          <Grid item xs={12} className={classes.titlebottom}>
            {/* <Typography align="center" variant="h6" color="#666">
              Hiển thị tất cả {data.length} sản phẩm
            </Typography> */}
          </Grid>
        </Grid>
    </div>
    
  );
}

export default LiveSearchContainer;
