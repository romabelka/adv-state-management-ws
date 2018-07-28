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
}

export default new MoviesService()