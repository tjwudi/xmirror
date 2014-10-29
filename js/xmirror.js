(function(window) {
  var constraints = {
    'video': {
      mandatory: {
        maxWidth: 300,
        maxHeight: 300,
        minWidth: 300,
        minHeight: 300
      }
    }
  };

  function success(stream) {
    var videos = document.querySelectorAll('video'),
      attachedStream = stream;
    if (window.URL) {
      attachedStream = window.URL.createObjectURL(attachedStream);
    }

    videos = [].slice.call(videos);
    videos.forEach(function(video) {
      video.src = attachedStream;
    });
  }

  function fail() {
    console.err('Failed to capture video stream');
  }

  navigator.getUserMedia(constraints, success, fail);
})(window);
