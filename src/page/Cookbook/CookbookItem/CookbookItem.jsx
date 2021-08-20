import React, { useState } from 'react';
import './CookbookItem.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Component
import ConfirmModal from '../../../component/ConfrimModal/ConfirmModal';

// Icon
import dotsMenu from '../../../icon/dots-menu.svg';

const CookbookItem = (props) => {
  const dispatch = useDispatch();

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="cookbook-item">
      <div className="body">
        {props.data.length === 1 ? (
          // Jika jumlah resep di dalam Cookbook sama dengan 1
          <div className="thumbnail type-1">
            <div style={{backgroundImage: `url(${props.data[0].image})`}}></div>
          </div>
        ) : null}
        {props.data.length === 2 ? (
          // Jika jumlah resep di dalam Cookbook sama dengan 2
          <div className="thumbnail type-2">
            <div style={{backgroundImage: `url(${props.data[0].image})`}}></div>
            <div style={{backgroundImage: `url(${props.data[1].image})`}}></div>
          </div>
        ) : null}
        {props.data.length >= 3 ? (
          // Jika jumlah resep di dalam Cookbook lebih besar sama dengan 3
          <div className="thumbnail type-3">
            <div style={{backgroundImage: `url(${props.data[0].image})`}}></div>
            <div style={{backgroundImage: `url(${props.data[1].image})`}}></div>
            <div style={{backgroundImage: `url(${props.data[2].image})`}}></div>
          </div>
        ) : null}
        <Link to={"/cookbook/" + props.id} className="content">
          <span className="name">{props.name}</span>
          <span className="amount">{props.data.length} {props.data.length > 1 ? ' Recipes' : 'Recipe'}</span>
        </Link>
      </div>

      {/* Jika cookbook-item yang ditampilkan adalah Favorite Recipes */}
      {/* maka jangan tampilkan "option" karena Favorite Recipes tidak boleh diedit atau dihapus */}
      {/* Jika bukan Favorite Recipes maka tampilkan "option" */}
      {props.id === 'favorite-recipes-1626578977045' ? null : (
        <div className="option">
          <div className="icon" htmlFor="focus" tabIndex="0"
            onFocus={() => setIsShowMenu(true)}
            onBlur={() => setTimeout(() => setIsShowMenu(false), 100)}>
            <img src={dotsMenu} alt="cookbook menu icon" />
          </div>
          <div className={"menu" + (isShowMenu ? " active" : "")}>
            <Link to={"/cookbook/" + props.id + "/edit"}>Edit</Link>
            <button onClick={() => setIsDeleting(true)}>Delete</button>
          </div>
        </div>
      )}
      <ConfirmModal
        title="Delete Cookbook"
        message={props.name + " will permanently deleted?"}
        confirmCopy="Delete"
        cancelCopy="Cancel"
        isOpenConfirm={isDeleting}
        onConfirm={() => {
          dispatch({type: 'DELETE_COOKBOOK', id: props.id});
          dispatch({type: 'SHOW_TOAST', message: 'Cookbook deleted!'})
        }}
        onCancel={() => setIsDeleting(false)}
        onClose={() => setIsDeleting(false)} />
    </div>
  )
}

export default CookbookItem;