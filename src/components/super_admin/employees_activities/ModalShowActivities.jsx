import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalShowActivities = ({show,handleClose,activity}) => {
    return (
        <Modal className='rtl-modal' show={show} onHide={handleClose} centered size="lg"  >
              <Modal.Dialog className="modal-dialog-end">
              <Modal.Header closeButton className="d-flex flex-row-reverse">
                    <Modal.Title>التفاصيل</Modal.Title>
              </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-center">
            {activity && activity.subject ? (
              <div className="w-100">
                <h5>بيانات الموضوع:</h5>
                <ul className="list-group">
                  {Object.entries(activity.subject).map(([key, value]) => (
                    <li key={key} className="list-group-item">
                      <strong>{key}: </strong> {JSON.stringify(value)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>لا توجد بيانات متاحة</p>
            )}
          </Modal.Body>
          </Modal.Dialog>
        </Modal>
      );
}

export default ModalShowActivities