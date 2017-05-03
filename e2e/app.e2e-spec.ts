import { Spellbook3ClientPage } from './app.po';

describe('spellbook3-client App', () => {
  let page: Spellbook3ClientPage;

  beforeEach(() => {
    page = new Spellbook3ClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
