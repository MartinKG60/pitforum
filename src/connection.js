import flamelink from 'flamelink';

export const firebaseCon = flamelink({
            apiKey: 'AIzaSyDQbnSX3eQ4M40cDptvZXd2XsBjqtIOdJI', // required
            authDomain: 'pitforum-a0ca2.firebaseapp.com', // required
            databaseURL: 'https://pitforum-a0ca2.firebaseio.com', // required
            projectId: 'pitforum-a0ca2', // required
            storageBucket: 'pitforum-a0ca2.appspot.com', // required
            messagingSenderId: '133198215359', // optional
            locale: 'en-US' // optional
        });
