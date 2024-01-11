import firebase from 'firebase'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAhX3iZ-_MogIVguKHFVG0N5iqIw63qX28",
    authDomain: "tadaima-1e28f.firebaseapp.com",
    projectId: "tadaima-1e28f",
    storageBucket: "tadaima-1e28f.appspot.com",
    messagingSenderId: "1047374740835",
    appId: "1:1047374740835:web:2ba45a6c54ac2bf60b6756"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }