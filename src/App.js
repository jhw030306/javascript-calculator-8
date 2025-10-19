import { Console } from "@woowacourse/mission-utils";

// 문자열 입력받기
class InputHandle {
  async InputValue() {
    const getValue = await Console.readLineAsync(
      "덧셈할 문자열을 입력해 주세요. \n "
    );

    return getValue;
  }
}

// 구분자로 문자 구분
class SplitHandler {
  StringSplit(getValue) {
    if (getValue.startsWith("//")) {
      const customSeperate = getValue.split("\\n");
      try {
        if (
          customSeperate[0].slice(2).length == 0 &&
          customSeperate[0].slice(2).length > 1
        )
          throw new Error(
            "[Error] 구분자가 정의되지 않았습니다."
          );
        else if (
          customSeperate[0].slice(2) !=
          "/[~!@#$%^&*()_+|~=, ]/"
        )
          throw new Error(
            "[Error] 구분자가 정의되지 않았습니다."
          );
      } catch (e) {
        Console.print(e.message);
        return;
      }

      if (
        customSeperate[0].slice(2).length == 1 ||
        customSeperate[0].slice(2) ==
          "/[~!@#$%^&*()_+|~=, ]/"
      ) {
        const customSeperator = customSeperate[0].slice(2);
        const customSplitValue =
          customSeperate[1].split(customSeperator);

        const customSplitNumber = customSplitValue.map(
          (Number) => Math.abs(Number)
        );
        try {
          for (
            let i = 0;
            i < customSplitNumber.length;
            i++
          ) {
            if (isNaN(customSplitValue[i]))
              throw new Error(
                "[ERROR] 양수와 구분자가 아닙니다."
              );
          }
        } catch (e) {
          Console.print(e.message);
          return;
        }

        let sum = 0;

        for (let i = 0; i < customSplitNumber.length; i++) {
          sum += customSplitNumber[i];
        }

        Console.print(`결과 : ${sum}`);
      }
    } else {
      const splitValue = getValue.split(/,|:/);
      const splitValueNumber = splitValue.map((Number) =>
        Math.abs(Number)
      );
      try {
        for (let i = 0; i < splitValueNumber.length; i++) {
          if (isNaN(splitValue[i]))
            throw new Error(
              "[ERROR] 양수와 구분자가 아닙니다."
            );
        }
      } catch (e) {
        Console.print(e.message);
        return;
      }

      let sum = 0;

      for (let i = 0; i < splitValueNumber.length; i++) {
        sum += splitValueNumber[i];
      }

      Console.print(`결과 : ${sum}`);
    }
  }
}

class App {
  async run() {
    const inputhandle = new InputHandle();
    const splithander = new SplitHandler();
    const getValue = await inputhandle.InputValue();
    splithander.StringSplit(getValue);
  }
}

export default App;
