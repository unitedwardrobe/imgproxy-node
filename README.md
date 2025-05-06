# imgproxy

> [!CAUTION]
> This repository is not actively maintained anymore. PRs might not be reviewed. Forking is recommended.

A Node client library to generate urls for
[imgproxy](https://github.com/DarthSim/imgproxy) services.

## Usage

```ts
import Imgproxy, { Gravity } from 'imgproxy';

const imgproxy = new Imgproxy({
  baseUrl: 'https://imgproxy.example.com',
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true,
});

imgproxy
  .builder()
  .resize('fill', 300, 200, 0)
  .gravity(Gravity.north_east)
  .dpr(2)
  .generateUrl('https://example.com/path/to/image.jpg');
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

This project is licensed under the [MIT License](LICENSE.md).
