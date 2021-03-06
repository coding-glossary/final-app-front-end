import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react"

const AddModal = (props) => {

  const { user, isAuthenticated } = useAuth0();
  const handleTermSubmit = async (e) => {
    e.preventDefault();
    let success = true;
    if (isAuthenticated) {
      success = false;
      let term = {
        term_name: e.target.term_name.value,
        definition: e.target.definition.value,
        documentation_url: e.target.documentation_url.value,
        user_email: user.email
      }
      success = await props.addTerm(term);
    }
    if (success) {
      props.closeAddTermModalHandler();
    }
  }

  return (
    <>
      <Modal
        show={props.isAddTermModalDisplaying}
        onHide={props.closeAddTermModalHandler}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Term</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTermSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Term Name</Form.Label>
              <Form.Control
                type="text"
                id="term_name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Definition</Form.Label>
              <Form.Control
                type="text"
                id="definition"
                as="textarea"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resource Link</Form.Label>
              <Form.Control
                type="text"
                id="documentation_url"
                placeholder="www."
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="submit-button"
            >
              Submit
            </Button>
            <Button
              variant="outline-secondary"
              onClick={props.closeAddTermModalHandler}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddModal;