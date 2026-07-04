# eiken-sim Bug Log

> **目的**: 過去のバグと修正を記録し、同じミスを繰り返さないためのチェックリスト。
> コード変更前に必ずここを確認すること。

---

## バグ #1 — getUserMediaがSpeechRecognitionの音声入力を妨害
- **日付**: 2025-06-30 (初回コミット dbc37fa から潜在的に存在、4e41ba4で悪化)
- **症状**: マイクはOnになるが、吹き込んだ声が一切検知されない
- **原因**: `ensureMicPermission()` が `getUserMedia` でマイクストリームを占有 → `SpeechRecognition` に音声が渡らない
- **経緯**:
  1. dbc37fa: getUserMediaを初回から使用（startTest内）
  2. 4e41ba4: startListening内にもgetUserMediaを追加（async化で悪化）
  3. 3178e4e: try-finallyを追加したが根本解決せず
  4. 18891cc: startListeningを同期に戻したがgetUserMediaは残存
  5. 6395811: getUserMediaを完全削除（根本解決）
- **修正**: ensureMicPermission/S.micStream/getUserMediaを全削除。SpeechRecognitionは自分でマイク許可を管理する。
- **教訓**: **SpeechRecognitionとgetUserMediaを同時に使うな。** SpeechRecognitionは単独でマイク許可を要求できる。getUserMediaでの事前取得は不要であり、ストリームを占有してSpeechRecognitionを壊す。
- **状態**: 修正済み・デプロイ確認済み

## バグ #2 — goQ1の変更後に録音不能が発覚
- **日付**: 2025-06-30 (commit 79a153f 後に発覚)
- **症状**: Q1で録音ができない
- **変更内容**: goQ1のrender HTML変更（passage+illust追加、speakプレフィックス）
- **原因**: goQ1自体の変更ではなく、バグ#1（getUserMedia）が原因だった
- **状態**: バグ#1の修正で解決

## バグ #3 — iOS SafariでTTS（読み上げ）が止まる
- **日付**: 2025-06-30 (commit 1f4a6d7)
- **症状**: iPad/iPhone Safariで問題読み上げの声が出ない、または途中で止まる
- **原因**: iOS SafariのSpeechSynthesisバグ（15秒後に勝手にpause、初期化されないと発声しない）
- **修正**: 
  1. 初回に空utteranceをkickしてエンジン初期化
  2. speech中に5秒ごとにresume()を定期呼び出し
- **状態**: iPadで動作確認済み

## バグ #4 — PC（Acer）で音声認識が動かない
- **日付**: 2025-06-30
- **症状**: SpeechRecognitionがマイクに入力を検知しない
- **原因**: コードではない。最小診断ページ（test-mic.html）でも再現 → PC環境の問題（Acer Purified Voice等のマイク管理ソフトがSpeechRecognitionと干渉）
- **状態**: コード側では解決不可。iPadで代替運用中。

---

## 教訓（変更前チェックリスト）
1. **変更前にBUGLOG.mdを確認** — 同じパターンのバグがないか
2. **1コミット1機能** — 複数変更を混ぜると原因切り分けが困難
3. **変更後は必ずブラウザで動作確認** — コード読みだけでは不十分
4. **録音機能に触れる変更は特に注意** — startListening/ensureMicPermission/S._starting の相互作用を確認
5. **async関数の呼び出し元は await する** — そうしないとフラグ競合が起きる
