# wordpress_googleform

googleフォームを使ってWordpressに記事を投稿する方法です。

## 1. Wordpressのパーマリンク設定の変更
「基本」から「カスタム構造」に変更します。
カスタム構造のフォームに以下の文字をペーストしてください。
```
?p=%post_id%
```
## 2. wp htaccess editorの編集
下のような行がありますので、必ずその行の下に追加してください。

> RewriteBase /

この行の下に以下の2行を追加
```
RewriteCond %{HTTP:Authorization} .
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
```

## 3. wp config file editorの編集
同様に以下の行を見つけ（下の方にあります）、

> /* That's all, stop editing! Happy publishing. */

下の2行を追加してください。
```
define('JWT_AUTH_SECRET_KEY', 'your-top-secrect-key');
define('JWT_AUTH_CORS_ENABLE', true);
```

## 4. tokenを取得する。

macをご利用の方はターミナル、windowsの方はコマンドプロンプトというアプリを開き、
まずcurlのインストールを行います。インストールの方法は以下を参照してください。

[macの場合](https://qiita.com/kaizen_nagoya/items/f13df3e2c9fe6c3bf6fc)

[windowsの場合](https://qiita.com/sugasaki/items/ba9737d13db33d2cd71f)

そして、利用するwordpressのURLを取得してください。
例えば管理ページのURLが

> https://test.com/wp-admin

となっているようでしたら
```
https://test.com
```
の部分をコピーしておきます。
また、Wordpressのログインユーザ名とパスワードを使いますので、ご準備ください。
そして、ターミナル（コマンドプロンプト）で以下の文字を入力してリターンしてください。
```
curl <<URL>>/wp-json/jwt-auth/v1/token -d "username=<<ユーザ名>>&password=<<パスワード>>"
```
\<\<URL\>\>の部分に先ほどコピーしたURLを、\<\<ユーザ名\>\>と\<\<パスワード\>\>にWordpressのログインユーザ名とパスワードをペーストしてください。

  
リターンしますと以下のような文字が表示されます。
```
{"token":"aaabbbeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xNTAuOTUuMTU0LjgyOjgwMDAiLCJpYXQiOjE1OTk1MjM4ODQsIm5iZiI6MTU5OTUyMzg4NCwiZXhwIjoxNjAwMTI4Njg0LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.QLwDa-rqunZ8ma6Gb5SCZhCulq-12kzkuPqouCUUsJg","user_email":"test@test.com","user_nicename":"test","user_display_name":"test"}
```
こちらの「"token":」に続くダブルクオーテーションの中身をコピーしてください。

## 5. googleフォームの「スクリプトエディタ」を書き換える。

このgitにあるcode.gsを丸ごとスクリプトエディタにペーストします。
さらに\<\<URL\>\>には先ほどの4.と同様WordpressのURLを、\<\<TOKEN\>\>に先ほどコピーしたtokenをペーストしてください。
  

以上になります。
  
