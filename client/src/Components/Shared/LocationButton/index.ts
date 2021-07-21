import './styles';
import Component from '../../../core/Component';
import IconButton from './../IconButton/index';

export interface LocationButtonProps {
  locId: number;
  type: string;
  name?: string;
}

export default class LocationButton extends Component {
  template() {
    const { name, type }: LocationButtonProps = this.$props;

    return `
      <div class="location-button ${
        type !== 'add' ? (type === 'loc1' ? 'active' : 'inactive') : 'add'
      }">
        <small class="text">${name}</small>
        <div class="image-wrapper"></div>
      </div>
    `;
  }

  mounted() {
    const { type } = this.$props;
    const $wrapper = this.$target.querySelector('.image-wrapper');

    console.log(type);
    if (type === 'add') {
      new IconButton($wrapper as HTMLElement, {
        name: 'add-mint',
      });
    } else {
      new IconButton($wrapper as HTMLElement, {
        name: 'close-mint',
      });
    }
  }

  setEvent() {
    const $location = this.$target.parentElement?.parentElement;

    this.addEvent('click', '.add', () => handleClickOnAddBtn());

    function handleClickOnAddBtn() {
      const $modal = $location?.querySelector('.location-modal');
      $modal?.classList.add('modal-open');
    }
  }
}
