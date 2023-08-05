import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, vapidKey } from './firebase-config';
import { getMessaging, getToken } from "firebase/messaging";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

await getToken(messaging, { vapidKey })

const redirectToMyPageWhenLoginSuccess = async (provider) => {
  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    // メールが確認されていない場合はメール登録画面に遷移する
    // if (!result.user.emailVerified) {
    //   window.location.href = 'register-email.html';
    //   return;
    // }
    window.location.href = '/';
  } catch (error) {
    // if (error.code === 'auth/account-exists-with-different-credential') {
    //   alert(
    //     `${error.customData.email}は他の SNS と連携した既存ユーザーが登録済みです。既存ユーザーでログイン後、こちらの SNS との連携が可能です。`
    //   );
    //   return;
    // }
    alert(`ログイン/新規登録に失敗しました。\n${JSON.stringify(error)}`);
  }
};

// Google ログインボタン
const googleLogin = () => {
  redirectToMyPageWhenLoginSuccess(new GoogleAuthProvider());
};
document.getElementById('googleLogin').addEventListener('click', googleLogin);

document.getElementById('title').textContent = `ログイン(${process.env.projectId})`;

// GitHub ログインボタン
// const githubLogin = () => {
//   redirectToMyPageWhenLoginSuccess(new GithubAuthProvider());
// };
// document.getElementById('githubLogin').addEventListener('click', githubLogin);
