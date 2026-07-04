# eiken-sim Bug Log

> **目的**: 過去のバグと修正を記録し、同じミスを繰り返さないためのチェックリスト。
> コード変更前に必ずここを確認すること。

---

## バグ #1 — startListening の async化 + getUserMedia占有により音声認識が機能停止
- **日付**: 2025-06-30 (commit 4e41ba4 で発生、3178e4e で悪化)
- **症状**: マイクはOnになるが、吹き込んだ声が一切検知されない
- **原因**: `ensureMicPermission()` が `getUserMedia` でマイクストリームを占有 → `SpeechRecognition` に音声が渡らない。ブラウザの音声入力は排他的で、getUserMediaのストリームが残っているとSpeechRecognitionが音声を受け取れない。
- **やったこと**: 4e41ba4で同期関数をasync化してensureMicPermissionを追加。3178e4eでtry-finallyを追加したが、getUserMediaのストリーム占有問題は解決せず。
- **修正**: startListening全体を6891f59当時の元の同期版に完全復元。getUserMediaをstartListening内で呼ばない（SpeechRecognition自体がマイク許可を管理するため不要）。
- **状態**: 修正済み（6891f59と完全一致確認済み）
- **教訓**: **SpeechRecognitionとgetUserMediaを同時に使うな。** SpeechRecognitionは単独でマイク許可を要求・取得できる。getUserMediaでの事前取得は不要であり、かえって害がある。

## バグ #2 — goQ1の変更後に録音不能が発覚（バグ#1と同一原因の可能性高い）
- **日付**: 2025-06-30 (commit 79a153f 後に発覚)
- **症状**: Q1で録音ができない
- **変更内容**: goQ1のrender HTML変更（passage+illust追加、speakプレフィックス）
- **原因**: goQ1自体の変更ではなく、バグ#1（4e41ba4のasync化）が潜在的に存在し、
  たまたまQ1で顕在化した可能性が高い。goQ1のdiffは録音ロジックに触れていない。
- **状態**: バグ#1の修正で解決したか要確認

---

## 教訓（変更前チェックリスト）
1. **変更前にBUGLOG.mdを確認** — 同じパターンのバグがないか
2. **1コミット1機能** — 複数変更を混ぜると原因切り分けが困難
3. **変更後は必ずブラウザで動作確認** — コード読みだけでは不十分
4. **録音機能に触れる変更は特に注意** — startListening/ensureMicPermission/S._starting の相互作用を確認
5. **async関数の呼び出し元は await する** — そうしないとフラグ競合が起きる
