import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "../component/binhchon.css";
import banner from "../image/banner/banner.png";
import logo from "../image/banner/logo.png";
import { MdFavorite } from "react-icons/md";
import warn from "../image/icon/warn.png";
import tick from "../image/icon/tick.png";
import { getInfo, getListTeam, voteTeam } from "../lib/axios/index.js";
import { useNavigate } from "react-router-dom";

function Binhchon({ isCheckIn, setIsCheckIn, user, setUser, setRender }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [favoriteClicked, setFavoriteClicked] = useState([]);
  const [count, setCount] = useState(0);
  const [showBinhChon, setShowBinhChon] = useState(false);
  const [showBinhChonSuccess, setShowBinhChonSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getListTeam();
      if (response?.data) setData(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user && user._id && user.votes && user.votes.length > 0) {
      setFavoriteClicked(user.votes);
      setCount(user.votes.length);
    }
  }, [user]);

  const disabled = user?.votes?.length > 0;

  const handleCloseBinhChon = () => setShowBinhChon(false);
  const handleShowBinhChon = () => {
    setShowBinhChon(true);
  };

  const handleCloseBinhChonSuccess = () => {
    setShowBinhChonSuccess(false);
    navigate("/");
  };

  const handleVote = (_id) => {
    if (!favoriteClicked.includes(_id)) {
      setFavoriteClicked((pre) => [...pre, _id]);
      setCount((pre) => pre + 1);
    } else {
      setFavoriteClicked((pre) => pre.filter((p) => p !== _id));
      setCount((pre) => pre - 1);
    }
  };

  const onVote = async () => {
    const response = await voteTeam({ teams: favoriteClicked });
    if (response?.data) {
      setShowBinhChon(false);
      setShowBinhChonSuccess(true);
    }

    const responseV2 = await getInfo();
    if (responseV2?.data?.checkUser) {
      setUser(responseV2?.data?.checkUser);
    }
  };

  return (
    <div className="binhchon" style={{ maxWidth: "600px" }}>
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
                gap: 10,
                marginTop: 12,
              }}
            >
              <img className="img w-25" src={logo} alt="datxanhmienbac" />
              <img className="img w-75" src={banner} alt="datxanhmienbac" />
            </div>

            <div className="body">
              <h1 className="title-binhchon">CỔNG BÌNH CHỌN</h1>
              <div className="col-12">
                <div className="thele" style={{ margin: "0 auto" }}>
                  <span>Thể lệ</span>
                  <p>
                    Bình chọn <strong>3</strong> tiết mục mà bạn yêu thích nhất
                  </p>
                  <br />
                  <p style={{ fontSize: "12px", fontStyle: "italic" }}>
                    Lưu ý: Cổng bình chọn sẽ mở sau khi kêt thúc tiết mục dự thi
                    cuối cùng
                  </p>
                </div>
                <div className="list">
                  {data &&
                    data[0] &&
                    data.map((doithi, index) => (
                      <div
                        className="baithi"
                        style={{
                          position: "relative",
                          marginBottom: "20px",
                          padding: "0 20px 0 20px",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <div
                          className="gradient-overlay"
                          style={{
                            position: "absolute",
                            top: "20%",
                            left: 20,
                            right: 20,
                            height: "80%",
                            background:
                              "linear-gradient(to bottom, transparent, blue)",
                            opacity: "0.7",
                            borderRadius: "20px",
                            padding: "0 20px 0 20px",
                            zIndex: "2",
                          }}
                        ></div>
                        <img
                          className="card-img-top w-100"
                          src={doithi.image}
                          alt="Card image cap"
                          style={{
                            width: "100%",
                            borderRadius: "20px",
                            border: "3px solid #00BFFF",
                            position: "relative",
                            zIndex: "1",
                          }}
                        />
                        <div
                          className="thongtin"
                          style={{
                            position: "absolute",
                            left: "40px",
                            bottom: "10px",
                            padding: "0px",
                            zIndex: "3",
                          }}
                        >
                          <span className="showname">{doithi.projectName}</span>
                          <p
                            className="groupname"
                            style={{ textAlign: "left", fontWeight: "400" }}
                          >
                            {doithi.name}
                          </p>
                          {favoriteClicked.includes(doithi._id) ? (
                            <button
                              className="button-binhchon"
                              disabled={disabled}
                              onClick={() => handleVote(doithi._id)}
                            >
                              <span>Bình chọn</span>
                              <MdFavorite className="favou-icon-love" />
                            </button>
                          ) : (
                            <button
                              style={{
                                opacity: count >= 3 ? 0.9 : 1,
                                backgroundColor:
                                  count >= 3 ? "#72A0C1" : "#318CE7",
                              }}
                              disabled={count >= 3 || disabled}
                              className="button-binhchon"
                              onClick={() => {
                                if (count < 3) handleVote(doithi._id);
                              }}
                            >
                              <span>Bình chọn</span>
                              <MdFavorite className="favou-icon" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  <Button
                    onClick={handleShowBinhChon}
                    className=" btn btn-danger w-100"
                    style={{ margin: "0 0 10px 0" }}
                    disabled={count !== 3 || disabled}
                  >
                    {user?.votes?.[0]
                      ? "Bạn đã bình chọn"
                      : `Bình chọn (${count})`}
                  </Button>
                  <Button
                    onClick={() => {
                      setRender(pre => !pre)
                      navigate("/")
                    }}
                    className=" btn btn-default w-100"
                    style={{ margin: "0 0 20px 0", backgroundColor: "#007FFF" }}
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
            </div>

            <div className="Warning">
              <Modal
                show={showBinhChon}
                onHide={handleCloseBinhChon}
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
                    Bạn có chắc chắn bình chọn cho 3 tiết mục này?
                  </h1>
                </Modal.Body>
                <Modal.Footer
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    className="btn btn-default"
                    style={{
                      width: "40%",
                      borderColor: "#E23D28",
                      backgroundColor: "white",
                      color: "#E23D28",
                    }}
                    onClick={handleCloseBinhChon}
                  >
                    Quay lại
                  </Button>
                  <Button
                    className="btn btn-danger"
                    style={{ width: "40%" }}
                    onClick={onVote}
                  >
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

            <div className="CheckinSuccess">
              <Modal
                show={showBinhChonSuccess}
                onHide={handleCloseBinhChonSuccess}
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
                  <h2>Bình chọn thành công</h2>
                  <p>Cảm ơn bạn đã bình chọn cho tiết mục!</p>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Binhchon;
