import { AntoineFrontPage } from './app.po';

describe('antoine-front App', () => {
  let page: AntoineFrontPage;

  beforeEach(() => {
    page = new AntoineFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
