import React, { Component } from 'react';

import _ from 'lodash';

import { StickyContainer, Sticky } from 'react-sticky';
import Swiper from 'react-id-swiper';

require('./assets/styles/vendor/font-awesome/css/font-awesome.min.css');
require('./assets/styles/vendor/swiper/swiper.scss');
require('./assets/styles/homepage.scss');

const projects = [
  {
    title: 'Altug Firarda',
    //thumb: AltugFirardaThumb,
    id: 'altug-firarda',
    url: 'altug-firarda',
  },
  {
    title: 'Moviera',
    //thumb: MovieraThumb,
    id: 'moviera',
    url: 'moviera',
  },
  {
    title: 'Roof Piano',
    //thumb: RoofPiano,
    id: 'roof-piano',
    url: 'http://www.civicdashboards.com/project/roof-piano',
  },
  {
    title: 'Snow Plows',
    //thumb: NewarkSnowPlows,
    id: 'newark-snow-plows',
    url: 'http://data.ci.newark.nj.us/base/maps/snowplows.html',
  },
  // {
  //   title: null,
  //   thumb: null,
  //   id: null,
  //   url: null,
  // },
];

const socials = [
  {
    icon: 'github',
    alt: 'Github',
    url: 'https://www.github.com/aykutsimseks',
  },
  {
    icon: 'linkedin',
    alt: 'Linkedin',
    url: 'https://www.linkedin.com/in/aykut-simsek-027b7038',
  },
  {
    icon: 'twitter',
    alt: 'Twitter',
    url: 'https://www.twitter.com/aykutsimseks',
  },
  {
    icon: 'facebook',
    alt: 'Facebook',
    url: 'https://www.facebook.com/aykutsimseks',
  },
  {
    icon: 'envelope',
    alt: 'E-mail',
    url: 'mailto:aykutsimseks@gmail.com',
  },
];

const swiperParams = {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  spaceBetween: 0,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: '3',
  coverflow: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: 2500,
  autoplayDisableOnInteraction: true,
};


export default class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <StickyContainer>
          <div className="main">
            <div className="personal">
              <div className="title">
                Aykut Simsek
              </div>
              <ul className="social-icons icon-flat icon-zoom list-unstyled list-inline">
                { socials.map(s =>
                  <li key={s.icon}><a href={s.url} alt={s.alt} title={s.alt} target="blank"><i className={`fa fa-${s.icon}`} /></a></li>,
                )}
              </ul>
            </div>
            <div className="row coverflow-slider" >
              <div className="col-sm-12 col-md-12 col-lg-12 slide-content">
                <Swiper {...swiperParams}>
                  { projects.map(p =>
                    <a className="slide" href={p.url} target="blank" key={p.id} style={{ backgroundImage: `url(${require(`./assets/img/thumbs/${p.id}-thumb.jpg`)})` }} >
                      <div className="text">{ p.title }</div>
                    </a>,
                  )}
                </Swiper>
              </div>
            </div>
          </div>
          <Sticky>
            <header>
              <span className="pull-left">Aykut Simsek</span>
            </header>
          </Sticky>
        </StickyContainer>
      </div>
    );
  }
}
