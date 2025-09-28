const GENDER_MAPPINGS = {
  M: 'Male',
  F: 'Female',
  O: 'Other',
};
export default class GenderTransform {
  deserialize(serialized) {
    return GENDER_MAPPINGS[serialized];
  }

  serialize(deserialized) {
    var gender = null;
    Object.keys(GENDER_MAPPINGS).map((gndr) => {
      if (GENDER_MAPPINGS[gndr] === deserialized) gender = gndr;
    });
    return gender;
  }

  static create() {
    return new this();
  }
}
