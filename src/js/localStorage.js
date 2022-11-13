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

  addWatched(movieObj) {
    let movieInWatched = this.getMovieToWatched();
    let pushMovie = false;
    const index = movieInWatched.indexOf(movieObj);

    if (index === -1) {
      movieInWatched.push(movieObj);
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

  addQueued(movieObj) {
    let movieInQueued = this.getMovieToQueued();
    let pushQueuedMovie = false;
    const index = movieInQueued.indexOf(movieObj);

    if (index === -1) {
      movieInQueued.push(movieObj);
      pushQueuedMovie = true;
    } else {
      movieInQueued.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(movieInQueued));

    return { pushQueuedMovie, movieInQueued };
  }
}
