import Imgproxy from '../src';

describe('preset-only-builder', () => {
  let imgproxy: Imgproxy;
  const imageUrl = 'https://example.com/image.jpg';

  beforeEach(async () => {
    imgproxy = new Imgproxy({
      baseUrl: 'https://example.com',
      encode: false,
      insecure: false,
      key: 'awesomeKey',
      salt: 'awesomeSalt',
    });
  });

  it('should work when no presets are passed', async () => {
    const builder = imgproxy.presetOnlyBuilder().preset();
    expect(builder.generateUrl(imageUrl)).toMatchSnapshot();
  });

  it('should work when presets are passed', async () => {
    const builder = imgproxy
      .presetOnlyBuilder()
      .preset('thumb_256', 'blur', 'center_crop');
    expect(builder.generateUrl(imageUrl)).toMatchSnapshot();
  });
});
