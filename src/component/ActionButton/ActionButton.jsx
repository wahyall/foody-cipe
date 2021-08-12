import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ActionButton.scss';

// Icon
import arrow from '../../icon/arrow-white.svg';
import addCookbook from '../../icon/add-cookbook.svg';
import favoriteFill from '../../icon/favorite-fill.svg';
import favoriteUnfill from '../../icon/favorite-unfill.svg';

const ActionButton = {
  Back: (props) => {
    return (
      <button className="action-button back"
        onClick={() => props.onGoBack()}>
        <img src={arrow} alt="back" />
      </button>
    )
  },
  Favorite: (props) => {
    const cookbook = useSelector(state => state.cookbook);
    const dispatch = useDispatch();
    const isFavorite = cookbook[0].data.map(recipe => recipe.id).includes(props.fullData.id);
    const dispatchFavorite = isFavorite ? 'DELETE_RECIPE' : 'SAVE_RECIPE';

    return (
      <button className="action-button favorite"
        onClick={() => dispatch({type: dispatchFavorite, id: 'favorite-recipes-1626578977045', recipe: props.fullData})}>
        <img src={isFavorite ? favoriteFill : favoriteUnfill} alt="favorite" />
      </button>
    )
  },
  Cookbook: (props) => {
    return (
      <button className="action-button cookbook"
        onClick={props.openSavingRecipe}>
        <img src={addCookbook} alt="add to cookbook" />
      </button>
    )
  }
}

export default ActionButton;