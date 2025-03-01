import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    heading: 'General',
    category: 'general',
  };
  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      totalResults: 0,
      loading: true,
      page: 1,
    };
  }

  formatedDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-Us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  async componentDidMount() {
    this.newsGetter();
  }

  async newsGetter() {
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2da52fff93a34298bccddfd61441af43&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.props.setProgress(30);
    await this.setState(
      {
        page: this.state.page + 1,
      },
      async () => {
        console.log(this.state.page);
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=2da52fff93a34298bccddfd61441af43&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
          loading: true,
        });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
        });
        this.props.setProgress(100);
      }
    );
  };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='h2 mb-4 text-center'>
          News Ground - Top {this.props.heading} Headlines
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          scrollThreshold={1}
          style={{ overflow: 'hidden' }}
          endMessage={<h2 className='h2 mt-4 text-center'>No More News</h2>}
        >
          <div className='container'>
            <div className='my-3 row row-gap-3'>
              {this.state.articles.map((e, index) => {
                return (
                  <div className='col-lg-4 col-md-6 col-12' key={index}>
                    <NewsItem
                      title={e.title ? e.title.slice(0, 50) : 'Not Found'}
                      description={
                        e.description ? e.description.slice(0, 80) : 'Not Found'
                      }
                      imageUrl={e.urlToImage}
                      newsUrl={e.url}
                      author={e.author ? e.author : 'Unknown'}
                      publishedAt={this.formatedDate(e.publishedAt)}
                      source={e.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className='d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type='button'
            className='btn btn-dark'
            onClick={this.prevPage}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type='button'
            className='btn btn-dark'
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
