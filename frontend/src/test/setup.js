import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  sessionStorage.setItem('student_name', 'Test Student');
  sessionStorage.setItem('student_bt_id', 'BT00TEST');
});

afterEach(() => {
  sessionStorage.clear();
  cleanup();
});
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};
