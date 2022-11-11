export class LocalStorageWatchedUtil {
  constructor() {
    this.keyName = 'WatchedList';
  }

  getMovieToWatched() {
    const WatchedListLocalStorage = localStorage.getItem(this.keyName);
    if (WatchedListLocalStorage !== null) {
      return JSON.parse(WatchedListLocalStorage);
    }
    return [];
  }

  addWatched(myId) {
    let movieInWatched = this.getMovieToWatched();
    let pushMovie = false;
    const index = movieInWatched.indexOf(myId);

    if (index === -1) {
      movieInWatched.push(myId);
      pushMovie = true;
    } else {
      movieInWatched.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(movieInWatched));

    return { pushMovie, movieInWatched };
  }
}

export class LocalStorageQueuedUtil {
  constructor() {
    this.keyName = 'QueuedList';
  }

  getMovieToQueued() {
    const QueuedListLocalStorage = localStorage.getItem(this.keyName);
    if (QueuedListLocalStorage !== null) {
      return JSON.parse(QueuedListLocalStorage);
    }
    return [];
  }

  addQueued(myId) {
    let movieInQueued = this.getMovieToQueued();
    let pushQueuedMovie = false;
    const index = movieInQueued.indexOf(myId);

    if (index === -1) {
      movieInQueued.push(myId);
      pushQueuedMovie = true;
    } else {
      movieInQueued.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(movieInQueued));

    return { pushQueuedMovie, movieInQueued };
  }
}
