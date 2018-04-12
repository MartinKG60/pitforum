import React, { Component } from 'react';
import { Modal } from 'react-materialize';

class ModalComp extends Component {
	render() {
		return (
            <div className="modal-component">
                <Modal fixedFooter trigger={<a>{this.props.modalLinkText}</a>} actions={<button className="btn waves-effect waves-light btn-flat modal-action modal-close">Fortryd</button>}>
                {this.props.ModalContent}
                </Modal>
            </div>
		)
	}
}

export default ModalComp;
