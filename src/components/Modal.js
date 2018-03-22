import React, { Component } from 'react';
import { Modal } from 'react-materialize';

class ModalComp extends Component {

	render() {
		return (
            <div className="modal-component">
                <Modal fixedFooter trigger={<a>{this.props.modalLinkText}</a>} actions={<button className="btn waves-effect waves-light btn-flat modal-action modal-close">Fortryd</button>}>
                <p>Hej!</p>
                {/* <h5>Opret ny tråd i {this.props.match.params.forumcatid} - {this.props.match.params.forumsubcatid}</h5>
                <input placeholder="Giv din tråd et navn" type="text" id="threadsubject" value={this.state.newThreadSubject} onChange={this.subjectOnChange} />
                <textarea id="threadtext" value={this.state.newThreadText} onChange={this.textOnChange}></textarea>
                <button onClick={this.addThread} className="waves-effect waves-light btn">Opret tråd</button> */}
                </Modal>
            </div>
		)
	}
}

export default ModalComp;
