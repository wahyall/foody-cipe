import React from 'react';
import './OpenCookbook.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Component
import ListCard from '../../../component/ListCard/ListCard';

// Icon
import back from '../../../icon/arrow-black.svg';
import edit from '../../../icon/pencil-edit.svg';
import sort from '../../../icon/sort.svg';
import { useEffect } from 'react';

// Libs
import { getLocalStorage, postLocalStorage } from '../../../store/libs/storage';

class OpenCookbook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      sortMethod: 'latest',
      isOpenSorting: false,
      isDeleting: false
    };
    this.wrapper = React.createRef();
  }

  componentDidMount = () => {
    const thisCookbook = this.props.cookbook.filter(item => item.id === this.state.id)[0];
    this.setState({
      name: thisCookbook.name,
      desc: thisCookbook.desc,
      data: thisCookbook.data
    });

    setTimeout(() => {
      !getLocalStorage('notice_delete') && this.noticeDelete();
    }, 200);
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Update cookbook data
    const updatedCookbook = this.props.cookbook.filter(item => item.id === this.state.id)[0];
    if (this.state.isDeleting) {
      this.setState({
        isDeleting: false
      });

      // Mengurutkan data setelah data diupdate / dihapus
      // jika tidak dilakukan maka urutan data akan kembali default seperti di awal
      this.sortCookbookData({withAnimate: false, data: updatedCookbook.data});
    }

    if (prevState.sortMethod !== this.state.sortMethod) {
      this.sortCookbookData({withAnimate: true});
    }
  }

  noticeDelete = () => {
    // Memberitahu user tentang cara menghapus resep dari Cookbook
    const noticeElement = this.wrapper.current.firstElementChild.firstElementChild;
    noticeElement.style.animation = 'noticeDelete 1s ease forwards';

    // Menghilangkan animasi saat user ingin menggeser resep
    noticeElement.addEventListener('touchstart', function () {
      this.style.animation = 'none';
    });
    postLocalStorage('notice_delete', true);
  }

  sortCookbookData = ({ withAnimate, data }) => {
    // Mulai animasi fade in out
    if (withAnimate) {
      this.fadeWrapperWhenSorting();
    }

    const tempData = data || [...this.state.data];
    switch (this.state.sortMethod) {
      case 'latest':
        tempData.sort(this.sortFromLatest);
        break;

      case 'oldest':
        tempData.sort(this.sortFromOldest);
        break;

      case 'ascending':
        tempData.sort(this.sortAscending);
        break;

      case 'descending':
        tempData.sort(this.sortDescending);
        break;
    
      default:
        break;
    }
    
    if (withAnimate) {
      setTimeout(() => {
        // Menunggu 100ms agar animasi warpper berada pada opacity 0
        this.setState({
          data: tempData
        });
      }, 100);
    } else {
      this.setState({
        data: tempData
      });
    }
  }

  sortFromLatest = (a, b) => {
    return b.timeAdded - a.timeAdded;
  }

  sortFromOldest = (a, b) => {
    return a.timeAdded - b.timeAdded;
  }

  sortAscending = (a, b) => {
    return a.title < b.title ? -1 : 1;
  }

  sortDescending = (a, b) => {
    return a.title > b.title ? -1 : 1;
  }

  fadeWrapperWhenSorting = () => {
    // Membuat animasi fade in out pada wrapper saat mengubah sort method
    const wrapper = this.wrapper.current;
    wrapper.style.opacity = '0';
    setTimeout(() => {
      wrapper.style.opacity = '1';
    }, 100);
  }

  render() {
    if (!this.state.name) {
      return null;
    }

    return (
      <main id="open-cookbook">
        <nav>
          <button className="back"
            onClick={() => this.props.history.push('/cookbook/')}>
            <img src={back} alt="go back" />
          </button>
          <div className="name">{this.state.name}</div>
          {this.state.id === 'favorite-recipes-1626578977045' ? null : (
            <Link to={"/cookbook/" + this.state.id + "/edit"} className="edit">
              <img src={edit} alt="edit cookbook" />
            </Link>
          )}
        </nav>
        <header className="jumbotron">
          <div className="name">{this.state.name}</div>
          <div className="desc">{this.state.desc}</div>
        </header>
        <section className="action">
          <div className="amount">
            {this.state.data.length} {this.state.data.length > 1 ? "Recipes" : "Recipe"}
          </div>
          <div className="dot"></div>
          <div className="sort" tabIndex="0"
            onFocus={() => this.setState({isOpenSorting: true})}
            onBlur={() => setTimeout(() => this.setState({isOpenSorting: false}), 100)}>
            <span>Sort</span>
            <img src={sort} alt="sort recipe list" />
          </div>
          <div className={"select-sort" + (this.state.isOpenSorting ? " active" : "")}>
            <SortOption key="latest added"
              name="Time added (Latest)"
              dataSort="latest"
              activeSortMethod={this.state.sortMethod}
              setSortMethod={() => this.setState({sortMethod: 'latest'})} />
            <SortOption key="oldest added"
              name="Time added (Oldest)"
              dataSort="oldest"
              activeSortMethod={this.state.sortMethod}
              setSortMethod={() => this.setState({sortMethod: 'oldest'})} />
            <SortOption key="ascending"
              name="Alphabetical (A-Z)"
              dataSort="ascending"
              activeSortMethod={this.state.sortMethod}
              setSortMethod={() => this.setState({sortMethod: 'ascending'})} />
            <SortOption key="descending"
              name="Alphabetical (Z-A)"
              dataSort="descending"
              activeSortMethod={this.state.sortMethod}
              setSortMethod={() => this.setState({sortMethod: 'descending'})} />
          </div>
        </section>
        <section className="wrapper" ref={this.wrapper}>
          {this.state.data.map(recipe => (
            <ListCard key={recipe.id} 
              cookbookID={this.state.id}
              recipe={recipe}
              setIsDeleting={() => this.setState({isDeleting: true})} />
          ))}
        </section>
      </main>
    )
  }
}

const SortOption = (props) => {
  return (
    <div className={"sort-option" + (props.activeSortMethod === props.dataSort ? " active" : "")}
      onClick={props.setSortMethod}>{props.name}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    cookbook: state.cookbook
  }
}

export default connect(mapStateToProps)(OpenCookbook);
