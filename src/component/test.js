import React from "react";
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

function Test() {
  const [showCheckin, setShowCheckin] = useState(false);
  const handleCloseCheckin = () => {
    setShowCheckin(false);
  };
  const handleSubmitCheckin = () => {
    setShowCheckin(false);
    setShowCheckinSuccess(true);
  };
  const handleShowCheckin = () => setShowCheckin(true);

  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false);
  const handleCloseCheckinSuccess = () => setShowCheckinSuccess(false);

  return (
    <>
      <div className="home">
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
                    <strong>YEP 2023 - CHÀO XUÂN 2024</strong> của{" "}
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
                  <Link to={"/voteTeam"} style={{ textDecoration: "none" }}>
                    <button className="selection">
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
                  </Link>

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
                <div
                  className="countdown w-75"
                  style={{ marginBottom: "30px", marginTop: "auto" }}
                >
                  <h1 style={{ textAlign: "center", fontSize: "18px" }}>
                    Bình chọn sẽ kết thúc trong:
                  </h1>
                  <div className="time">
                    <span>06</span>:<span>59</span>
                  </div>
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
                    <h2>Check in sự kiện</h2>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="hello@example.com"
                          autoFocus
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Mã nhân viên</Form.Label>
                        <Form.Control type="email" placeholder="DXMB12234" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Tên nhân viên</Form.Label>
                        <Form.Control type="email" placeholder="Trần Thu Hà" />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={handleSubmitCheckin}
                      className=" btn btn-danger w-100"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
