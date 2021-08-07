import React from 'react';
import './Details.scss';
import { connect } from 'react-redux';

// Component
import ActionButton from '../../component/ActionButton/ActionButton';
import DetailsTab from './DetailsTab/DetailsTab';
import SaveRecipes from '../../component/SaveRecipes/SaveRecipes';
import CreateCookbook from '../../component/CreateCookbook/CreateCookbook';

// Libs
import { getInformation } from '../../store/libs/request';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      data: this.props.details.data,
      activeTab: 'Description',
      accessedFrom: 'App',
      isSavingRecipe: false,
      isCreatingCookbook: false
    };
    this.navbar = React.createRef();
    this.recipeImg = React.createRef();
  }

  effectOnScroll = (ev) => {
    const details = ev.target;
    const navbar = this.navbar.current;
    const recipeImg = this.recipeImg.current;
    const yValue = details.scrollTop;

    // Memberi efek parallax pada gambar resep
    recipeImg.style.top = yValue * 0.3 + 'px';

    // Mengubah style navbar
    if (yValue >= 60) {
      navbar.classList.add('scroll');
    } else {
      navbar.classList.remove('scroll');
    }
  }

  goBack = () => {
    // Jika user mengakses halaman Details secara langsung (melalui URL),
    // maka arahkan user ke halaman Home
    if (this.state.accessedFrom === 'URL') {
      this.props.history.push('');
    } else {
      this.props.history.goBack();
    }
  }

  componentDidMount = async () => {
    // Mengecek apakah data berisi objek kosong,
    // jika iya maka ambil data resep melalui fungsi "getInformation".
    // Hal ini bisa terjadi saat user mengunjungi halaman Details secara langsung (melalui URL),
    // tanpa melalui Aplikasi terlebih dahulu
    const isDataEmpty = JSON.stringify(this.state.data) === JSON.stringify({});
    if (isDataEmpty) {
      const data = await getInformation(this.state.id);
      this.setState({
        data: data[0],
        accessedFrom: 'URL'
      });
    }
  }
  
  render() {
    return (
      <div id="details" onScroll={this.effectOnScroll}>
        <div className="navbar" ref={this.navbar}>
          <ActionButton.Back {...this.props} onGoBack={this.goBack} />
          <ActionButton.Cookbook openSavingRecipe={() => this.setState({isSavingRecipe: true})} />
          <ActionButton.Favorite fullData={this.state.data} />
        </div>
        <div className="body">
          <div className="recipe-img"
            style={{backgroundImage: `url(${this.state.data.image})`}}
            ref={this.recipeImg}></div>
          <div className="content">
            <div className="recipe-name">{this.state.data.title}</div>
            <div className="info">
              <div className="item">
                <div className="value">{this.state.data.aggregateLikes}</div>
                <div>Likes</div>
              </div>
              <div className="line-separator"></div>
              <div className="item">
                <div className="value">{this.state.data.spoonacularScore}</div>
                <div>Score</div>
              </div>
              <div className="line-separator"></div>
              <div className="item">
                <div className="value">{this.state.data.readyInMinutes}</div>
                <div>Min</div>
              </div>
              <div className="line-separator"></div>
              <div className="item">
                <div className="value">{this.state.data.servings}</div>
                <div>Serve</div>
              </div>
            </div>
            <div className="tabs">
              <div
                className={"tab-item" + (this.state.activeTab === "Description" ? " active" : "")} 
                onClick={() => this.setState({activeTab: 'Description'})}>
                Description
              </div>
              <div
                className={"tab-item" + (this.state.activeTab === "Ingredients" ? " active" : "")} 
                onClick={() => this.setState({activeTab: 'Ingredients'})}>
                Ingredients
              </div>
              <div
                className={"tab-item" + (this.state.activeTab === "Instruction" ? " active" : "")} 
                onClick={() => this.setState({activeTab: 'Instruction'})}>
                Instruction
              </div>
            </div>
            <DetailsTab.Description
              id={this.state.id}
              summary={this.state.data.summary}
              activeTab={this.state.activeTab} />
            <DetailsTab.Ingredients
              id={this.state.id}
              activeTab={this.state.activeTab} />
            <DetailsTab.Instruction
              id={this.state.id}
              activeTab={this.state.activeTab} />
          </div>
        </div>
        <SaveRecipes
          recipe={this.state.data}
          isSavingRecipe={this.state.isSavingRecipe}
          closeSavingRecipe={() => this.setState({isSavingRecipe: false})}
          openCreatingCookbook={() => this.setState({isCreatingCookbook: true})} />
        <CreateCookbook
          recipe={this.state.data} 
          isCreatingCookbook={this.state.isCreatingCookbook}
          closeCreatingCookbook={() => this.setState({isCreatingCookbook: false})} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    details: state.details
  }
}

export default connect(mapStateToProps)(Details);