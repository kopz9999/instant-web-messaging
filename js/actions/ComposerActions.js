import {
  CHANGE_COMPOSER_MESSAGE,
  SUBMIT_COMPOSER_MESSAGE
} from '../constants/ActionTypes';

export function changeComposerMessage(value) {
  return {
    type: CHANGE_COMPOSER_MESSAGE,
    payload: {
      value
    }
  };
}

export function submitComposerMessage() {
  return {
    type: SUBMIT_COMPOSER_MESSAGE
  };
}
