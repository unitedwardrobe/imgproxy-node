# v1.4.1

- Add a named export for `Imgproxy` in addition to `default`, so you can use it
  like `import { Imgproxy } from "imgproxy";`. This is necessary if the tsconfig
  is set to `"module": "Node16"`.

# v1.4.0

- Add `minWidth`, `minHeight`, `maxBytes`, and `expires` methods to
  `ImgproxyBuilder`.

# v1.3.1

- Export all files from `dist/` in package.json

# v1.3.0

- Add esm support. **WARNING**: This was an unintentional breaking change. If
  you import anything from the `dist/` folder, use `v1.3.1` instead.

# v1.1.0

- Added `presetOnlyBuilder` option to create URLs that are compliant with
  https://docs.imgproxy.net/configuration?id=using-only-presets
