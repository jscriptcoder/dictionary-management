import { DictionaryManagementPage } from './app.po';

describe('dictionary-management App', () => {
  let page: DictionaryManagementPage;

  beforeEach(() => {
    page = new DictionaryManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
