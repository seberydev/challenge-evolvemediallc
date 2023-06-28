const Modal = ({ id, title, desc }) => {
  return (
    <div className="d-flex">
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
