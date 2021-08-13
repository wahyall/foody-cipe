import React from 'react';
import './CreateCookbook.scss';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';

class CreateCookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      desc: ''
    }
    this.inputName = React.createRef();
  }
  
  createCookbook = (ev) => {
    ev.preventDefault();

    // Membuat ID Cookbook dengan format "Breakfast List" menjadi "breakfast-list-16265798309480"
    const id = (`${this.state.name} ${new Date().getTime()}`).replaceAll(' ', '-').toLowerCase();

    // Membuat Cookbook baru
    this.props.dispatch({
      type: 'CREATE_COOKBOOK',
      id,
      name: this.state.name,
      desc: this.state.desc
    });

    // Menambahkan recipe ke dalam Cookbook yang baru dibuat
    this.props.dispatch({type: 'SAVE_RECIPE', id, recipe: this.props.recipe});

    // Menutup modal
    this.props.closeCreatingCookbook();
    this.props.dispatch({type: 'SHOW_TOAST', message: 'Recipe saved!'});

    // Reset input value
    this.inputName.current.value = '';
    this.setState({
      name: '',
      desc: ''
    });
  }

  render() {
    return (
      <main className={"create-cookbook" + (this.props.isCreatingCookbook ? " active" : "")}
        onClick={(ev) => ev.target.classList.contains('create-cookbook') && this.props.closeCreatingCookbook()}>
        <div className="modal">
          <form onSubmit={this.createCookbook}>
            <section className="modal-header">
              <span className="title">Create New Cookbook</span>
              <span className="close"
                onClick={this.props.closeCreatingCookbook}>×</span>
            </section>
            <section className="modal-body">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input className="input" type="text" id="name" autoComplete="off" 
                  ref={this.inputName}
                  defaultValue={this.state.name}
                  onInput={(ev) => this.setState({name: ev.target.value})} />
              </div>
              <div className="input-group">
                <label htmlFor="desc">
                    Description <span style={{opacity: '0.6'}}>(Optional)</span>
                </label>
                <ContentEditable className="input" id="desc"
                  html={this.state.desc}
                  onChange={(ev) => this.setState({desc: ev.target.value})} />
              </div>
            </section>
            <section className="modal-footer">
              <button type="submit" className="create-btn"
                disabled={this.state.name.length ? null : "disabled"}>Create</button>
            </section>
          </form>
        </div>
      </main>
    )
  }
}

export default connect(null)(CreateCookbook);