import './styles';
import Component from '../../core/Component';
import ChatListItem from '../Shared/ChatListItem';
import Header from '../Shared/Header';
import { $router } from '../../lib/router';

interface ChatType {
  username: string;
  timestamp: string;
  content: string;
  img: string;
  checked?: boolean;
}

export default class Chatlist extends Component {
  setup() {
    this.$state = [
      {
        username: 'UserE',
        timestamp: '1분 전',
        content: '실제로 신어볼 수 있는 건가요?',
        img: 'https://user-images.githubusercontent.com/48883344/125383566-8c373e00-e3d2-11eb-82c3-565a0f5da5f6.png',
        checked: true,
      },
      {
        username: 'UserD',
        timestamp: '1시간 전',
        content: '감사합니다 :)',
        img: 'https://user-images.githubusercontent.com/48883344/125383566-8c373e00-e3d2-11eb-82c3-565a0f5da5f6.png',
        checked: false,
      },
    ];
  }

  template() {
    return `
      <header></header>
      <div class="chat-lists"></div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('header');
    const $chatList = this.$target.querySelector('.chat-lists');
    const chatData = this.$state;

    new Header($header as HTMLElement, {
      headerType: 'menu-off-white',
      title: '채팅하기',
    });

    chatData.forEach((chat: ChatType) => {
      const $list = document.createElement('div');
      $chatList?.append($list);
      new ChatListItem($list as Element, chat);
    });
  }

  setEvent() {
    this.addEvent('click', '.chat-list__item', () => $router.push('/chat/:id'));
  }
}
