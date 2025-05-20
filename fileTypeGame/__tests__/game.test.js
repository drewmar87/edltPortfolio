const path = require('path');
const {JSDOM} = require('jsdom');

describe('file type game', () => {
  let dom;
  beforeAll(async () => {
    const htmlPath = path.resolve(__dirname, '..', 'index.html');
    dom = await JSDOM.fromFile(htmlPath, {
      runScripts: 'dangerously',
      resources: 'usable'
    });
    await new Promise(resolve => {
      dom.window.addEventListener('load', resolve);
    });
  });

  afterAll(() => {
    dom.window.close();
  });

  test('newRound populates file layers with same extension', () => {
    const {window} = dom;
    // mock Math.random in this window
    jest.spyOn(window.Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0);
    window.newRound();
    const layer1 = window.document.getElementById('file-layer-1').textContent;
    const layer2 = window.document.getElementById('file-layer-2').textContent;
    const layer3 = window.document.getElementById('file-layer-3').textContent;
    expect(layer1).toBe(layer2);
    expect(layer2).toBe(layer3);
    expect(layer1).not.toBe('');
    window.Math.random.mockRestore();
  });
});
