import './styles';
import Component from '../../core/Component';
import Header from '../shared/Header';
import ProductBar from './../Shared/ProductBar/index';
import InfoSaler from './../Shared/InfoSaler/index';

export default class SalesProductDetail extends Component {
  setup() {
    this.$state = {
      title: '빈티지 롤러 스케이트',
      image:
        'https://user-images.githubusercontent.com/48883344/125383566-8c373e00-e3d2-11eb-82c3-565a0f5da5f6.png',
      content:
        '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다. 새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235 입니다.',
      price: '169,000원',
      users: {
        info: '판매자정보',
        name: 'username',
        location: '역삼동',
      },
    };
  }

  template() {
    const { title, image, content, users } = this.$state;

    return `
      <header></header>
      <div class="product-detail">
        <div class="image-wrapper">
          <img src="${image}" alt="상품이미지" />
        </div>
        <div class="content">
          <div class="dropdown">판매중</div>
          <div class="product-description">
            <h1 class="product-title">${title}</h1>
            <p class="category">기타 중고물품 · 3분 전</p>
            <p class="desc">${content}</p>
            <p class="more-info"> 채팅 0 · 관심 0 · 조회 1 </p>
          </div>
          <div class="user-specification">
            ${InfoSaler(users)}
          </div>
        </div>
        <div class="product-bar"></div>
      </div>
    `;
  }

  mounted() {
    const { price } = this.$state;
    const $productDetail = this.$target.querySelector('.product-bar');
    const $header = this.$target.querySelector('header');

    new Header($header as Element, {
      headerType: 'menu-invisible',
    });

    new ProductBar($productDetail as Element, {
      price,
    });
  }
}