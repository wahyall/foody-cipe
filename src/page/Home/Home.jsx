import React from 'react';
import './Home.scss';
import { connect } from 'react-redux';

// Component
import ContentSlider from '../../component/ContentSlider/ContentSlider';
import SeeMore from '../../component/SeeMore/SeeMore';

class Home extends React.Component {
  state = {
    seeMore: {
      active: false,
      title: '',
      data: []
    }
  }

  render() {
    return (
      <main id="home">
        <ContentSlider
          key="recommendation slider"
          name="recommendation"
          title={this.props.home.recommendation.title}
          data={this.props.home.recommendation.data}
          onOpenSeeMore={(seeMore) => this.setState({ seeMore })} />
        <ContentSlider
          key="popular slider"
          name="popular"
          title={this.props.home.popular.title}
          data={this.props.home.popular.data}
          onOpenSeeMore={(seeMore) => this.setState({ seeMore })} />
        <ContentSlider
          key="rated slider"
          name="rated"
          title={this.props.home.rated.title}
          data={this.props.home.rated.data}
          onOpenSeeMore={(seeMore) => this.setState({ seeMore })} />
        <ContentSlider
          key="recent slider"
          name="recent"
          title={this.props.home.recent.title}
          data={this.props.home.recent.data}
          onOpenSeeMore={(seeMore) => this.setState({ seeMore })} />
        <ContentSlider
          key="category slider"
          name="category"
          title={this.props.home.category.title}
          data={this.props.home.category.data}
          onOpenSeeMore={(seeMore) => this.setState({ seeMore })} />

        <SeeMore {...this.props}
          active={this.state.seeMore.active}
          title={this.state.seeMore.title}
          data={this.state.seeMore.data}
          onCloseSeeMore={(seeMore) => this.setState({ seeMore })} />
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(Home);