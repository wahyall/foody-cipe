import React, { useState } from 'react';
import './EditCookbook.scss';
import { useSelector, useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';

// Component
import ConfirmModal from '../../../component/ConfrimModal/ConfirmModal';

// Icon
import back from '../../../icon/arrow-black.svg';
import save from '../../../icon/continue.svg'

const EditCookbook = (props) => {
  const cookbook = useSelector(state => state.cookbook);
  const dispatch = useDispatch();

  const cookbookID = props.match.params.id;
  const thisCookbook = cookbook.filter(item => item.id === cookbookID)[0]
  const [cookbookName, setCookbookName] = useState(thisCookbook.name);
  const [cookbookDesc, setCookbookDesc] = useState(thisCookbook.desc);
  const [isChanged, setIsChanged] = useState(false);
  const [confirmBeforeSaving, setConfirmBeforeSaving] = useState(false);

  function dispatchEditCookbook() {
    const newCookbookID = (`${cookbookName} ${new Date().getTime()}`).replaceAll(' ', '-').toLowerCase();
    dispatch({
      type: 'EDIT_COOKBOOK',
      id: cookbookID,
      newId: newCookbookID,
      name: cookbookName,
      desc: cookbookDesc
    });

    // Setelah mengedit Cookbook, kemudian buka cookbook yang baru saja diedit
    props.history.push('/cookbook/' + newCookbookID);
    dispatch({type: 'SHOW_TOAST', message: 'Cookbook updated!'})
  }

  return (
    <div id="edit-cookbook">
      <nav>
        <div className="back"
          // Lakukan konfirmasi jika user kembali tanpa menyimpan perubahan
          onClick={() => isChanged ? setConfirmBeforeSaving(true) : props.history.goBack()}>
          <img src={back} alt="go back" />
        </div>
        <div className="name">Edit Cookbook</div>
        <div className="save"
          onClick={dispatchEditCookbook}>
          <img src={save} alt="save edit cookbook" />
        </div>
      </nav>
      <form action="">
        <div>
          <div className="thumbnail" style={{backgroundImage: `url(${thisCookbook.data[0].image})`}}></div>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input className="input" type="text" id="name" autoComplete="off"
              defaultValue={cookbookName}
              onInput={(ev) => {
                setCookbookName(ev.target.value);
                setIsChanged(true);
              }} />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="desc">
              Description <span style={{opacity: '0.6'}}>(Optional)</span>
          </label>
          <ContentEditable className="input"
            html={cookbookDesc}
            onChange={(ev) => {
              setCookbookDesc(ev.target.value);
              setIsChanged(true);
            }} />
        </div>
      </form>
      {/* <ConfirmBeforeSaving isConfirmBeforeSaving={confirmBeforeSaving}
        confirmSave={dispatchEditCookbook}
        confirmDontSave={() => props.history.goBack()} /> */}
      <ConfirmModal
        title="Unsaved Changes"
        message="Leave this page without saving changes?"
        confirmCopy="Save"
        cancelCopy="Discard"
        isOpenConfirm={confirmBeforeSaving}
        onConfirm={dispatchEditCookbook}
        onCancel={() => props.history.goBack()}
        onClose={() => setConfirmBeforeSaving(false)} />
    </div>
  )
}

const ConfirmBeforeSaving = (props) => {
  return (
    <div className={"confirm-before-saving" + (props.isConfirmBeforeSaving ? " active" : "")}>
      <div className="modal">
        <div className="modal-header">
          <div>Are you sure want to leave this page without saving?</div>
        </div>
        <div className="modal-footer">
          <div className="dont-btn btn"
            onClick={props.confirmDontSave}>Don't Save</div>
          <div className="save-btn btn"
            onClick={props.confirmSave}>Save</div>
        </div>
      </div>
    </div>
  )
}

export default EditCookbook;