# Is your streaming service worth it?

Find out if your streaming service is worth it or not (Last.fm account required). The class provided accepts three arguments: 

* your username for Last.fm
* the price you'd pay for an individual song
* how much you pay for subscription services in a year

## Usage

* Fork & clone this repository.
* In `app.js`, replace the `usr` variable on line 3 with your Last.fm username.
* Run `app.js`
* You can 

#### Notes

This class uses `fetch()` to async and recursively update each instantiated object's `this.props`. `toString()` and `toObject()` should be regarded with that in mind.

#### Output

```bash
$ node app.js 
Is your Streaming service worth it?
Warning: this class loads data async
Results...
3131
You save money by using your subscription service.
true
Saving to dataset.json
```