import "./Panel.css";

import { FaHandshake, FaFlag } from "react-icons/fa";
import getPieceIcon from "../Extras/getPieceAssets.js";
import { useEffect, useRef, useState } from "react";
import { offerDraw } from "../../Pages/Match/emiters.js";

const Panel = ({ info, setPopUp, socket }) => {
  const historyRef = useRef(null);
  const drawBtnRef = useRef(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }

    if (drawBtnRef.current && !info.drawAvaiable) {
      drawBtnRef.current.className = "info-panel-buttons-off";
      drawBtnRef.current.style.opacity = 0.6;
    }
  }, [info])

  return (
    <div className="info-panel">
      <div className="info-panel-player">
        <div className="info-panel-player-stats">
          <p>White <span>{info.playerColor == "W" ? "(you)" : "(opponent)"}</span></p>
          {info.currentTurn == "W" ? <div /> : null}
        </div>
        <div className="info-panel-captured">
          {
            info.whiteCaptured.map((piece, i) => {
              return piece[1] > 0 ? (
                <div className="info-panel-captured-piece" key={i} >
                  <img src={getPieceIcon("B", piece[0])} />
                  <span>x{piece[1]}</span>
                </div>) : null;
            })
          }
        </div>
      </div>

      <div className="info-panel-player">
        <div className="info-panel-player-stats">
          <p>Black <span>{info.playerColor == "B" ? "(you)" : "(opponent)"}</span></p>
          {info.currentTurn == "B" ? <div /> : null}
        </div>
        <div className="info-panel-captured">
          {
            info.blackCaptured.map((piece, i) => {
              return piece[1] > 0 ? (
                <div className="info-panel-captured-piece" key={i} >
                  <img src={getPieceIcon("W", piece[0])} />
                  <span>x{piece[1]}</span>
                </div>) : null;
            })
          }
        </div>
      </div>

      <div className="info-panel-buttons">
        <button
          ref={drawBtnRef}
          className="info-panel-buttons-on"
          onClick={() => offerDraw(socket)}>
          <FaHandshake className="info-panel-buttons-icon" />
          <span>Offer Draw</span>
        </button>

        <button
          className="info-panel-buttons-on"
          onClick={() => setPopUp("resign")}>
          <FaFlag className="info-panel-buttons-icon" />
          <span>Resign</span>
        </button>
      </div>

      <div className="info-panel-history">
        <p>Move History</p>
        <div className="history" ref={historyRef}>
          {info.moveHistory.map((round, i) => {
            const [whiteMove, blackMove] = round;

            const whiteIcon = whiteMove ? getPieceIcon(whiteMove[0], whiteMove[1]) : null;
            const whitePos = whiteMove ? whiteMove[2] : "";

            const blackIcon = blackMove ? getPieceIcon(blackMove[0], blackMove[1]) : null;
            const blackPos = blackMove ? blackMove[2] : "";

            return (
              <div key={i} className="history-round">
                <span className="history-number">{i + 1}.</span>
                {
                  whiteMove ? <span className="history-move">
                    <img src={whiteIcon} />
                    <span>{whitePos}</span>
                  </span> : null
                }
                {
                  blackMove ? <span className="history-move">
                    <img src={blackIcon} />
                    <span>{blackPos}</span>
                  </span> : null
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
};

export default Panel;
