# social-signin-with-messaging

## これは何？

Firebase AuthenticationとCloud Messagingを使い、

- ソーシャルログイン

- Web Push通知

が出来ます。

## install

```bash
npm install
```

## make .env.local

```bash
cp .env.local.example .env.local
```

## setting

1. firebaseでweb applicationをhostingします

https://firebase.google.com/docs/web/setup?hl=ja

2. AuthenticationでSign-in methodにGooleを追加してください

3. firebaseConfigやvapidKey等を.env.localに記載してください。

* firebaseConfigはどこに表示されている？

プロジェクトの設定 > 全般 で確認出来ます。

* vapidKeyはどこに表示されている？

下記ページで、ウェブプッシュ証明書を作ると表示されます。

https://firebase.google.com/docs/cloud-messaging/js/client?hl=ja

4. .firebasercのprojects.defaultに1で作成したプロジェクトのIDを記載します。

## run local server

```bash
npm run local
.
.
Local server: http://localhost:5002
```
