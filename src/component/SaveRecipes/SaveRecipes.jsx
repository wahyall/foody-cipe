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
      <div className={"save-recipes" + (this.props.isSavingRecipe ? " active" : "")}>
        <div className="modal">
          <div className="modal-header">
            <div>
              <div className="title">Save</div>
              <div className="name">{this.props.recipe.title}</div>
            </div>
            <div className="create"
              onClick={() => {
                this.props.openCreatingCookbook();
                this.props.closeSavingRecipe();
              }}>+ Cookbook</div>
          </div>
          <div className="modal-body">
            {this.props.cookbook.length > 1 ? (
              this.props.cookbook.slice(1).map(list => (
                <SelectCookbook recipe={this.props.recipe} cookbook={list} />
              ))
            ) : (
              <div className="empty-cookbook">
                <div className="illustration">
                  <img src={saveActive} alt="cookbook icon" />
                </div>
                <div>You don't have a Cookbook to save recipe</div>
                <div onClick={() => {
                  this.props.openCreatingCookbook();
                  this.props.closeSavingRecipe();
                }}>Create New Cookbook</div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <div className="done"
              onClick={this.props.closeSavingRecipe}>Done</div>
          </div>
        </div>
      </div>
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