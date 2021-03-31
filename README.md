### Usage

Assume that you want to remove `data-test` attribute from svelte component. In your `webpack.config.js`:

```javascript
module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: [
              require('svelte-preprocess')({}),
              require('svelte-preprocess-remove-attribute')({
                filter: name => {
                  return name !== 'data-test';
                },
              }),
            ],
          },
        },
      },
    ],
  },
```
