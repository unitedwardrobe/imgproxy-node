# imgproxy

A Node client library to generate urls for
[imgproxy](https://github.com/DarthSim/imgproxy) services.

## Usage

```ts
import Imgproxy, { ImgproxyOptions, Gravity } from 'imgproxy';

const imgproxy = new Imgproxy({
  baseUrl: 'https://imgproxy.example.com',
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true,
});

// ...

const options = new ImgproxyOptions()
  .resize('fill', 300, 200, 0)
  .gravity(Gravity.north_east)
  .dpr(2);
imgproxy.generateUrl('https://example.com/path/to/image.jpg', options);
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

This project is licensed under the [MIT License](LICENSE.md).
