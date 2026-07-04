# eiken-sim Bug Log

> **目的**: 過去のバグと修正を記録し、同じミスを繰り返さないためのチェックリスト。
> コード変更前に必ずここを確認すること。

---

## バグ #1 — startListening の非同期化による _starting フラグ競合
- **日付**: 2025-06-30 (commit 4e41ba4 で発生、79a153f後に発覚)
- **症状**: マイクボタンを押しても録音が開始しない。ボタンが「⏳ 準備中...」のまま固まる
- **原因**: `startListening` を `async` 化し `await ensureMicPermission()` を追加したが：
  1. `S._starting = false` が `await` の直後に単独で置かれており、return パスでクリアされないケースがあった
  2. 呼び出し元の `micQ()` / `micReading()` が `await` していなかった
- **修正**:
  1. `startListening` の本体を try-finally で囲み、`finally { S._starting = false; }` で確実クリア
  2. `micQ()` / `micReading()` を `async` 化し `await startListening(...)` に変更
- **状態**: 修正済み（push予定）

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
