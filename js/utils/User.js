import { getRandomInt }  from './Helper';
import randomColor from 'randomcolor';

const PROPERTIES = [ 'displayName', 'roleName', 'layerId', 'avatarURL',
  'iconIdentity', 'color'];

export default class User {
  constructor({displayName, roleName, layerId, avatarURL, color, iconIdentity}) {
    this._displayName = displayName;
    this._roleName = roleName;
    this._layerId = layerId;
    this._avatarURL = avatarURL;
    this._color = color;
    this._iconIdentity = iconIdentity;
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

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }

  get iconIdentity() {
    return this._iconIdentity;
  }

  set iconIdentity(value) {
    this._iconIdentity = value;
  }
}

export class UserFactory {
  buildFromMetadata(opts) {
    return new User({
      layerId: opts.layerId,
      displayName: opts.displayName,
      avatarURL: opts.avatarURL,
    });
  }

  applyDefaultProperties(userObject) {
    if (!userObject.iconIdentity) {
      userObject.iconIdentity = getRandomInt(0, 12).toString();
    }
    if (!userObject.color) {
      userObject.color = randomColor({hue: 'orange' });
    }
  }

  applyMetaDataProperties(userObject, metadataObject) {
    userObject.iconIdentity = metadataObject.iconIdentity;
    userObject.color = metadataObject.color;
  }

  serializeUser(userObject) {
    let obj = userObject;
    if (obj instanceof User){
      obj = {};
      PROPERTIES.forEach((k) => {
        obj[k] = userObject[k];
      });
    }
    return obj;
  }
}

export const userFactoryInstance = new UserFactory();
