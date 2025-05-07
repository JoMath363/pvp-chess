import "./Panel.css";

import { FaHandshake, FaFlag } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { offerDraw, sendMessage } from "../../Pages/Match/emiters.js";
import getPieceIcon from "../Extras/getPieceAssets.js";

const Panel = ({ info, messages, setPopUp, socket }) => {
  const [chatInput, setChatInput] = useState("");

  const historyRef = useRef(null);
  const drawBtnRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    if (drawBtnRef.current && !info.drawAvailable) {
      drawBtnRef.current.className = "panel-buttons-off";
      drawBtnRef.current.style.opacity = 0.6;
    }
  }, [info, messages])

  return (
    <div className="panel">
      <div className="panel-player">
        <div className="panel-player-stats">
          <p>White <span>{info.playerColor == "W" ? "(you)" : "(opponent)"}</span></p>
          {info.currentTurn == "W" ? <div /> : null}
        </div>
        <div className="panel-captured">
          {
            info.whiteCaptured.map((piece, i) => {
              return piece[1] > 0 ? (
                <div className="panel-captured-piece" key={i} >
                  <img src={getPieceIcon("B", piece[0])} />
                  <span>x{piece[1]}</span>
                </div>) : null;
            })
          }
        </div>
      </div>

      <div className="panel-player">
        <div className="panel-player-stats">
          <p>Black <span>{info.playerColor == "B" ? "(you)" : "(opponent)"}</span></p>
          {info.currentTurn == "B" ? <div /> : null}
        </div>
        <div className="panel-captured">
          {
            info.blackCaptured.map((piece, i) => {
              return piece[1] > 0 ? (
                <div className="panel-captured-piece" key={i} >
                  <img src={getPieceIcon("W", piece[0])} />
                  <span>x{piece[1]}</span>
                </div>) : null;
            })
          }
        </div>
      </div>

      <div className="panel-buttons">
        <button
          ref={drawBtnRef}
          className="panel-buttons-on"
          onClick={() => offerDraw(socket)}>
          <FaHandshake className="panel-buttons-icon" />
          <span>Offer Draw</span>
        </button>

        <button
          className="panel-buttons-on"
          onClick={() => setPopUp("resign")}>
          <FaFlag className="panel-buttons-icon" />
          <span>Resign</span>
        </button>
      </div>

      <div className="panel-history">
        <p>Move History</p>
        <div className="panel-history-grid" ref={historyRef}>
          {info.moveHistory.map((round, i) => {
            const [whiteMove, blackMove] = round;

            const whiteIcon = whiteMove ? getPieceIcon(whiteMove[0], whiteMove[1]) : null;
            const whitePos = whiteMove ? whiteMove[2] : "";

            const blackIcon = blackMove ? getPieceIcon(blackMove[0], blackMove[1]) : null;
            const blackPos = blackMove ? blackMove[2] : "";

            return (
              <div key={i} className="panel-history-round">
                <span className="panel-history-number">{i + 1}.</span>
                {
                  whiteMove ? <span className="panel-history-move">
                    <img src={whiteIcon} />
                    <span>{whitePos}</span>
                  </span> : null
                }
                {
                  blackMove ? <span className="panel-history-move">
                    <img src={blackIcon} />
                    <span>{blackPos}</span>
                  </span> : null
                }
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel-chat">
        <div className="panel-chat-messages" ref={chatRef}>
          {messages.map((message, i) =>
            <p key={i}>
              <span>{message.color}: </span>
              {message.content}
            </p>
          )}
        </div>
        <form
          className="panel-chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (chatInput.trim()) {
              sendMessage(socket, chatInput);
              setChatInput("");
            }
          }}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)} />
          <button type="submit">
            <FaPaperPlane className="panel-chat-submit" />
          </button>
        </form>
      </div>
    </div>
  )
};

export default Panel;
