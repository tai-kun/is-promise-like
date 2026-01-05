/**
 * 値が `PromiseLike`（`then` メソッドを持つオブジェクト）であるかどうかを判定します。
 *
 * @param value 判定する値です。
 * @returns 値が `PromiseLike` である場合は `true`、そうでない場合は `false` を返します。
 */
function isPromiseLike(value: unknown): value is PromiseLike<unknown>;

/**
 * 値が特定の型 `T` を持つ `PromiseLike` であるかどうかを判定します。
 *
 * @template T 解決される値の型です。
 * @param value 判定する値です。
 * @returns 値が `PromiseLike<T>` である場合は `true`、そうでない場合は `false` を返します。
 */
function isPromiseLike<T>(value: unknown): value is PromiseLike<T>;

function isPromiseLike(value: unknown): boolean {
  try {
    return (
      value != null
      && (typeof value === "object" || typeof value === "function")
      && typeof (value as Record<keyof any, unknown>)["then"] === "function"
    );
  } catch {
    return false;
  }
}

export default isPromiseLike;
