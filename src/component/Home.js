import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import "../component/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineNavigateNext } from "react-icons/md";
import "../component/test.css";
import { Link } from "react-router-dom";
import homebanner from "../image/banner/homebanner.jpg";
import check from "../image/icon/check.png";
import checkin from "../image/icon/checkin.png";
import rank from "../image/icon/rank.png";
import tick from "../image/icon/tick.png";
import { checkIn, exportExcel, reset, start } from "../lib/axios/index.js";
import { useNavigate } from "react-router-dom";
import warn from "../image/icon/warn.png";

function Home({ isCheckIn, setIsCheckIn, user, setUser, config, setConfig }) {
  const navigate = useNavigate();
  const [showCheckin, setShowCheckin] = useState(false);
  const [infos, setInfos] = useState({});

  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [config]);

  function calculateTimeRemaining() {
    const configEnd = new Date(config.end);
    const currentTime = new Date();
    const timeDifference = configEnd - currentTime;

    if (timeDifference <= 0) {
      return { minutes: 0, seconds: 0 };
    }

    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { minutes, seconds };
  }

  const handleCloseCheckin = () => {
    setShowCheckin(false);
  };
  const handleSubmitCheckin = async () => {
    const response = await checkIn(infos);
    if (response?.data) {
      setUser(response?.data?.user);
      setConfig(response?.data?.config);
      setIsCheckIn(true);
      setShowCheckin(false);
      setShowCheckinSuccess(true);
    }
  };
  const [showCheckCheckin, setShowCheckCheckin] = useState(false);
  const handleShowCheckin = () => {
      if (isCheckIn) setShowCheckCheckin(true);
      else setShowCheckin(true);
  };
  var today = new Date();

  const handleCloseCheckCheckin = () => setShowCheckCheckin(false);
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false);
  const handleCloseCheckinSuccess = () => setShowCheckinSuccess(false);

  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showTimeEndWarning, setShowTimeEndWarning] = useState(false);
  const [showCountDown, setShowCountDown] = useState(true);
  const [showStartCountDown, setStartCountDown] = useState(true);
  const handleCloseTimeEndWarning = () => setShowTimeEndWarning(false);
  const handleVote = () => {
    const configEnd = new Date(config.end);
    if (configEnd < today) {
      setShowTimeEndWarning(true);
    } else {
      if (isCheckIn) navigate("/voteTeam");
      else setShowCheckin(true);
    }
  };
  useEffect(() => {
    const configStart = new Date(config.start);
    if (configStart < today) {
      setShowTimeWarning(false);
      setStartCountDown(false);
    } else {
      setShowTimeWarning(true);
    }
    setTimeRemaining(calculateTimeRemaining());
  }, [config]);
  const handleCloseTimeWarning = () => {
    setShowTimeWarning(false);
  };
  useEffect(() => {
    if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      setShowCountDown(false);
    }
  }, [timeRemaining]);

  const onStart = async () => {
    const response = await start();
    if (response.data) {
      window.location.reload();
    }
  };
  const onReset = async () => {
    await reset();
    window.location.reload();
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="home" style={{ maxWidth: "600px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12" style={{ padding: "0" }}>
              <div
                className="banner"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  className="img w-100"
                  src={homebanner}
                  alt="datxanhmienbac"
                />
              </div>

              <div className="body">
                <div className="col-12">
                  <p className="cover">
                    Chào mừng các DXMB-ERs đến với chương trình
                    <br />
                    <strong>
                      YEAR END PARTY 2023 - CHÀO XUÂN 2024
                    </strong> của <br />
                    <strong>ĐẤT XANH MIỀN BẮC!</strong>
                    <br />
                    Vui lòng lựa chọn các thao tác dưới đây !
                  </p>
                </div>
                <div className="col-12">
                  <button className="selection" onClick={handleShowCheckin}>
                    <div className="col-3">
                      <img
                        style={{ width: "65px" }}
                        className="icon"
                        src={checkin}
                        alt="icon"
                      />
                    </div>
                    <div className="col-7">
                      <span>Check in sự kiện</span>
                    </div>
                    <div className="col-2">
                      <MdOutlineNavigateNext />
                    </div>
                  </button>
                  <button className="selection" onClick={handleVote}>
                    <div className="col-3">
                      <img
                        style={{ width: "65px" }}
                        className="icon"
                        src={check}
                        alt="icon"
                      />
                    </div>
                    <div className="col-7">
                      <span>Bình chọn Anh Tài</span>
                    </div>
                    <div className="col-2">
                      <MdOutlineNavigateNext />
                    </div>
                  </button>

                  <Link to={"/rank"} style={{ textDecoration: "none" }}>
                    <button
                      className="selection"
                      style={{ marginBottom: "30px" }}
                    >
                      <div className="col-3">
                        <img
                          style={{ width: "65px" }}
                          className="icon"
                          src={rank}
                          alt="icon"
                        />
                      </div>
                      <div className="col-7">
                        <span>Bảng xếp hạng</span>
                      </div>
                      <div className="col-2">
                        <MdOutlineNavigateNext />
                      </div>
                    </button>
                  </Link>
                </div>
                {showStartCountDown ? (
                  <div
                    className="countdown w-75"
                    style={{ marginBottom: "8px", marginTop: "auto" }}
                  >
                    <h1 style={{ textAlign: "center", fontSize: "18px" }}>
                      Thời gian bình chọn chưa bắt đầu
                    </h1>
                  </div>
                ) : (
                  <div
                    className="w-100"
                    style={{ marginBottom: "8px", marginTop: "auto" }}
                  >
                    {showCountDown ? (
                      <div className="countdown w-75">
                        <h1 style={{ textAlign: "center", fontSize: "18px" }}>
                          Bình chọn sẽ kết thúc trong:
                        </h1>
                        <div className="time">
                          <span>
                            {timeRemaining.minutes.toString().padStart(2, "0")}
                          </span>
                          :
                          <span>
                            {timeRemaining.seconds.toString().padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="countdown w-75"
                        style={{ marginBottom: "8px", marginTop: "auto" }}
                      >
                        <h1 style={{ textAlign: "center", fontSize: "18px" }}>
                          Thời gian bình chọn đã kết thúc
                        </h1>
                      </div>
                    )}
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                    marginTop: "20px",
                  }}
                >
                  {user?.isAdmin && (
                    <Button
                      onClick={() => onStart()}
                      className="btn btn-danger"
                      style={{ width: "50%" }}
                    >
                      Bắt đầu
                    </Button>
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  {user?.isAdmin && (
                    <Button
                      onClick={() => onReset()}
                      className="btn btn-danger"
                      style={{ width: "50%" }}
                    >
                      Reset
                    </Button>
                  )}
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                </div>
              </div>

              <div className="Checkin">
                <Modal
                  show={showCheckin}
                  onHide={handleCloseCheckin}
                  className="modalCheckin"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="modal-image">
                      <Image
                        src={checkin}
                        centered
                        style={{ borderRadius: "50%", width: "150px" }}
                      />
                    </div>
                    <h2>Bạn cần check in để có thể tham gia bình chọn</h2>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label style={{ fontWeight: "700" }}>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nhập email"
                          value={infos.email}
                          onChange={(e) =>
                            setInfos({ ...infos, email: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label style={{ fontWeight: "700" }}>
                          Mã nhân viên{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập mã nhân viên"
                          value={infos.code || "MB"}
                          onChange={(e) => {
                            if (!infos.code || infos.code.startsWith("MB")) {
                              setInfos({ ...infos, code: e.target.value });
                            } else
                              setInfos({
                                ...infos,
                                code: "MB" + e.target.value,
                              });
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label style={{ fontWeight: "700" }}>
                          Tên nhân viên
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên nhân viên"
                          value={infos.fullName}
                          onChange={(e) =>
                            setInfos({ ...infos, fullName: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={handleSubmitCheckin}
                      className=" btn btn-danger w-100"
                      disabled={!infos.email || !infos.code || !infos.fullName}
                    >
                      Check in
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="CheckinSuccess">
                <Modal
                  show={showCheckinSuccess}
                  onHide={handleCloseCheckinSuccess}
                  className="modalCheckinSuccess"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="modal-image">
                      <Image
                        src={tick}
                        centered
                        style={{ borderRadius: "50%", width: "150px" }}
                      />
                    </div>
                    <h2>Check in thành công</h2>
                    <p>
                      Cảm ơn bạn đã check in thành công!
                      <br />
                      Hãy bắt đầu bình chọn cho thí sinh mà bạn yêu thích ngay
                      bây giờ
                    </p>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="CheckCheckin">
                <Modal
                  show={showCheckCheckin}
                  onHide={handleCloseCheckCheckin}
                  className="modalCheckinSuccess"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="modal-image">
                      <Image
                        src={tick}
                        centered
                        style={{ borderRadius: "50%", width: "150px" }}
                      />
                    </div>
                    <h2>Bạn đã check in</h2>
                  </Modal.Body>
                </Modal>
              </div>
              <div className="Warning">
                <Modal
                  show={showTimeWarning}
                  onHide={handleCloseTimeWarning}
                  className="modalWarning"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="modal-image">
                      <Image
                        src={warn}
                        centered
                        style={{ borderRadius: "50%", width: "150px" }}
                      />
                    </div>
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      Thời gian bình chọn chưa bắt đầu
                    </h1>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></Modal.Footer>
                </Modal>
              </div>
              <div className="Warning">
                <Modal
                  show={showTimeEndWarning}
                  onHide={handleCloseTimeEndWarning}
                  className="modalWarning"
                  centered
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="modal-image">
                      <Image
                        src={warn}
                        centered
                        style={{ borderRadius: "50%", width: "150px" }}
                      />
                    </div>
                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      Thời gian bình chọn đã kết thúc
                    </h1>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
