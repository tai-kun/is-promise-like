import { describe, test } from "vitest";
import isPromiseLike from "../src/@tai-kun/is-promise-like.js";

describe("Promise のような振る舞いを持つオブジェクト（Thenable）の場合", () => {
  test("then メソッドを持つオブジェクトを渡したとき、true になる", ({ expect }) => {
    // Arrange
    const value = {
      then: () => {},
    };

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(true);
  });

  test("then メソッドを持つ関数を渡したとき、true になる", ({ expect }) => {
    // Arrange
    const value = Object.assign(() => {}, {
      then: () => {},
    });

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(true);
  });

  test("Promise インスタンスを渡したとき、true になる", ({ expect }) => {
    // Arrange
    const value = Promise.resolve();

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(true);
  });
});

describe("Thenable ではない値の場合", () => {
  test("null を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const value = null;

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });

  test("undefined を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const value = undefined;

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });

  test("then プロパティが関数ではないオブジェクトを渡したとき、false になる", ({ expect }) => {
    // Arrange
    const value = {
      then: "is not a function",
    };

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });

  test("空のオブジェクトを渡したとき、false になる", ({ expect }) => {
    // Arrange
    const value = {};

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });

  test("関数を渡したとき、false になる", ({ expect }) => {
    // Arrange
    const value = {};

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });

  test("proxy のゲッターがエラーを投げたとき、false になる", ({ expect }) => {
    // Arrange
    const value = new Proxy({ then() {} }, {
      get() {
        throw new Error();
      },
    });

    // Act
    const result = isPromiseLike(value);

    // Assert
    expect(result).toBe(false);
  });
});
