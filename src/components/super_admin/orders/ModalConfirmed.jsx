import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalConfirmed = ({ show, handleClose, loading, error,handleConfirmed}) => {
    console.log('show : ',show)
  return (
    <Modal
    show={show}
    onHide={handleClose}
    
    centered      
    style={{ direction: "rtl" }}
  >
    <Modal.Header closeButton>
      <Modal.Title>تأكيد العملية </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}
    هل انت متاكد من التعديل المسبق؟
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      تجاهل
    </Button>
    {loading ? (
      <Button variant="success" onClick={handleConfirmed} disabled>
        حفظ
      </Button>
    ) : (
      <Button variant="success" onClick={handleConfirmed}>
        حفظ
      </Button>
    )}
  </Modal.Footer>

    </Modal>
    
  )
}

export default ModalConfirmed