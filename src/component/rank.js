import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../image/banner/banner.png";
import { MdFavorite } from "react-icons/md";
import { FaCrown } from "react-icons/fa6";
import { getListTeam } from "../lib/axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bg from "../image/banner/bg.jpg";
import logo from "../image/banner/logo.png";

function Rank({ isCheckIn, setIsCheckIn, user, setUser, setRender }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getListTeam();
    if (response?.data) {
      const newData = response.data;
      newData.sort((a, b) => b.count - a.count);
      setData(newData);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="binhchon"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        maxWidth: "600px",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12" style={{ padding: "0" }}>
            <div
              className="banner"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                marginTop: 12,
              }}
            >
              <img className="img w-25" src={logo} alt="datxanhmienbac" />
              <img className="img w-75" src={banner} alt="datxanhmienbac" />
            </div>

            {data && data[0] && (
              <div className="body" style={{ padding: "0 15px 15px 15px" }}>
                <h1 className="title-binhchon">BẢNG XẾP HẠNG</h1>
                <div
                  className="col-12"
                  style={{ padding: "3% 10px 0 10px", aspectRatio: "1/0.9" }}
                >
                  <div
                    className="top3"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "relative",
                    }}
                  >
                    <div
                      className="1st"
                      style={{
                        width: "50%",
                        position: "absolute",
                        left: "25%",
                        zIndex: "2",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          flexDirection: "column",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaCrown
                          style={{ fontSize: "30px", color: "#FEBE10" }}
                        />
                        <img
                          src={data[0]?.image}
                          style={{
                            borderRadius: "50%",
                            width: "100%",
                            aspectRatio: "1/1",
                            objectFit: "cover",
                            border: "3px solid #FEBE10",
                          }}
                        />
                        <span style={{ color: "white", fontSize: "90%" }}>
                          {data[0]?.name}
                        </span>
                        <div
                          className="result"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {data[0]?.count}
                          </span>
                          <MdFavorite />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15%",
                      }}
                    >
                      <div
                        className="2nd"
                        style={{
                          width: "35%",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span style={{ color: "white" }}>2</span>
                        <img
                          src={data[1]?.image}
                          style={{
                            width: "100%",
                            aspectRatio: "1/1",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid #FEBE10",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              marginTop: "30%",
                              fontSize: "80%",
                              color: "white",
                            }}
                          >
                            {data[1]?.name}
                          </span>
                          <div
                            className="result"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {data[1]?.count}
                            </span>
                            <MdFavorite />
                          </div>
                        </div>
                      </div>
                      <div
                        className="3rd"
                        style={{
                          width: "35%",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span style={{ color: "white" }}>3</span>
                        <img
                          src={data[2]?.image}
                          style={{
                            width: "100%",
                            aspectRatio: "1/1",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "3px solid #FEBE10",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <span
                            style={{
                              marginTop: "30%",
                              fontSize: "70%",
                              color: "white",
                            }}
                          >
                            {data[2]?.name}
                          </span>
                          <div
                            className="result"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {data[2]?.count}
                            </span>
                            <MdFavorite />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  {data?.length > 0 &&
                    data.map((d, index) => (
                      <div
                        key={index}
                        className="card w-100"
                        style={{
                          marginBottom: "30px",
                        }}
                      >
                        <div
                          className="card-body"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <div className="col-2">
                            <span
                              style={{
                                padding: "5px 8px 5px 8px",
                                borderRadius: "10px",
                                border: "1px solid lightgrey",
                                fontWeight: "bold",
                                fontSize: "18px",
                              }}
                            >
                              {index + 1}
                            </span>
                          </div>

                          <div
                            className="col-8"
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {d.projectName}
                            </span>
                            <span>{d.name}</span>
                          </div>
                          <div className="col-2">
                            <div
                              className="result"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "20%",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  marginRight: "12px",
                                }}
                              >
                                {d.count}
                              </span>
                              <MdFavorite
                                style={
                                  user?.votes?.includes(d._id) && {
                                    color: "#dc3545",
                                  }
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <Button
                    onClick={() => {
                      setRender((pre) => !pre);
                      navigate("/");
                    }}
                    className=" btn btn-danger w-100"
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "22px",
                      fontWeight: "600",
                      padding: "10px 0 10px 0",
                    }}
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Rank;
