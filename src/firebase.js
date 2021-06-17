import firebase from 'firebase/app'
import 'firebase/auth' // for authentication
import 'firebase/storage' // for storage
import 'firebase/database' // for realtime database
import 'firebase/firestore' // for cloud firestore
import { ref, onUnmounted } from 'vue'

// firebase init
const firebaseConfig = {
    apiKey: 'AIzaSyBrG4PhGby62hwQUAWVxeklcwcyKtqdLUE',
    authDomain: 'svelte-d0cae.firebaseapp.com',
    databaseURL: 'https://svelte-d0cae-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'svelte-d0cae',
    storageBucket: 'svelte-d0cae.appspot.com',
    messagingSenderId: '567073822834',
    appId: '1:567073822834:web:248e207c2f0e42591d8aeb'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

export const user = ref(null)

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

const quizCollection = db.collection('quizzes')

export const useLoadQuiz = () => {
    const quizzes = ref([])
    const close = quizCollection.onSnapshot(snapshot => {
        quizzes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return quizzes
}

export const getQuiz = async id => {
    const quiz = await quizCollection.doc(id).get()
    return quiz.exists ? quiz.data() : null
}

export const getQuestion = async id => {
    const quest = []
    await quizCollection
        .doc(id)
        .collection('questions')
        .orderBy('sort', 'desc')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                quest.push(doc.data())
            })
        })
    return quest
}

export const getResult = async id => {
    const result = []
    await quizCollection
        .doc(id)
        .collection('result')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                result.push(doc.data())
            })
        })
    return result
}

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}

export async function google() {
    await auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
            localStorage.setItem('userName', result.user.displayName)
            localStorage.setItem('email', result.user.email)
            localStorage.setItem('phoneNumber', result.user.phoneNumber)
            localStorage.setItem('photoURL', result.user.photoURL)
            localStorage.setItem('uid', result.user.uid)
            this.$router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
}

export async function facebook() {
    await auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(result => {
            localStorage.setItem('userName', result.user.displayName)
            localStorage.setItem('email', result.user.email)
            localStorage.setItem('phoneNumber', result.user.phoneNumber)
            localStorage.setItem('photoURL', result.user.photoURL)
            localStorage.setItem('uid', result.user.uid)
            this.$router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
}

export async function logout() {
    await firebase
        .auth()
        .signOut()
        .then(() => {
            localStorage.clear()
            console.log('logout')
            this.$router.push('/login')
        })
        .catch(error => {
            console.log(error)
            this.$router.push('/')
        })
}