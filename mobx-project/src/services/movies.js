import firebase from 'firebase/app'

export class MoviesService {
    fetchAll() {
        return firebase
            .database()
            .ref('movies')
            .once('value')
            .then(
                res => Object.entries(res.val())
                    .reduce((acc, [id, movie]) => ({
                        ...acc,
                        [id]: { id, ...movie }
                    }), {})
            )
    }

    subscribeMoviesChange(callback) {
        const ref = firebase.database().ref('movies')
        const dataCallback = (snapshot) => callback({
            id: snapshot.key,
            ...snapshot.val()
        })

        ref.on('child_changed', dataCallback)

        return () => ref.off('child_changed', dataCallback)
    }

    likeMovie(movie) {
        return firebase
            .database()
            .ref(`movies/${movie.id}/likes`)
            .set(movie.likes + 1)
    }
}

export default new MoviesService()