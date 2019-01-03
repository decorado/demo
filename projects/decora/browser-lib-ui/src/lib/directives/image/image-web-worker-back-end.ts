
export const DecImagewebWorkerBackEnd = `

  const S3Host = 'http://s3.amazonaws.com/decora-platform-1-nv';

  const ThumborServerHost = 'https://cache-thumbs.decoracontent.com/unsafe';

  const tryToLoadImage = (imageUrl) => {

    return fetch(imageUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'default'
    });

  }

  const testUrl = (data) => {

    tryToLoadImage(data.data).then(res => {

      self.postMessage(data);

    }, rej => {

      data.error = true;

      self.postMessage(data);

    });

  }

  const detectUrl = (data) => {

    data.data = detectUrlFromData(data);

    self.postMessage(data);

  }

  const detectUrlFromData = (data) => {

    const image = data.data.image;

    const size = data.data.size;

    const thumborize = data.data.thumborize;

    const containerWidth = data.data.containerWidth;

    const fitIn = data.data.fitIn;

    const trim = data.data.trim;

    if (typeof image === 'string') {

      return image;

    } else {

      const fileBasePath = extractFileBasePathFromSysfile(image);

      if (fileBasePath) {

        return getFinalUrl(fileBasePath, thumborize, size, containerWidth, fitIn, trim);

      } else {

        return 'ErrorImage';

      }

    }

  }

  const extractFileBasePathFromSysfile = (image) => {

    try {

      return image['fileBasePath'] || undefined;

    } catch (error) {

      return undefined;

    }

  }

  const getFinalUrl = (url, thumborize, size, containerWidth, fitIn, trim) => {

    if (thumborize) {

      return getThumborUrl(url, size, containerWidth, fitIn, trim);

    } else {

      return getS3Url(url);

    }

  }

  const getS3Url = (url) => {
    return S3Host + "/" + url;
  }

  const getThumborUrl = (url, size, containerWidth, fitIn, trim) => {
    const _size = getImageSize(size, containerWidth);
    const aspect = getAspect(fitIn);
    const _trim = getTrim(trim);
    return ThumborServerHost + "/" + _size + aspect + _trim + "/" + url;
  };

  const getTrim = (trim) => {
    return trim ? '/trim' : '';
  };

  const getAspect = (fitIn) => {
    return fitIn ? '/fit-in' : '';
  }

  const getImagesSizeBasedOnContainerSize = (containerWidth) => {

      switch (true) {
        case containerWidth < 300:
          return "300x300";
        case containerWidth < 600:
          return "600x600";
        case containerWidth < 900:
          return "900x900";
        case containerWidth < 1200:
          return "1200x1200";
        case containerWidth < 1500:
          return "1500x1500";
        case containerWidth < 1800:
          return "1800x1800";
        default:
          return "2000x2000";
      }

  }

  const getImageSize = (size = {}, containerWidth = 0) => {

    if (size.width && size.height) {

      return (size.width || 0) + "x" + (size.height || 0);

    } else {

      return getImagesSizeBasedOnContainerSize(containerWidth);

    }

  }

  self.onmessage = function (e) {

    const data = e.data;

    const type = data.type;

    switch(type) {
      case 'detectUrl':
        detectUrl(data);
        break;

      case 'testUrl':
        testUrl(data);
        break;
    }

  };

`;
