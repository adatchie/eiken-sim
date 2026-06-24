# eiken-sim

英検3級 二次試験（スピーキング）練習用のブラウザシミュレーターです。

## 内容

- 問題数: 21セット
- 出典: Nick's English School 英検3級二次試験練習問題
  - https://nicksenglish.com/eiken/interview/eiken_3_interview
- 実行形式: 静的HTML/CSS/JS
- 音声: Browser Web Speech API
- 音声認識: Browser SpeechRecognition対応環境のみ

## 起動方法

Windows + WSL 環境では、`eiken-sim.bat` をダブルクリックしてください。

手動起動:

```bash
python3 -m http.server 8080 --directory .
```

その後、ブラウザで以下を開きます。

```text
http://localhost:8080/index.html
```

## ファイル構成

```text
index.html
style.css
app.js
questions.json
assets/
  01_illustration.jpg ... 08_illustration.jpg
  09_illustration.png ... 21_illustration.png
```

## 注意

- iOS SafariはSpeechRecognition非対応のため、音声認識は使えません。
- `file://` ではマイク許可が毎回出るため、localhost起動を推奨します。
