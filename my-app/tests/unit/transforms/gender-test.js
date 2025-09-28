import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Transform | gender', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const transform = this.owner.lookup('transform:gender');
    assert.ok(transform, 'transform exists');
  });
});
