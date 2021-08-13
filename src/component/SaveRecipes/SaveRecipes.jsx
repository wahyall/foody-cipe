import React from 'react';
import './SaveRecipes.scss';
import { connect, useDispatch } from 'react-redux';

// Icon
import check from '../../icon/check-fat.svg';
import saveActive from '../../icon/save-cookbook-active.svg';
import saveUnactive from '../../icon/save-cookbook-unactive.svg';

class SaveRecipes extends React.Component {
  render() {
    return (
      <main className={"save-recipes" + (this.props.isSavingRecipe ? " active" : "")}
        onClick={(ev) => ev.target.classList.contains('save-recipes') && this.props.closeSavingRecipe()}>
        <div className="modal">
          <section className="modal-header">
            <div>
              <span className="title">Save</span>
              <span className="name">{this.props.recipe.title}</span>
            </div>
            <button className="create"
              onClick={() => {
                this.props.openCreatingCookbook();
                this.props.closeSavingRecipe();
              }}>+ Cookbook</button>
          </section>
          <section className="modal-body">
            {this.props.cookbook.length > 1 ? (
              this.props.cookbook.slice(1).map(list => (
                <SelectCookbook recipe={this.props.recipe} cookbook={list} />
              ))
            ) : (
              <div className="empty-cookbook">
                <div className="icon">
                  <img src={saveActive} alt="cookbook icon" />
                </div>
                <span>You don't have any Cookbook</span>
                <button onClick={() => {
                  this.props.openCreatingCookbook();
                  this.props.closeSavingRecipe();
                }}>Create New</button>
              </div>
            )}
          </section>
          <section className="modal-footer">
            <button className="done"
              onClick={() => {
                this.props.closeSavingRecipe();
                this.props.dispatch({type: 'SHOW_TOAST', message: 'Cookbook updated!'})
              }}>Done</button>
          </section>
        </div>
      </main>
    )
  }
}

const SelectCookbook = (props) => {
  const dispatch = useDispatch();
  const recipe = props.recipe;
  const cookbook = props.cookbook;
  const isSaved = cookbook.data.map(recipe => recipe.id).includes(recipe.id);
  const dispatchSave = isSaved ? 'DELETE_RECIPE' : 'SAVE_RECIPE';

  return (
    <div className={"select-cookbook" + (isSaved ? " active" : "")}
      onClick={() => dispatch({type: dispatchSave, id: cookbook.id, recipe})}>
      <img src={isSaved ? saveActive : saveUnactive} alt="cookbook" />
      <div>
        <div className="cookbook-name">{cookbook.name}</div>
        <div className="amount">{cookbook.data.length} items</div>
      </div>
      <div className={"checkbox" + (isSaved ? " active" : "")} 
        style={{backgroundImage: `url(${check})`}}></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cookbook: state.cookbook
  }
}

export default connect(mapStateToProps)(SaveRecipes);