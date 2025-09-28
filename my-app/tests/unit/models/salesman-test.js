import { setupTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | salesman', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('salesman', {});
    assert.ok(model, 'model exists');
  });
});
