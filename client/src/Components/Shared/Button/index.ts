import Component from '../../../core/Component';
import IconButton from '../IconButton';
import './styles.scss';

type ButtonType = 'medium' | 'large' | 'fab' | 'tap';
interface HeaderProps {
  buttonType: ButtonType;
  title?: string;
  isClicked?: boolean;
  handleClick: Function;
}

export default class Button extends Component {
  template() {
    const { buttonType, title, isClicked }: HeaderProps = this.$props;

    return `
    <div id="button" class="${buttonType} ${isClicked ? 'active' : ''}">
        ${title}
    </div>`;
  }

  mounted() {
    const { title }: HeaderProps = this.$props;
    if (!title) {
      const $addIcon = document.createElement('div');
      new IconButton($addIcon as Element, {
        path: '../../../assets/add-white.svg',
      });
      this.$target.querySelector('#button')?.append($addIcon);
    }
  }

  setEvent() {
    const { handleClick }: HeaderProps = this.$props;
    this.$target.querySelector('#button')?.addEventListener('click', () => {
      handleClick();
    });
  }
}
