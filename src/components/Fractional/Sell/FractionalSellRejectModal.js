import React, { Component } from "react";

class RejectModal extends Component {
  render() {
    const { isOpen, handleClose } = this.props;
    if (isOpen) {
      return (
        <div className="p-modal">
          <input
            className="p-modal_isopen"
            id="modal_open_close_account"
            type="radio"
            name="modal_switch_close_account"
            defaultChecked
          />
          <div className="p-modal_overlay_shomen"></div>
          <div
            className="p-modal_window p-modal_window_shomen"
            style={{padding: 20, height: 'auto'}}
          >
            <div className="p-modal_window_contents">
              <div className="p-modal_window_msg_shomen">
                <div className="l-contents_body_inner text-center">
                  新株予約権の単元未満株はご売却頂けません。
                </div>
              </div>
              <div className="p-modal_window_msg_close_account">
                <div className="u-mt20p">
                  <a
                    className="c-button"
                    onClick={handleClose}
                    target="blank"
                  >
                    OK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default RejectModal;
