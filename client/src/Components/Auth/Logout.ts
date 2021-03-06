import './styles';
import Component from '../../core/Component';
import Button from './../Shared/Button/index';
import { token } from '../../lib/util';
import { $router } from '../../lib/router';

export default class Logout extends Component {
  setup() {
    this.$state = {
      username: '',
    };
    const headers = new Headers();
    headers.append('Authorization', token());
    fetch('/api/me/', {
      method: 'GET',
      headers,
    })
      .then((res) => res.json())
      .then(({ user }) => {
        this.setState({
          username: user.nickname,
        });
      });
  }
  template() {
    return `
      <form id="logout-form">
        <div>안녕하세요,</div>
        <div><span class="user-nickname">${this.$state.username}</span>님!</div>
        <div class="logout-btn"></div>
        <div class="baemin"></div>
      </form>
    `;
  }

  mounted() {
    const $logoutBtn = this.$target.querySelector('.logout-btn');

    new Button($logoutBtn as HTMLElement, {
      buttonType: 'large',
      title: '로그아웃',
      handleClick: () => {
        localStorage.clear();
        $router.push('/#');
        (this.$target.parentNode as Element).className = 'modal-close';
      },
    });

    const $backBtn = this.$target.querySelector('#left');
    $backBtn?.addEventListener('click', () => {
      this.$target.className = 'modal-close';
    });
  }
}
