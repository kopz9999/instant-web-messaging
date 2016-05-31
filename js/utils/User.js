const PROPERTIES = [ 'displayName', 'roleName', 'layerId', 'avatarURL'];

export default class User {
  constructor({displayName, roleName, layerId, avatarURL}) {
    this._displayName = displayName;
    this._roleName = roleName;
    this._layerId = layerId;
    this._avatarURL = avatarURL;
  }

  get displayName() {
    return this._displayName;
  }

  set displayName(value) {
    this._displayName = value;
  }

  get roleName() {
    return this._roleName;
  }

  set roleName(value) {
    this._roleName = value;
  }

  get layerId() {
    return this._layerId;
  }

  set layerId(value) {
    this._layerId = value;
  }

  get avatarURL() {
    return this._avatarURL;
  }

  set avatarURL(value) {
    this._avatarURL = value;
  }
}

export class UserFactory {
  serializeUser(userObject) {
    let obj = userObject;
    if (obj instanceof User){
      obj = {};
      PROPERTIES.forEach((k) => {
        obj[k] = userObject[k];
      });
      return obj;
    }
    return obj;
  }
}

export const userFactoryInstance = new UserFactory();
