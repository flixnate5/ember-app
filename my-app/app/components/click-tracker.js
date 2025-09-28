import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ClickTracker extends Component {
  @tracked
  clickCount = 0;

  @action handleClick(increaseBy = 1) {
    this.clickCount += increaseBy;
  }

  get multipliedCount() {
    return this.clickCount * this.args.multiplier;
  }

  @action
  onClickAction(){
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.5) {
        resolve(this.clickCount);
        } else {
          reject(new Error('Click tracker is out of bounds.'));
        }
      }, 1500)
    );
  }
}
