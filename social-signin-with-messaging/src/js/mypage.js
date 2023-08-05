import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import logout from './logout';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, vapidKey } from './firebase-config';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

getToken(messaging, { vapidKey }).then((currentToken) => {
  if (currentToken) {
    // deviceTokenの表示
    document.getElementById('currentDeviceToken').textContent = currentToken;
  }
})

onMessage(messaging, (payload) => {
  alert(`title:${payload.notification.title}\nbody:${payload.notification.body}`)
})

// ログアウトボタン
document.getElementById('logout').addEventListener('click', logout);

// クリップボードにコピーボタン
const copyDeviceToken = () => {
  const value = document.getElementById('currentDeviceToken').textContent
  navigator.clipboard.writeText(value).then(() => alert('コピーしました'))
}
document.getElementById('copyDeviceToken').addEventListener('click', copyDeviceToken);

// クリップボードにコピーボタン
const copyIdToken = () => {
  const value = document.getElementById('currentIdToken').textContent
  navigator.clipboard.writeText(value).then(() => alert('コピーしました'))
}
document.getElementById('copyIdToken').addEventListener('click', copyIdToken);

// ページ読み込み時
document.addEventListener('DOMContentLoaded', async () => {
  const auth = getAuth();

  // ログイン状態が変化したときの処理
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    if (!user.emailVerified) {
      window.location.href = 'register-email.html';
      return;
    }

    const idToken = await getIdToken(user);

    const { email, displayName } = user;

    // トップメッセージの表示
    document.getElementById(
      'top-message'
    ).textContent = `${displayName}さんでログイン中です`;

    // メールアドレスの表示
    document.getElementById('currentEmail').textContent = email;

    // idTokenの表示
    document.getElementById(
      'currentIdToken'
    ).textContent = idToken;

  });
});

document.getElementById('title').textContent = `${process.env.projectId}`;
